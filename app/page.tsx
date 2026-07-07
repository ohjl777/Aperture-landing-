"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScenarioSection from "@/components/ScenarioSection";
import PopupGrid from "@/components/PopupGrid";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import ScrollRail from "@/components/ScrollRail";

export default function Home() {
  return (
    <>
      <FilmGrain />
      <ScrollRail />
      <Nav />

      <main id="scenes">
        <Hero />

        <ScenarioSection
          index="01"
          kicker="SCENE"
          title="Write the scene,"
          titleAccent="not the prompt."
          description="Describe the beat the way you'd pitch it to a DP — blocking, mood, lens choice. Aperture reads intent, not keywords, and drafts coverage that matches how film actually gets made."
          direction="left"
          accent="amber"
          features={[
            { label: "INPUT", detail: "Plain-language scene descriptions, script pages, or a shot list." },
            { label: "OUTPUT", detail: "Storyboarded coverage in wide, medium, and close variants." },
            { label: "LENS", detail: "Focal length and depth of field inferred from your blocking notes." },
            { label: "TIMING", detail: "First draft frames back in under ninety seconds." },
          ]}
        />

        <ScenarioSection
          index="02"
          kicker="SCENE"
          title="Lock continuity"
          titleAccent="across every take."
          description="A character's jacket, a set's practical lights, a prop's position — Aperture's continuity engine remembers every detail across hundreds of shots so nothing drifts between scenes."
          direction="right"
          accent="tally"
          features={[
            { label: "WARDROBE", detail: "Costume and prop state persists automatically shot to shot." },
            { label: "CAST", detail: "Faces, builds, and performance style stay consistent across a reel." },
            { label: "SET", detail: "Practical lighting and dressing carry over between camera setups." },
            { label: "AUDIT", detail: "A diff view flags anything that drifted before you notice it." },
          ]}
        />

        <ScenarioSection
          index="03"
          kicker="SCENE"
          title="Grade it live,"
          titleAccent="not in post."
          description="Push a look across an entire sequence and watch every frame re-render in your color space of choice — so creative decisions happen on set, not three weeks later in a color bay."
          direction="left"
          accent="amber"
          features={[
            { label: "LUTS", detail: "Apply and preview any 3D LUT across a full sequence instantly." },
            { label: "SCOPES", detail: "Built-in waveform and vectorscope for on-set confidence." },
            { label: "HDR", detail: "Grade once, deliver Rec. 709 and HDR masters together." },
            { label: "NOTES", detail: "Director notes attach directly to timecoded frames." },
          ]}
        />

        <PopupGrid />

        <ClosingCTA />
      </main>

      <Footer />
    </>
  );
}
