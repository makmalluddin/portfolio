import MainFrame from "@/src/components/MainFrame"
import ExperienceCard from "@/src/components/experience/ExperienceCard";
import { experiencesData as experienceData } from "@/src/data/experienceData.jsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ExperiencePage() {
  return (
    <div>
      <MainFrame
        title={
          <p className="font-mono tracking-wide text-sm">
            02 / <span className="text-text-secondary font-medium">PENGALAMAN</span>
          </p>
        }
      >
        <div className="py-12 px-8 flex flex-col gap-2">
          <h3 className="text-4xl md:text-5xl font-bold scale-y-90">
            <span className="text-blue-2">Profesional </span>& Non-Formal.
          </h3>
          <p>
            Pengalaman kerja, freelance, volunteer, & bootcamp.
          </p>
        </div>

        <div className="uppercase text-sm px-8 py-4 text-text-muted font-mono">
          Profesional
        </div>
        {experienceData.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}

        <div className="uppercase text-sm px-8 py-4 text-text-muted font-mono">
          Freelance
        </div>
        {experienceData.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}

      </MainFrame>
    </div >
  )
}

export default ExperiencePage;
