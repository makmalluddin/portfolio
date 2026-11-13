import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainFrame from "@/src/components/MainFrame"
import Reveal from "@/src/components/Reveal"
import ExperienceCard from "@/src/components/experience/ExperienceCard";
import categoriesData from "@/src/data/content/experience-categories.json";
import { experienceCategoryCollections } from "@/src/data/experienceCategoryCollections";
import professionalData from "@/src/data/content/experiences-professional.json";
import freelanceData from "@/src/data/content/experiences-freelance.json";
import volunteerData from "@/src/data/content/experiences-volunteer.json";
import bootcampData from "@/src/data/content/experiences-bootcamp.json";

const experienceDataByCollection = {
  "experiences-professional": professionalData,
  "experiences-freelance": freelanceData,
  "experiences-volunteer": volunteerData,
  "experiences-bootcamp": bootcampData,
};

function ExperiencePage() {
  const categories = categoriesData;
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <MainFrame
        title={
          <p className="font-mono tracking-wide text-sm">
            02 / <span className="text-text-secondary font-medium">PENGALAMAN</span>
          </p>
        }
      >
        <Reveal className="py-12 px-8 flex flex-col gap-2">
          <h3 className="text-4xl md:text-5xl font-bold scale-y-90">
            <span className="text-blue-2">Profesional </span>& Non-Formal.
          </h3>
          <p>
            Pengalaman kerja, freelance, volunteer, & pendidikan.
          </p>
        </Reveal>

        {categories.map((category) => {
          const collectionKey = experienceCategoryCollections[category.id];
          const experiences = experienceDataByCollection[collectionKey] || [];

          if (experiences.length === 0) return null;

          return (
            <div key={category.id}>
              <Reveal className="uppercase text-sm px-8 py-4 text-text-muted font-mono">
                {category.label}
              </Reveal>
              {experiences.map((exp) => (
                <div className="border-t border-border-muted">
                  <ExperienceCard key={exp.id} experience={exp} />
                </div>
              ))}
            </div>
          );
        })}
      </MainFrame>
    </div>
  );
}

export default ExperiencePage;
