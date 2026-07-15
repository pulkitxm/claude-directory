# Sidi Bou Said — A Procedural 3D Walk Above the Gulf of Tunis

## Overview

Write a complete, production-ready, single-file HTML/JavaScript application that renders a highly detailed, photo-realistic, navigable 3D scene of the iconic cliffside village of **Sidi Bou Said, Tunisia** using Three.js.

## Critical Instructions — No Lazy Code

- **No external asset URLs.** Do not use any external asset URLs (no external `.gltf`, `.obj`, `.jpg`, or `.png` files) as they can break or fail CORS. All textures, heights, and models must be generated dynamically and procedurally within the script — for example, using an HTML canvas to draw textures, procedural noise algorithms for plaster and stone, or mathematical structures for 3D meshes.
- **No placeholders.** Do not write placeholder comments, truncated code blocks, `// TODO` markers, or "left as an exercise" shorthand. Every single function, shader, loop, and variable must be written out in its entirety.
- **Single file.** The output must be a single, copy-pasteable HTML file that runs perfectly immediately when opened in a browser.

## Technical Requirements & Features

### 1. Libraries

- Load Three.js and `OrbitControls` via a reliable CDN (cdnjs or unpkg).

### 2. Iconic Architecture (Sidi Bou Said style)

- **White-washed plaster walls**: Buildings with flat roofs, rounded corners, and a couple of traditional domes (*koubba*). Implement a procedural stucco texture (low-frequency noise bump map) applied to a clean matte-white material to mimic hand-plastered walls.
- **Sidi Bou Said blue accents**: Distinctive vibrant blue doors, arched frames, and window grates.
- **Ornamental windows & doors**: Procedurally generate arched wooden doors featuring detailed black ornamental stud patterns (drawn using canvas coordinates). Create blue wooden window screens (*mushrabiya*) or curved wrought-iron protective grilles using nested geometries.

### 3. Cliffside Terrain & Cobblestone Alleyway

- Establish a winding, sloped pedestrian alleyway representing the steep streets of the village, ending at a viewpoint overlook.
- The street must use a procedural cobblestone texture (canvas-generated noise representing individual rounded stones with grey grout) applied as a displacement and roughness map.
- Add a rustic stone retaining wall / barrier at the edge of the cliff.

### 4. The Mediterranean Overlook (background sea & sky)

- Provide a dramatic view of the Gulf of Tunis below the cliff.
- **Water**: Use a custom shader (or a deep-blue `MeshStandardMaterial` with layered scrolling normal maps) to simulate calm, glittering sea water reflecting the afternoon sun.
- **Sky**: A warm, bright Mediterranean sky with subtle atmospheric scattering and a powerful sun source.

### 5. Procedural Flora (vibrant bougainvillea & olive trees)

- **Bougainvillea**: Create climbing vines draped over the white walls. Use instanced meshes for thousands of tiny, vibrant magenta/pink petals (procedural alpha-masked shapes) clustered together.
- **Potted plants**: Place terracotta pots along the alleyway containing small green plants and flowers.

### 6. Mediterranean Lighting & Shadows

- Set up a high-intensity `DirectionalLight` representing the intense Tunisian sun, casting sharp but soft-edged shadows (`THREE.PCFSoftShadowMap`).
- Use a `HemisphereLight` with a sky-blue hemisphere color and a warm sandy ground color to emulate realistic bounce light bouncing off the white walls.
- Configure `ACESFilmicToneMapping` to handle the high contrast between the bright white-washed walls and deep blue shadows without blowing out the highlights.

### 7. Navigation & Exploration

- Implement `OrbitControls` or a first-person WASD / pointer-lock setup. Restrict the camera height and boundary limits to keep the user at human scale (eye level) as they navigate up and down the winding blue-and-white alleyway.

### 8. Optimization

- Maintain 60 fps on standard desktop GPUs by employing instanced geometry for repeating architectural elements (stairs, window frames, flowers) and handling window resizing flawlessly.

---

Generate the full, un-truncated, single-file HTML code now.
</content>
</invoke>
