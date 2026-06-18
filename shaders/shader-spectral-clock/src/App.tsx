import { useState } from "react";
import { HeroStage } from "@/components/lab/HeroStage";
import { ControlDeck, DEFAULT_UNIFORMS, type Uniforms } from "@/components/lab/ControlDeck";
import { ContentSections } from "@/components/lab/Sections";
import { WORLD_PRESETS, type WorldPreset } from "@/components/lab/presets";

export default function App() {
  const [uniforms, setUniforms] = useState<Uniforms>(DEFAULT_UNIFORMS);
  const [preset, setPreset] = useState<WorldPreset>(WORLD_PRESETS[0]);
  // The clock label is editable independently (the brief lets you rename the city);
  // selecting a preset resets it to that city's name.
  const [cityLabel, setCityLabel] = useState<string>(WORLD_PRESETS[0].city);

  const applyPreset = (p: WorldPreset) => {
    setPreset(p);
    setUniforms(p.uniforms);
    setCityLabel(p.city);
  };

  return (
    <main className="min-h-screen bg-ink text-paper selection:bg-spec-cyan/30">
      {/* Ambient page-level glow. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% -10%, rgba(123,44,255,0.16), transparent 60%)," +
            "radial-gradient(40% 40% at 100% 0%, rgba(44,240,216,0.10), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 sm:pt-7">
        <HeroStage
          uniforms={uniforms}
          preset={preset}
          cityLabel={cityLabel}
          onCityChange={setCityLabel}
        />
      </div>

      <ControlDeck
        uniforms={uniforms}
        onChange={setUniforms}
        onReset={() => setUniforms(DEFAULT_UNIFORMS)}
        activePreset={preset.id}
        onPreset={applyPreset}
      />

      <ContentSections />
    </main>
  );
}
