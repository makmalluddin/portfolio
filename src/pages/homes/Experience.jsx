import MainFrame from "@/src/components/MainFrame";
import ExperienceCard from "@/src/components/experience/ExperienceCard";
import { experiencesData as experienceData } from "@/src/data/experienceData.jsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Experience() {
  return (
    <section id="experiences">
      <MainFrame
        title={
          <p className="font-mono tracking-wide text-sm">
            02 / <span className="text-text-secondary font-medium">PENGALAMAN</span>
          </p>
        }
      >
        {experienceData.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}

        <Link
          to={'experiences/'}
          className="flex gap-2 px-8 py-6 items-center justify-center hover:bg-bg-surface/60 transition-all"
        >
          <span className="uppercase font-mono text-sm text-text-muted">
            LIHAT PENGALAMAN LAINNYA
          </span>
          <ArrowRight className="-rotate-45 size-4" />
        </Link>
      </MainFrame>
    </section>
  );
}

export default Experience;
