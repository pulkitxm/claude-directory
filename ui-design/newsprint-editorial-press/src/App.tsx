import { Masthead } from "@/components/sections/Masthead";
import { FrontPage } from "@/components/sections/FrontPage";
import { TheBrief } from "@/components/sections/TheBrief";
import { Desks } from "@/components/sections/Desks";
import { HowItsFiled } from "@/components/sections/HowItsFiled";
import { Dispatches } from "@/components/sections/Dispatches";
import { Subscribe } from "@/components/sections/Subscribe";
import { Questions } from "@/components/sections/Questions";
import { Colophon } from "@/components/sections/Colophon";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <Masthead />
      <main>
        <FrontPage />
        <TheBrief />
        <Desks />
        <OrnamentDivider label="Continued on the next page" />
        <HowItsFiled />
        <Dispatches />
        <OrnamentDivider label="The business of the paper" />
        <Subscribe />
        <Questions />
      </main>
      <Colophon />
    </div>
  );
}
