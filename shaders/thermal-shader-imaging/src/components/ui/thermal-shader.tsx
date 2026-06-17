/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as THREE from 'three'
import React, { useEffect, useRef } from "react"

interface ThermalEffectProps {
  width?: number
  height?: number
  className?: string
  logoUrl?: string // Add logoUrl prop
}

const ThermalEffect: React.FC<ThermalEffectProps> = ({
  width = 400,
  height = 400,
  className = "",
  logoUrl = "https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png", // Default logo URL
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<ThermalEffectEngine | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const initEngine = async () => {
      try {
        const engine = new ThermalEffectEngine(containerRef.current!, logoUrl)
        await engine.init()
        engineRef.current = engine
      } catch (error) {
        console.error("Failed to initialize thermal effect:", error)
      }
    }

    initEngine()

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose()
        engineRef.current = null
      }
    }
  }, [logoUrl])

  return (
    <div className={`flex w-full h-full justify-center ${className}`}>
      <div ref={containerRef} style={{ width, height }} />
    </div>
  )
}

export { ThermalEffect }


class ThermalEffectEngine implements Disposable {
  private renderer: THREE.WebGLRenderer
  private logoUrl: string // Add logoUrl property
  private scene: THREE.Scene
  private camera: THREE.OrthographicCamera
  private drawRenderer!: DrawRenderer
  private interactionManager!: InteractionManager
  private thermalMaterial!: ThermalMaterial
  private heatMesh!: THREE.Mesh
  private maskTexture!: THREE.Texture
  private logoTexture!: THREE.Texture
  private container: HTMLElement
  private heatUp = 0
  private parameters: EffectParameters = { ...DEFAULT_PARAMETERS }
  private animationId: number | null = null
  private lastTime = 0
  private animationValues: AnimationValues = {
    blendVideo: { value: 1, target: 1 },
    amount: { value: 0, target: 1 },
    mouse: {
      position: new THREE.Vector3(0, 0, 0),
      target: new THREE.Vector3(0, 0, 0),
    },
    move: { value: 1, target: 1 },
    scrollAnimation: {
      opacity: { value: 1, target: 1 },
      scale: { value: 1, target: 1 },
      power: { value: 0.8, target: 0.8 },
    },
  }
  // resize handler reference so we can remove it later
  private resizeHandler = () => {
    const rect = this.container.getBoundingClientRect()
    this.renderer.setSize(rect.width, rect.height)
    this.onResize(rect.width, rect.height)
  }
  constructor(container: HTMLElement, logoUrl: string) {
    this.container = container
    this.logoUrl = logoUrl // Store logoUrl
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      logarithmicDepthBuffer: false,
    })
    this.renderer.outputColorSpace = (THREE as any).SRGBColorSpace ?? this.renderer.outputColorSpace
    this.renderer.setClearColor(0x000000, 0)
    // Scene & camera
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(
      CAMERA_CONFIG.LEFT,
      CAMERA_CONFIG.RIGHT,
      CAMERA_CONFIG.TOP,
      CAMERA_CONFIG.BOTTOM,
      CAMERA_CONFIG.NEAR,
      CAMERA_CONFIG.FAR
    )
    this.camera.position.z = CAMERA_CONFIG.POSITION_Z
    // Attach canvas
    this.setupRenderer()
    this.setupResizeHandler()
  }
  private setupRenderer(): void {
    const rect = this.container.getBoundingClientRect()
    this.renderer.setSize(rect.width, rect.height)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    this.renderer.domElement.style.pointerEvents = "none"
    this.container.appendChild(this.renderer.domElement)
  }
  private setupResizeHandler(): void {
    window.addEventListener("resize", this.resizeHandler)
  }
  async init(): Promise<void> {
    const isMobile = isTouchDevice()
    this.drawRenderer = new DrawRenderer(256, { radiusRatio: 1000, isMobile })
    const [maskTexture, logoTexture] = await Promise.all([
      loadTexture(this.logoUrl), // Use this.logoUrl instead of ASSETS.LOGO_URL
    loadTexture(this.logoUrl),
    ])
    this.maskTexture = maskTexture
    this.logoTexture = logoTexture
    this.createThermalEffect()
    this.setupMaterialTextureBasedUniforms()
    this.setupInteractionManager()
    const rect = this.container.getBoundingClientRect()
    this.onResize(rect.width, rect.height)
    this.startAnimationLoop()
  }
  private setupMaterialTextureBasedUniforms(): void {
    if (!this.thermalMaterial || !this.maskTexture) return
    const uniforms = this.thermalMaterial.getUniforms?.()
    const texWidth =
      (this.maskTexture.image && (this.maskTexture.image as any).width) ||
      (this.maskTexture.userData && this.maskTexture.userData.width) ||
      512
    const glowRadiusUV = 10 / Math.max(1, texWidth)
    if (uniforms && uniforms.glowRadius) {
      uniforms.glowRadius.value = glowRadiusUV
    }
    if (uniforms && uniforms.glowIntensity) {
      uniforms.glowIntensity.value = 0.7
    }
  }
  private createThermalEffect(): void {
    this.thermalMaterial = new ThermalMaterial({
      drawTexture: this.drawRenderer.getTexture(),
      maskTexture: this.maskTexture,
    })
    this.heatMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      this.thermalMaterial.getMaterial()
    )
    this.heatMesh.position.set(0, 0, 0)
    this.scene.add(this.heatMesh)
  }
  private setupInteractionManager(): void {
    const hitContainer = this.container.querySelector(
      ".thermal-interaction-area"
    ) as HTMLElement
    this.interactionManager = new InteractionManager({
      container: this.container,
      hitContainer: hitContainer || this.container,
      onPositionUpdate: (position, direction) => {
        this.animationValues.mouse.target.copy(position)
        this.drawRenderer.updateDirection(direction)
      },
      onInteractionChange: (isInteracting) => {
        this.animationValues.move.target = isInteracting
          ? INTERACTION.HOLD_MOVE_TARGET
          : INTERACTION.RELEASE_MOVE_TARGET
        this.animationValues.scrollAnimation.power.target = isInteracting
          ? INTERACTION.HOLD_POWER_TARGET
          : INTERACTION.RELEASE_POWER_TARGET
      },
    })
  }
  private startAnimationLoop(): void {
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - this.lastTime) / 1000
      this.lastTime = currentTime
      this.update(deltaTime)
      this.render()
      this.animationId = requestAnimationFrame(animate)
    }
    this.animationId = requestAnimationFrame(animate)
  }
  private update(deltaTime: number): void {
    this.updateAnimationValues(deltaTime)
    this.updateHeatInteraction(deltaTime)
    this.updateThermalMaterial()
    this.updateMeshTransform()
    this.updateDrawRenderer()
    // NEW: Update time uniform for looping animation in the shader
    this.thermalMaterial.updateTime(this.lastTime / 1000)
  }
  private updateAnimationValues(deltaTime: number): void {
    this.animationValues.mouse.position.lerp(
      this.animationValues.mouse.target,
      lerpSpeed(ANIMATION.MOUSE_INTERPOLATION_SPEED, deltaTime)
    )
    this.animationValues.move.value = lerp(
      this.animationValues.move.value,
      this.animationValues.move.target,
      lerpSpeed(ANIMATION.MOVEMENT_INTERPOLATION_SPEED, deltaTime)
    )
    this.animationValues.scrollAnimation.power.value = clamp(
      lerp(
        this.animationValues.scrollAnimation.power.value,
        this.animationValues.scrollAnimation.power.target,
        lerpSpeed(ANIMATION.POWER_INTERPOLATION_SPEED, deltaTime)
      ),
      ANIMATION.POWER_MIN,
      ANIMATION.POWER_MAX
    )
    this.animationValues.scrollAnimation.opacity.value = lerp(
      this.animationValues.scrollAnimation.opacity.value,
      this.animationValues.scrollAnimation.opacity.target *
        this.animationValues.move.value,
      lerpSpeed(ANIMATION.SCROLL_INTERPOLATION_SPEED, deltaTime)
    )
    this.animationValues.scrollAnimation.scale.value = lerp(
      this.animationValues.scrollAnimation.scale.value,
      this.animationValues.scrollAnimation.scale.target,
      lerpSpeed(ANIMATION.SCROLL_INTERPOLATION_SPEED, deltaTime)
    )
    if (this.animationValues.amount.value < 0.99999) {
      this.animationValues.amount.value = lerp(
        this.animationValues.amount.value,
        this.animationValues.amount.target,
        ANIMATION.FADE_IN_SPEED * deltaTime * ANIMATION.TARGET_FPS
      )
    }
  }
  private updateHeatInteraction(deltaTime: number): void {
    const interactionState = this.interactionManager.getInteractionState()
    const mouseState = this.interactionManager.getMouseState()
    this.drawRenderer.updatePosition(mouseState.position, true)
    if (interactionState.hold) {
      this.heatUp +=
        this.parameters.heatSensitivity * deltaTime * ANIMATION.TARGET_FPS
      this.heatUp = Math.min(this.heatUp, ANIMATION.HEAT_MAX_VALUE)
    }
    this.drawRenderer.updateDraw(this.heatUp)
    this.heatUp *= this.parameters.heatDecay
    if (this.heatUp < INTERACTION.HEAT_CLEANUP_THRESHOLD) {
      this.heatUp = 0
    }
    this.interactionManager.updateMousePosition(
      lerpSpeed(ANIMATION.MOUSE_INTERPOLATION_SPEED, deltaTime)
    )
  }
  private updateThermalMaterial(): void {
    if (!this.thermalMaterial) return
    this.thermalMaterial.updateUniforms({
      opacity: this.animationValues.scrollAnimation.opacity.value,
      amount: this.animationValues.amount.value,
      power: this.parameters.contrastPower,
      blendVideo: this.parameters.videoBlendAmount,
      randomValue: Math.random(),
    })
    this.thermalMaterial.updateFromParameters(this.parameters)
  }
  private updateMeshTransform(): void {
    const scale = this.animationValues.scrollAnimation.scale.value
    if (this.heatMesh) this.heatMesh.scale.set(scale, scale, scale)
  }
  private updateDrawRenderer(): void {
    this.drawRenderer.updateDirection({ x: 0, y: 0 })
  }
  private render(): void {
    if (this.drawRenderer) {
      const rect = this.container.getBoundingClientRect()
      this.drawRenderer.resize(rect.width, rect.height)
      this.drawRenderer.render(this.renderer)
    }
    this.renderer.autoClear = true
    this.renderer.render(this.scene, this.camera)
  }
  private onResize(width: number, height: number): void {
    const aspectRatio = width / height
    let cameraWidth: number, cameraHeight: number
    if (aspectRatio >= 1) {
      cameraHeight = 1
      cameraWidth = aspectRatio
    } else {
      cameraWidth = 1
      cameraHeight = 1 / aspectRatio
    }
    this.camera.left = -cameraWidth / 2
    this.camera.right = cameraWidth / 2
    this.camera.top = cameraHeight / 2
    this.camera.bottom = -cameraHeight / 2
    this.camera.updateProjectionMatrix()
  }
  getParameters(): Readonly<EffectParameters> {
    return { ...this.parameters }
  }
  setParameter(name: keyof EffectParameters, value: number): void {
    this.parameters[name] = value
  }
  resetParameters(): void {
    this.parameters = { ...DEFAULT_PARAMETERS }
  }
  dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    window.removeEventListener("resize", this.resizeHandler)
    this.drawRenderer?.dispose()
    this.interactionManager?.dispose()
    this.thermalMaterial?.dispose()
    if (this.heatMesh) {
      if (this.heatMesh.geometry) this.heatMesh.geometry.dispose()
    }
    this.scene.remove(this.heatMesh)
    if (this.maskTexture) this.maskTexture.dispose()
    if (this.logoTexture) this.logoTexture.dispose()
    this.renderer.dispose()
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement)
    }
  }
}


interface ThermalMaterialConfig {
  drawTexture: THREE.Texture
  maskTexture: THREE.Texture
}

class ThermalMaterial implements Disposable {
  private material: THREE.ShaderMaterial
  private uniforms: ThermalShaderUniforms

  constructor(config: ThermalMaterialConfig) {
    this.uniforms = this.createUniforms(config)
    this.material = this.createMaterial()
  }

  private createUniforms(config: ThermalMaterialConfig): ThermalShaderUniforms {
    const colors = THERMAL_PALETTE.map(hexToRGB) as [
      [number, number, number],
      [number, number, number],
      [number, number, number],
      [number, number, number],
      [number, number, number],
      [number, number, number],
      [number, number, number],
    ]

    return {
      // Textures
      blendVideo: { value: 0 },
      drawMap: { value: config.drawTexture },
      textureMap: { value: config.drawTexture },
      maskMap: { value: config.maskTexture },

      // Transform
      scale: { value: [1, 1] },
      offset: { value: [0, 0] },
      opacity: { value: 1 },
      amount: { value: 0 },

      // Palette
      color1: { value: colors[0] },
      color2: { value: colors[1] },
      color3: { value: colors[2] },
      color4: { value: colors[3] },
      color5: { value: colors[4] },
      color6: { value: colors[5] },
      color7: { value: colors[6] },

      blend: { value: [...GRADIENT_CONFIG.BLEND_POINTS] as [number, number, number, number] },
      fade: { value: [...GRADIENT_CONFIG.FADE_RANGES] as [number, number, number, number] },
      maxBlend: { value: [...GRADIENT_CONFIG.MAX_BLEND] as [number, number, number, number] },

      // Effect params
      power: { value: 0.8 },
      rnd: { value: 0 },
      heat: { value: [0, 0, 0, 1.02] },
      stretch: { value: [1, 1, 0, 0] },

      effectIntensity: { value: 1.0 },
      colorSaturation: { value: 1.3 },
      gradientShift: { value: 0.0 },
      interactionSize: { value: 1.0 },

      // Time + glow + blur
      time: { value: 0.0 },
      glowRadius: { value: 0.02 },
      glowIntensity: { value: 0.7 },
      blurAmount: { value: 0.005 },

      // Animation
      animationSpeed: { value: 1.0 },
      animationIntensity: { value: 0.5 },
      waveFrequency: { value: 8.0 },
      pulseSpeed: { value: 2.0 },
      baseAnimationLevel: { value: 0.3 },
      animationBlendMode: { value: 1.0 },
    }
  }

  private createMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: thermalVertexShader,
      fragmentShader: thermalFragmentShader,
      depthTest: false,
      transparent: true,
    })
  }

  updateUniforms(updates: {
    opacity?: number
    amount?: number
    power?: number
    blendVideo?: number
    effectIntensity?: number
    colorSaturation?: number
    gradientShift?: number
    interactionSize?: number
    randomValue?: number
  }): void {
    if (updates.opacity !== undefined) this.uniforms.opacity.value = updates.opacity
    if (updates.amount !== undefined) this.uniforms.amount.value = updates.amount
    if (updates.power !== undefined) this.uniforms.power.value = updates.power
    if (updates.blendVideo !== undefined) this.uniforms.blendVideo.value = updates.blendVideo
    if (updates.effectIntensity !== undefined) this.uniforms.effectIntensity.value = updates.effectIntensity
    if (updates.colorSaturation !== undefined) this.uniforms.colorSaturation.value = updates.colorSaturation
    if (updates.gradientShift !== undefined) this.uniforms.gradientShift.value = updates.gradientShift
    if (updates.interactionSize !== undefined) this.uniforms.interactionSize.value = updates.interactionSize
    if (updates.randomValue !== undefined) this.uniforms.rnd.value = updates.randomValue
  }

  updateTextures(textures: {
    videoTexture?: THREE.VideoTexture
    drawTexture?: THREE.Texture
    maskTexture?: THREE.Texture
  }): void {
    if (textures.videoTexture) this.uniforms.textureMap.value = textures.videoTexture
    if (textures.drawTexture) this.uniforms.drawMap.value = textures.drawTexture
    if (textures.maskTexture) this.uniforms.maskMap.value = textures.maskTexture
  }

  updateTransform(transform: { scale?: [number, number]; offset?: [number, number] }): void {
    if (transform.scale) this.uniforms.scale.value = transform.scale
    if (transform.offset) this.uniforms.offset.value = transform.offset
  }

  updateTime(time: number): void {
    this.uniforms.time.value = time
  }

  updateFromParameters(parameters: EffectParameters): void {
    this.updateUniforms({
      effectIntensity: parameters.effectIntensity,
      colorSaturation: parameters.colorSaturation,
      gradientShift: parameters.gradientShift,
      interactionSize: parameters.interactionRadius,
      power: parameters.contrastPower,
      blendVideo: parameters.videoBlendAmount,
    })
  }

  getMaterial(): THREE.ShaderMaterial {
    return this.material
  }

  getUniforms(): ThermalShaderUniforms {
    return this.uniforms
  }

  dispose(): void {
    this.material.dispose()
  }
}



// Interaction Manager
interface InteractionManagerConfig {
  container: HTMLElement
  hitContainer?: HTMLElement
  onPositionUpdate: (position: THREE.Vector3, direction: { x: number; y: number }) => void
  onInteractionChange: (isInteracting: boolean) => void
}

class InteractionManager implements Disposable {
  private container: HTMLElement
  private hitContainer: HTMLElement
  private onPositionUpdate: InteractionManagerConfig['onPositionUpdate']
  private onInteractionChange: InteractionManagerConfig['onInteractionChange']
  private mouseState: MouseState
  private interactionState: InteractionState
  private cleanupFunctions: Array<() => void> = []

  constructor(config: InteractionManagerConfig) {
    this.container = config.container
    this.hitContainer = config.hitContainer || config.container
    this.onPositionUpdate = config.onPositionUpdate
    this.onInteractionChange = config.onInteractionChange

    this.mouseState = {
      position: new THREE.Vector3(0, 0, 0),
      target: new THREE.Vector3(0, 0, 0)
    }

    this.interactionState = {
      hold: false,
      heatUp: 0,
      lastNX: 0.5,
      lastNY: 0.5
    }

    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    const elements = [this.hitContainer]
    if (this.container !== this.hitContainer) {
      elements.push(this.container)
    }

    elements.forEach(element => {
      this.cleanupFunctions.push(
        addEventListenerWithCleanup(element, 'pointermove', this.handlePointerMove),
        addEventListenerWithCleanup(element, 'pointerdown', this.handlePointerDown),
        addEventListenerWithCleanup(element, 'pointerenter', this.handlePointerEnter),
        addEventListenerWithCleanup(element, 'pointerup', this.handlePointerUp),
        addEventListenerWithCleanup(element, 'pointerleave', this.handlePointerLeave)
      )
    })

    this.cleanupFunctions.push(
      addEventListenerWithCleanup(
        window,
        'pointermove',
        this.handleGlobalPointerMove,
        { passive: true }
      )
    )
  }

  private handlePointerMove = (event: Event) => {
    const pointerEvent = event as PointerEvent
    this.updatePosition(pointerEvent.clientX, pointerEvent.clientY)
    this.setInteracting(true)
  }

  private handlePointerDown = (event: Event) => {
    const pointerEvent = event as PointerEvent
    this.updatePosition(pointerEvent.clientX, pointerEvent.clientY)
    this.setInteracting(true)
  }

  private handlePointerEnter = (event: Event) => {
    const pointerEvent = event as PointerEvent
    this.updatePosition(pointerEvent.clientX, pointerEvent.clientY)
  }

  private handlePointerUp = () => {
    this.setInteracting(false)
  }

  private handlePointerLeave = () => {
    this.setInteracting(false)
  }

  private handleGlobalPointerMove = (event: Event) => {
    const pointerEvent = event as PointerEvent
    this.updateGlobalPosition(pointerEvent.clientX, pointerEvent.clientY)
    this.setInteracting(true)
  }

  private updatePosition(clientX: number, clientY: number): void {
    const bounds = this.hitContainer.getBoundingClientRect()
    const { x, y } = screenToNDC(clientX, clientY, bounds)
    const { x: deltaX, y: deltaY } = calculateMovementDelta(
      clientX,
      clientY,
      this.interactionState.lastNX,
      this.interactionState.lastNY,
      bounds
    )

    this.mouseState.target.set(x, y, 0)
    this.onPositionUpdate(this.mouseState.target, { x: deltaX, y: deltaY })

    this.interactionState.lastNX = bounds.width > 0 ? (clientX - bounds.left) / bounds.width : 0.5
    this.interactionState.lastNY = bounds.height > 0 ? (clientY - bounds.top) / bounds.height : 0.5
  }

  private updateGlobalPosition(clientX: number, clientY: number): void {
    const bounds = this.container.getBoundingClientRect()
    const { x, y } = screenToNDC(clientX, clientY, bounds)
    const { x: deltaX, y: deltaY } = calculateMovementDelta(
      clientX,
      clientY,
      this.interactionState.lastNX,
      this.interactionState.lastNY,
      bounds
    )

    this.mouseState.target.set(x, y, 0)
    this.onPositionUpdate(this.mouseState.target, { x: deltaX, y: deltaY })

    this.interactionState.lastNX = bounds.width > 0 ? (clientX - bounds.left) / bounds.width : 0.5
    this.interactionState.lastNY = bounds.height > 0 ? (clientY - bounds.top) / bounds.height : 0.5
  }

  private setInteracting(isInteracting: boolean): void {
    if (this.interactionState.hold !== isInteracting) {
      this.interactionState.hold = isInteracting
      this.onInteractionChange(isInteracting)
    }
  }

  getMouseState(): Readonly<MouseState> {
    return this.mouseState
  }

  getInteractionState(): Readonly<InteractionState> {
    return this.interactionState
  }

  updateMousePosition(lerpFactor: number): void {
    this.mouseState.position.lerp(this.mouseState.target, lerpFactor)
  }

  dispose(): void {
    this.cleanupFunctions.forEach(cleanup => cleanup())
    this.cleanupFunctions = []
  }
}

function loadTexture(url: string): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        resolve(texture)
      },
      undefined,
      (error) => reject(error)
    )
  })
}

function addEventListenerWithCleanup(
  element: EventTarget,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler, options)
  return () => element.removeEventListener(event, handler)
}


/**
 * Math utilities for animation and interpolation
 */

/**
 * Linear interpolation between two values
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Convert frame-rate independent lerp speed to delta-time based factor
 */
function lerpSpeed(base: number, deltaTime: number): number {
  const n = base * deltaTime * 60
  return n > 1 ? 1 : n < 0 ? 0 : n
}

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Convert hex color string to RGB values normalized to 0-1 range
 */
function hexToRGB(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('')
  }
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255
  return [r, g, b]
}

/**
 * Convert screen coordinates to normalized device coordinates (-1 to 1)
 */
function screenToNDC(
  screenX: number,
  screenY: number,
  bounds: DOMRect
): { x: number; y: number } {
  let nx = 0.5
  let ny = 0.5

  if (bounds.width > 0) {
    nx = (screenX - bounds.left) / bounds.width
  }
  if (bounds.height > 0) {
    ny = (screenY - bounds.top) / bounds.height
  }

  const x = 2 * (nx - 0.5)
  const y = 2 * -(ny - 0.5) // Flip Y axis for WebGL coordinates

  return { x, y }
}

/**
 * Calculate movement delta for direction tracking
 */
function calculateMovementDelta(
  currentX: number,
  currentY: number,
  lastX: number,
  lastY: number,
  bounds: DOMRect
): { x: number; y: number } {
  const nx = bounds.width > 0 ? (currentX - bounds.left) / bounds.width : 0.5
  const ny = bounds.height > 0 ? (currentY - bounds.top) / bounds.height : 0.5

  const ndx = nx - lastX
  const ndy = ny - lastY

  return { x: ndx, y: ndy }
}

class DrawRenderer implements Disposable {
	private camera: THREE.OrthographicCamera
	private renderTargetA: THREE.WebGLRenderTarget
	private renderTargetB: THREE.WebGLRenderTarget
	private material: THREE.ShaderMaterial
	private scene: THREE.Scene
	private mesh: THREE.Mesh
	private uniforms: DrawRendererUniforms
	private options: DrawRendererOptions

	constructor(size = DRAW_RENDERER.TEXTURE_SIZE, options: DrawRendererOptions = {}) {
		this.options = options
		this.camera = new THREE.OrthographicCamera(
			CAMERA_CONFIG.LEFT,
			CAMERA_CONFIG.RIGHT,
			CAMERA_CONFIG.TOP,
			CAMERA_CONFIG.BOTTOM,
			CAMERA_CONFIG.NEAR,
			CAMERA_CONFIG.FAR
		)
		this.camera.position.z = CAMERA_CONFIG.POSITION_Z

		const rtOpts: THREE.RenderTargetOptions = {
			type: THREE.HalfFloatType,
			format: THREE.RGBAFormat,
			colorSpace: THREE.LinearSRGBColorSpace,
			depthBuffer: false,
			stencilBuffer: false,
			magFilter: THREE.LinearFilter,
			minFilter: THREE.LinearMipmapLinearFilter,
			generateMipmaps: true
		}

		this.renderTargetA = new THREE.WebGLRenderTarget(size, size, rtOpts)
		this.renderTargetB = new THREE.WebGLRenderTarget(size, size, rtOpts)

		this.uniforms = this.createUniforms()
		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: drawVertexShader,
			fragmentShader: drawFragmentShader,
			depthTest: false,
			transparent: true
		})

		this.scene = new THREE.Scene()
		this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.material)
		this.scene.add(this.mesh)
	}

	private createUniforms(): DrawRendererUniforms {
		const [radiusX, radiusY, radiusZ] = DRAW_RENDERER.UNIFORMS.RADIUS_VECTOR
		return {
			uRadius: { value: new THREE.Vector3(radiusX, radiusY, radiusZ) },
			uPosition: { value: new THREE.Vector2(0, 0) },
			uDirection: { value: new THREE.Vector4(0, 0, 0, 0) },
			uResolution: { value: new THREE.Vector3(0, 0, 0) },
			uTexture: { value: null },
			uSizeDamping: { value: DRAW_RENDERER.UNIFORMS.SIZE_DAMPING },
			uFadeDamping: { value: DRAW_RENDERER.UNIFORMS.FADE_DAMPING },
			uDraw: { value: 0 }
		}
	}

	updateRadius(px = 0): void {
		this.uniforms.uRadius.value.z = px
	}

	updateDraw(value = 0): void {
		this.uniforms.uDraw.value = value
	}

	updatePosition(position: { x: number; y: number }, normalized = false): void {
		let x = position.x
		let y = position.y
		if (normalized) {
			x = 0.5 * position.x + 0.5
			y = 0.5 * position.y + 0.5
		}
		this.uniforms.uPosition.value.set(x, y)
	}

	updateDirection(direction: { x: number; y: number }): void {
		this.uniforms.uDirection.value.set(
			direction.x,
			direction.y,
			0,
			DRAW_RENDERER.UNIFORMS.DIRECTION_MULTIPLIER
		)
	}

	resize(width: number, height: number): void {
		const ratio = height / (this.options.radiusRatio ?? DRAW_RENDERER.RADIUS_RATIO)
		const baseRadius = this.options.isMobile
			? DRAW_RENDERER.MOBILE_RADIUS
			: DRAW_RENDERER.DESKTOP_RADIUS
		const radius = baseRadius * ratio

		this.updateRadius(radius)
		this.uniforms.uResolution.value.set(width, height, 1)
	}

	getTexture(): THREE.Texture {
		return this.renderTargetB.texture
	}

	render(renderer: THREE.WebGLRenderer): void {
		this.uniforms.uTexture.value = this.renderTargetB.texture
		const previousTarget = renderer.getRenderTarget()
		renderer.setRenderTarget(this.renderTargetA)
		if (renderer.autoClear) renderer.clear()
		renderer.render(this.scene, this.camera)
		renderer.setRenderTarget(previousTarget)

		// Ping-pong between render targets
		const temp = this.renderTargetA
		this.renderTargetA = this.renderTargetB
		this.renderTargetB = temp
	}

	/**
	 * Dispose of all resources
	 */
	dispose(): void {
		this.material.dispose()
		this.renderTargetA.dispose()
		this.renderTargetB.dispose()
		this.mesh.geometry.dispose()
	}
}

const thermalVertexShader = `
/**
 * Thermal Effect Vertex Shader
 * Simple pass-through that prepares UV coordinates for the fragment shader
 */
varying vec2 vUv;
varying vec4 vClipPosition;

void main() {
    vUv = uv;
    vClipPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = vClipPosition;
}
`

const thermalFragmentShader = `
/**
 * Thermal Effect Fragment Shader
 * Thermal effect visible only inside the logo shape
 * Loops procedurally with bottom-to-top animation
 */
precision highp float;

// Input textures
uniform sampler2D drawMap; // Mouse interaction heat map
uniform sampler2D maskMap; // Logo mask (alpha channel)
uniform float time; // Time for animation

// Animation / effect parameters
uniform float opacity;
uniform float amount;
uniform vec2 scale;
uniform vec2 offset;
uniform float power;
uniform float effectIntensity;
uniform float colorSaturation;
uniform float gradientShift;
uniform float interactionSize;

// Color palette (7-color thermal gradient)
uniform vec3 color1, color2, color3, color4, color5, color6, color7;
uniform vec4 blend, fade, maxBlend;

varying vec2 vUv;
varying vec4 vClipPosition;

// Convert RGB to luminance for saturation adjustment
vec3 linearRgbToLuminance(vec3 c) {
    float f = dot(c, vec3(0.2126729, 0.7151522, 0.0721750));
    return vec3(f);
}

// Adjust color saturation
vec3 saturation(vec3 c, float s) {
    return mix(linearRgbToLuminance(c), c, s);
}

// Simple procedural noise
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453);
}

// Smooth noise
float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = noise(i);
    float b = noise(i+vec2(1.0,0.0));
    float c = noise(i+vec2(0.0,1.0));
    float d = noise(i+vec2(1.0,1.0));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}

// Thermal gradient function
vec3 gradient(float t) {
    t = clamp(t + gradientShift, 0.0, 1.0);
    float p1 = blend.x, p2 = blend.y, p3 = blend.z, p4 = blend.w;
    float p5 = maxBlend.x, p6 = maxBlend.y;
    float f1 = fade.x, f2 = fade.y, f3 = fade.z, f4 = fade.w;
    float f5 = maxBlend.z, f6 = maxBlend.w;
    float b1 = smoothstep(p1-f1*0.5, p1+f1*0.5, t);
    float b2 = smoothstep(p2-f2*0.5, p2+f2*0.5, t);
    float b3 = smoothstep(p3-f3*0.5, p3+f3*0.5, t);
    float b4 = smoothstep(p4-f4*0.5, p4+f4*0.5, t);
    float b5 = smoothstep(p5-f5*0.5, p5+f5*0.5, t);
    float b6 = smoothstep(p6-f6*0.5, p6+f6*0.5, t);
    vec3 col = color1;
    col = mix(col, color2, b1);
    col = mix(col, color3, b2);
    col = mix(col, color4, b3);
    col = mix(col, color5, b4);
    col = mix(col, color6, b5);
    col = mix(col, color7, b6);
    return col;
}

void main() {
    // Clip space UV for drawMap
    vec2 duv = vClipPosition.xy / vClipPosition.w;
    duv = 0.5 + duv*0.5;

    // Transform UV
    vec2 uv = vUv;
    uv -= 0.5;
    uv /= scale;
    uv += 0.5;
    uv += offset;

    float o = clamp(opacity, 0.0, 1.0);
    float a = clamp(amount, 0.0, 1.0);
    float v = o * a;

    // Sample logo mask (alpha)
    vec4 tex = texture(maskMap, uv);
    float mask = tex.a;

    // Sample mouse interaction heat map
    vec3 draw = texture(drawMap, duv).rgb;
    float heatDraw = draw.b * mask * interactionSize;

    // Add procedural animation for continuous bottom-to-top looping glow
    float noiseAnim = smoothNoise(uv * 5.0 + vec2(time*1.0, time*1.2)); // Noise for organic texture
    float waveAnim = 0.5 + 0.5 * sin(time * 0.5 + uv.y * 8.0); // Bottom-to-top motion (time + uv.y makes waves move upward)
    float timeAnim = mix(noiseAnim, waveAnim, 1.0); // Blend with more weight on wave for clearer direction
    heatDraw += 0.8 * timeAnim; // Apply animation with strong visibility

    // Base intensity
    float map = pow(heatDraw, power);

    // Generate final color
    vec3 final = gradient(map);
    final = saturation(final, colorSaturation);

    // Intensify glow effect
    final *= mask * (1.0 + map*1.5); // Stronger glow inside logo

    // Blend with base zero
    final = mix(vec3(0.0), final, v * effectIntensity);

    // Apply logo mask
    final *= mask;
    float alpha = mask * (o * a * effectIntensity);

    gl_FragColor = vec4(final, alpha);
}
`;

const drawVertexShader = `
/**
 * Draw Renderer Vertex Shader
 * Simple pass-through for mouse interaction texture rendering
 */

precision highp float;
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const drawFragmentShader = `
/**
 * Draw Renderer Fragment Shader
 *
 * Creates a mouse interaction heat map by tracking cursor position and movement.
 * Uses ping-pong rendering between two render targets for temporal effects.
 *
 * Outputs:
 * - R/G channels: Movement direction vectors for distortion effects
 * - B channel: Heat intensity based on interaction
 */

precision highp float;

uniform float uDraw;
uniform vec3 uRadius;
uniform vec3 uResolution;
uniform vec2 uPosition;
uniform vec4 uDirection;
uniform float uSizeDamping;
uniform float uFadeDamping;
uniform sampler2D uTexture;

varying vec2 vUv;


void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 pos = uPosition;
    pos.y /= aspect;
    vec2 uv = vUv;
    uv.y /= aspect;

    float dist = distance(pos, uv) / ((uRadius.z * 1.5) / uResolution.x);

    dist = smoothstep(uRadius.x, uRadius.y, dist);

    vec3 dir = uDirection.xyz * uDirection.w;
    vec2 offset = vec2((-dir.x) * (1.0 - dist), (dir.y) * (1.0 - dist));

    vec4 color = texture(uTexture, vUv + (offset * 0.01));
    color *= uFadeDamping;
    color.r += offset.x;
    color.g += offset.y;
    color.rg = clamp(color.rg, -1.0, 1.0);
    color.b += uDraw * (1.0 - dist);

    gl_FragColor = vec4(color.rgb, 1.0);
}
`


// Default effect parameters
const DEFAULT_PARAMETERS: EffectParameters = {
  // Visual parameters
  effectIntensity: 1.3,
  contrastPower: 0.8,
  colorSaturation: 1.5,
  heatSensitivity: 0.5,
  videoBlendAmount: 1.0,
  gradientShift: 0.0,

  // Behavioral parameters
  heatDecay: 0.9,
  interactionRadius: 1.0,
  reactivity: 3.0
} as const

// Apple's thermal gradient colors (black to red/orange spectrum)
const THERMAL_PALETTE = [
  '000000', // Black
  '073dff', // Deep blue
  '53d5fd', // Cyan
  'fefcdd', // Light yellow
  'ffec6a', // Yellow
  'f9d400', // Orange
  'a61904'  // Red
] as const

// Animation timing constants
const ANIMATION = {
  FADE_IN_SPEED: 0.1,
  MOUSE_INTERPOLATION_SPEED: 0.8,
  SCROLL_INTERPOLATION_SPEED: 0.2,
  MOVEMENT_INTERPOLATION_SPEED: 0.01,
  POWER_INTERPOLATION_SPEED: 0.01,
  VIDEO_BLEND_SPEED: 0.1,

  HEAT_MAX_VALUE: 1.3,
  TARGET_FPS: 60,

  // Power value constraints
  POWER_MIN: 0.8,
  POWER_MAX: 1.0
} as const

// Draw renderer configuration
const DRAW_RENDERER = {
  TEXTURE_SIZE: 256,
  RADIUS_RATIO: 1000,
  MOBILE_RADIUS: 350,
  DESKTOP_RADIUS: 220,

  // Shader uniform defaults
  UNIFORMS: {
    RADIUS_VECTOR: [-8, 0.9, 150] as const,
    SIZE_DAMPING: 0.8,
    FADE_DAMPING: 0.98,
    DIRECTION_MULTIPLIER: 100
  }
} as const

// Shader gradient blend parameters
const GRADIENT_CONFIG = {
  // Blend points for color transitions
  BLEND_POINTS: [0.4, 0.7, 0.81, 0.91] as const,

  // Fade ranges for smooth blending
  FADE_RANGES: [1, 1, 0.72, 0.52] as const,

  // Maximum blend values
  MAX_BLEND: [0.8, 0.87, 0.5, 0.27] as const,

  // Effect modifiers
  VERTICAL_GRADIENT_START: 0.2,
  VERTICAL_GRADIENT_END: 0.5,
  VERTICAL_GRADIENT_MIX: 0.91,

  CIRCULAR_FADE_CENTER: [0.5, 0.52] as const,
  CIRCULAR_FADE_INNER: 0.5,
  CIRCULAR_FADE_OUTER: 0.62
} as const

// Camera configuration
const CAMERA_CONFIG = {
  // Orthographic camera bounds
  LEFT: -0.5,
  RIGHT: 0.5,
  TOP: 0.5,
  BOTTOM: -0.5,
  NEAR: -1,
  FAR: 1,
  POSITION_Z: 1
} as const

// Interaction thresholds and limits
const INTERACTION = {
  HEAT_DECAY_MIN: 0.8,
  HEAT_DECAY_MAX: 0.99,
  HEAT_SENSITIVITY_MIN: 0.1,
  HEAT_SENSITIVITY_MAX: 2.0,
  INTERACTION_RADIUS_MIN: 0.1,
  INTERACTION_RADIUS_MAX: 3.0,
  REACTIVITY_MIN: 0.1,
  REACTIVITY_MAX: 3.0,

  // Movement-based opacity modifiers
  HOLD_MOVE_TARGET: 0.95,
  RELEASE_MOVE_TARGET: 1.0,
  HOLD_POWER_TARGET: 1.0,
  RELEASE_POWER_TARGET: 0.8,

  // Heat cleanup threshold
  HEAT_CLEANUP_THRESHOLD: 0.001
} as const

// Effect parameters that can be controlled via UI
interface EffectParameters {
  // Visual parameters
  effectIntensity: number
  contrastPower: number
  colorSaturation: number
  heatSensitivity: number
  videoBlendAmount: number
  gradientShift: number

  // Behavioral parameters
  heatDecay: number
  interactionRadius: number
  reactivity: number
}

// Shader uniform types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ThermalShaderUniforms extends Record<string, { value: any }> {
  // Texture uniforms
  blendVideo: { value: number }
  drawMap: { value: THREE.Texture }
  textureMap: { value: THREE.Texture }
  maskMap: { value: THREE.Texture }

  // Transform uniforms
  scale: { value: [number, number] }
  offset: { value: [number, number] }
  opacity: { value: number }
  amount: { value: number }

  // Color uniforms (7-color thermal gradient)
  color1: { value: [number, number, number] }
  color2: { value: [number, number, number] }
  color3: { value: [number, number, number] }
  color4: { value: [number, number, number] }
  color5: { value: [number, number, number] }
  color6: { value: [number, number, number] }
  color7: { value: [number, number, number] }

  // Gradient blend parameters
  blend: { value: [number, number, number, number] }
  fade: { value: [number, number, number, number] }
  maxBlend: { value: [number, number, number, number] }

  // Effect parameters
  power: { value: number }
  rnd: { value: number }
  heat: { value: [number, number, number, number] }
  stretch: { value: [number, number, number, number] }

  // HUD controllable parameters
  effectIntensity: { value: number }
  colorSaturation: { value: number }
  gradientShift: { value: number }
  interactionSize: { value: number }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DrawRendererUniforms extends Record<string, { value: any }> {
  uRadius: { value: THREE.Vector3 }
  uPosition: { value: THREE.Vector2 }
  uDirection: { value: THREE.Vector4 }
  uResolution: { value: THREE.Vector3 }
  uTexture: { value: THREE.Texture | null }
  uSizeDamping: { value: number }
  uFadeDamping: { value: number }
  uDraw: { value: number }
}

// Animation state
interface AnimationValues {
  blendVideo: { value: number; target: number }
  amount: { value: number; target: number }
  mouse: {
    position: THREE.Vector3
    target: THREE.Vector3
  }
  move: { value: number; target: number }
  scrollAnimation: {
    opacity: { value: number; target: number }
    scale: { value: number; target: number }
    power: { value: number; target: number }
  }
}

// Interaction state
interface MouseState {
  position: THREE.Vector3
  target: THREE.Vector3
}

interface InteractionState {
  hold: boolean
  heatUp: number
  lastNX: number
  lastNY: number
}

// Component interfaces
interface DrawRendererOptions {
  radiusRatio?: number
  isMobile?: boolean
}

// Cleanup interface
interface Disposable {
  dispose(): void
}
