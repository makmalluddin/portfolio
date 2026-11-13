import MainFrame from "@/src/components/MainFrame";
import ProjectCard from "@/src/components/project/ProjectCard";
import { projectData } from "@/src/data/projectData.jsx";

function Projects() {
  return (
    <section id="projects">
      <MainFrame
        title={
          <p className="font-mono tracking-wide text-sm">
            01 / <span className="text-text-secondary font-medium">PROJEK</span>
          </p>
        }
      >
        <div className="-m-8 overflow-hidden p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mr-px -mb-px">
            {projectData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </MainFrame>
    </section>
  );
}

export default Projects;
