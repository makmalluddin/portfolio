import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { colorVariants } from "@/src/data/colorVariants";

function ProjectCard({ project }) {
  const accent = colorVariants[project.accentColor] || colorVariants["blue-1"];

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative flex flex-col py-4 h-full border-b border-r border-border-muted transition-colors duration-200"
    >
      <div
        className={`absolute top-0 left-0 w-full h-0.5 ${accent.bg} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out`}
      />

      <div className="w-full flex justify-between items-center text-text-muted text-sm px-6">
        <p className={`caption p-1 text-white font-mono ${accent.bg}`}>
          {project.number}
        </p>
        <p className="caption text-text-muted tracking-wider uppercase">
          {project.category}
        </p>
      </div>

      <div className="py-4 overflow-hidden">
        <div className="overflow-hidden aspect-video w-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex items-start px-6 py-1">
        <h3 className="font-inter text-2xl font-semibold">
          {project.title}{" "}
          <span className={accent.text}>{project.highlightTitle}.</span>
        </h3>
      </div>

      <p className="px-6 text-md leading-relaxed mt-1">
        {project.description}
      </p>

      <div className="flex flex-wrap px-6 gap-2 py-6">
        {project.highlightTags?.map((tag, index) => (
          <span
            key={`highlight-${index}`}
            className={`font-mono font-semibold text-xs border px-2 py-1 bg-bg-muted ${accent.text} ${accent.border}`}
          >
            {tag}
          </span>
        ))}
        {project.tags?.map((tag, index) => (
          <span
            key={`tag-${index}`}
            className="font-mono font-semibold text-xs border border-border-bold/60 px-2 py-1 text-text-muted bg-bg-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="font-mono text-text-muted mt-auto px-6 pt-2 flex items-center gap-1.5 text-sm font-medium transition-colors duration-200">
        <span className={`group-hover:text-text-secondary transition-colors duration-200`}>
          DETAIL PROJEK
        </span>
        <ArrowUpRight
          className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${accent.text}`}
        />
      </div>
    </Link>
  );
}

export default ProjectCard;
