import MainFrame from "@/src/components/MainFrame";
import WorkTimelineTable from "./WorkLineTable";
import { projectData } from "@/src/data/projectData";
import ProjectCard from "@/src/components/project/ProjectCard";

function ExperienceDetailSlug({ experience }) {
  const {
    companyName,
    role,
    logo,
    caption,
    metaData,
    detailPengalaman,
    teknologi,
    relatedProjectKey,
  } = experience;

  const relatedProject = projectData.filter(
    (item) => item.related === relatedProjectKey
  );

  return (
    <div>
      {/* Hero Section */}
      <MainFrame
        title={
          <p className="font-mono font-medium text-sm">
            <span className="uppercase text-sm">
              {role} {relatedProjectKey}
            </span>
          </p>
        }
      >
        <div className="flex flex-col px-4 md:px-8 py-12 md:py-16 items-center justify-center gap-4 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={logo}
              alt={companyName}
              className="border border-border-muted size-20 object-contain rounded-sm"
            />

            <p className="font-mono text-xs md:text-sm tracking-tight uppercase">
              {companyName}
            </p>
          </div>
          <h2 className="font-bold text-3xl md:text-6xl scale-y-90">
            {role.split(" ")[0]}{" "}
            <span className="text-green-blue-1">
              {role.split(" ").slice(1).join(" ")}
            </span>
            .
          </h2>
          <p className="max-w-xl text-center text-sm md:text-base">{caption}</p>
          <div className="flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 sm:divide-x border border-border-muted divide-border-muted">
            {metaData.map((item) => (
              <span
                key={item.id}
                className="flex gap-1 items-center justify-center px-4 py-2 text-text-secondary text-sm"
              >
                <span className="text-md text-text-muted/70">{item.icon}</span>
                <span>{item.value}</span>
              </span>
            ))}
          </div>
        </div>
      </MainFrame>

      <MainFrame
        title={
          <p className="font-mono text-text-muted text-sm">
            01 / ALUR PEKERJAAN
          </p>
        }
      >
        <WorkTimelineTable />
      </MainFrame>

      <MainFrame
        title={
          <p className="font-mono text-text-muted text-sm">02 / KONTEKS</p>
        }
      >
        <h3 className="px-4 md:px-8 py-8 md:py-16 font-bold text-3xl md:text-5xl scale-y-90">
          Detail <span className="text-green-blue-1">Pengalaman</span>.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 -mr-px -mb-px">
          {detailPengalaman.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 px-6 md:px-8 py-8 border-r border-b border-border-muted"
            >
              <div className="flex w-full justify-between items-end">
                <span className="border border-border-muted p-2 text-green-blue-1/80">
                  {item.icon}
                </span>
                <span className="font-mono text-text-muted text-xs">
                  0{item.id}
                </span>
              </div>
              <h4 className="font-bold text-lg md:text-xl">{item.title}</h4>
              <p className="text-text-muted text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </MainFrame>

      <MainFrame
        title={
          <p className="font-mono text-text-muted text-sm">03 / TEKNOLOGI</p>
        }
      >
        <h3 className="px-4 md:px-8 py-8 md:py-16 font-bold text-3xl md:text-5xl scale-y-90">
          Alat dan <span className="text-green-blue-1">Teknologi</span>.
        </h3>
        {teknologi.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row px-4 md:px-8 py-6 items-start sm:items-center justify-start gap-2 sm:gap-0"
          >
            <span className="font-mono text-sm text-text-muted/80 w-20 shrink-0">
              0{item.id}
            </span>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-16 w-full">
              <span className="text-text-secondary text-base md:text-lg min-w-60 font-medium">
                {item.type}
              </span>
              <span className="font-inter text-text-secondary text-sm md:text-lg tracking-wider">
                {item.tools}
              </span>
            </div>
          </div>
        ))}
      </MainFrame>

      {/* Section 04: Projek Dikerjakan */}
      <MainFrame
        title={
          <p className="font-mono text-text-muted text-sm">
            04 / PROJEK DIKERJAKAN
          </p>
        }
      >
        <div className="-m-8 overflow-hidden p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mr-px -mb-px">
            {relatedProject.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </MainFrame>
    </div>
  );
}

export default ExperienceDetailSlug;
