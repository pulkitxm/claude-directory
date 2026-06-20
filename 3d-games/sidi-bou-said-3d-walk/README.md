# Sidi Bou Said — A Procedural 3D Walk Above the Gulf of Tunis

A single-file Three.js scene that recreates the cliffside village of Sidi Bou Said, Tunisia, and lets you navigate its winding blue-and-white alleyway at eye level. Every texture and mesh is generated procedurally in-script — no external assets — so the whole thing runs from one copy-pasteable HTML file.

The scene leans on the village's signature look: white-washed plaster walls (procedural stucco bump maps on a matte-white material), flat roofs with traditional domes (*koubba*), and vibrant Sidi Bou Said blue on arched doors, window grates, and *mushrabiya* screens. A sloped cobblestone street (canvas-generated displacement/roughness) climbs to a cliff-edge overlook above the Gulf of Tunis, where a shader-driven sea glitters under a warm Mediterranean sky. Instanced bougainvillea petals drape the walls and terracotta pots line the alley.

Lighting pairs a high-intensity `DirectionalLight` (PCF soft shadows) with a sky/ground `HemisphereLight` for bounce, tone-mapped through `ACESFilmicToneMapping` to hold the contrast between bright plaster and deep blue shade. Repeating elements use instanced geometry to target 60fps. Navigation is handled via Three.js controls with height and boundary limits to keep the camera human-scale.

## Run

This is a static project — open `sidi-bou-said.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
