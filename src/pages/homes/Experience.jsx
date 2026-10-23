import MainFrame from "@/src/components/MainFrame";
import ExperienceCard from "@/src/components/experience/ExperienceCard";
import { experiencesData as experienceData } from "@/src/data/experienceData.jsx";

function Experience() {
  return (
    <MainFrame
      title={
        <p className="font-mono tracking-wide text-sm">
          02 / <span className="text-text-secondary font-medium">PENGALAMAN</span>
        </p>
      }
    >
      <div className="py-12 px-8 flex flex-col gap-2">
        <h3 className="text-4xl md:text-5xl font-bold scale-y-90">
          Profesional & Non-Formal.
        </h3>
        <p>
          Pengalaman kerja, freelance, volunteer, & bootcamp.
        </p>
      </div>

      {experienceData.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}
    </MainFrame>
  );
}

export default Experience;
