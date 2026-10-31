import MainFrame from "@/src/components/MainFrame";
import Button from "@/src/utils/Button";
import { colorVariants } from "@/src/data/colorVariants";

function ProjectDetailSlug({ project }) {
  if (!project) return null;

  const variant = colorVariants[project.colorVariantKey] || colorVariants["blue-1"];

  return (
    <div>
      {/* Header & Hero */}
      <MainFrame
        title={
          <p className="font-mono tracking-wide text-xs sm:text-sm">
            <span className="text-text-secondary font-medium">
              {project.categoryTitle}
            </span>
          </p>
        }
      >
        <div className="flex flex-col mx-auto max-w-4xl items-center justify-center py-10 md:py-20 px-4 md:px-0 gap-4 md:gap-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl text-text-primary scale-y-90 origin-bottom font-bold text-center leading-tight md:leading-16">
            {project.titlePrefix}
            <span className={variant.text}>{project.highlightedWord}</span>
            {project.titleSuffix}
          </h2>
          <p className="text-center max-w-xl text-base md:text-lg">{project.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
            {project.repoUrl && (
              <Button type="light" href={project.repoUrl}>
                REPOSITORI
              </Button>
            )}
            {project.liveDemoUrl && (
              <Button href={project.liveDemoUrl}>LIVE DEMO</Button>
            )}
          </div>

          {/* Meta Data Box */}
          <div className="grid grid-cols-2 sm:flex border border-border-muted divide-x divide-y sm:divide-y-0 divide-border-muted w-full sm:w-auto">
            {project.metaData.map((item) => {
              const Icon = item.key;

              return (
                <div
                  key={item.id}
                  className="flex p-2 min-h-10 items-center justify-center text-text-muted/70 gap-2"
                >
                  <span className="shrink-0">
                    <Icon className="size-4" />
                  </span>
                  <span className="uppercase text-[11px] tracking-wider font-medium font-mono text-text-muted">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </MainFrame>

      {/* Screenshot Main */}
      <MainFrame
        title={
          <p className="flex w-full justify-between font-mono tracking-wide text-xs text-text-muted font-light">
            <span>ANTARMUKA PROFESIONAL</span>
            <span>SCREENSHOT</span>
          </p>
        }
      >
        <img
          src={project.heroImage}
          alt={project.categoryTitle}
          className="w-full h-auto"
        />
      </MainFrame>

      {/* Konteks Projek */}
      <MainFrame
        title={
          <p className="flex w-full justify-between font-mono tracking-wide text-xs text-text-muted font-light">
            <span>01 / KONTEKS PROJEK</span>
          </p>
        }
      >
        <h3 className="px-4 py-8 md:px-8 md:py-12 text-3xl md:text-5xl text-text-primary font-bold scale-y-90">
          Tentang <span className={variant.text}>Projek</span>.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y divide-x-0 md:divide-x divide-border-muted -mr-px -mb-px">
          {project.contexts.map((ctx) => (
            <div key={ctx.id} className="flex flex-col px-4 py-6 md:px-8 md:py-6 gap-2">
              <span className="font-mono text-right text-text-muted">
                {ctx.id}
              </span>
              <h4 className="text-xl md:text-2xl font-heading font-bold scale-y-90">
                {ctx.title}
              </h4>
              <p className="text-sm md:text-base">{ctx.description}</p>
            </div>
          ))}
        </div>
      </MainFrame>

      {/* Galeri Projek */}
      <MainFrame
        title={
          <p className="flex w-full justify-between font-mono tracking-wide text-xs text-text-muted font-light">
            <span>02 / GALERI PROJEK</span>
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 -mr-px -mb-px">
          {project.galery.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border-b md:border-r border-border-muted"
            >
              <span className="flex w-full justify-between px-4 md:px-8 py-2 text-text-muted font-mono text-xs md:text-sm border-b border-border-muted">
                <span className="uppercase text-text-muted/70 tracking-wider">
                  {item.caption}
                </span>
                <span>0{item.id}</span>
              </span>
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
          ))}

          {/* Slot border penyeimbang ganjil (hanya aktif di desktop) */}
          {project.galery.length % 2 !== 0 && (
            <div className="hidden md:block border-r border-b border-border-muted" />
          )}
        </div>
      </MainFrame>
    </div>
  );
}

export default ProjectDetailSlug;
