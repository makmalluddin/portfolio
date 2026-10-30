import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function ExperienceCard({ experience }) {
  return (
    <Link
      to={`/experience/${experience.slug}`}
      className="group flex flex-col md:flex-row py-8 px-8 gap-6 md:gap-32 transition-colors duration-200 hover:bg-bg-surface/50"
    >
      <div className="flex flex-col gap-2 shrink-0 md:w-28">
        <p className="text-xs font-mono text-text-muted whitespace-nowrap">
          {experience.period}
        </p>
        {experience.type && (
          <span className="font-mono text-[10px] w-fit px-2 py-0.5 border border-border-muted text-text-muted uppercase">
            {experience.type}
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-2xl md:text-3xl font-bold scale-y-90 text-text-primary">
              {experience.role}
            </h4>
            <ArrowRight className="w-6 h-6 text-text-primary transition-transform duration-200 group-hover:translate-x-2" />
          </div>
          <p className="font-medium text-text-secondary mt-1">
            {experience.company}
          </p>
        </div>

        <p className="max-w-3xl leading-relaxed">
          {experience.description}
        </p>
      </div>
    </Link>
  );
}

export default ExperienceCard;
