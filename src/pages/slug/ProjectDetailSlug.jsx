import MainFrame from "@/src/components/MainFrame";
import Button from "@/src/utils/Button";
import { colorVariants } from "@/src/data/colorVariants";

function ProjectDetailSlug({ project }) {
  if (!project) return null;

  const variant = colorVariants[project.colorVariantKey] || colorVariants["blue-1"];

  return (
    <div>
      <MainFrame
        title={
          <p className="font-mono tracking-wide text-sm">
            <span className="text-text-secondary font-medium">
              {project.categoryTitle}
            </span>
          </p>
        }
      >
        <div className="flex flex-col mx-auto max-w-4xl items-center justify-center py-20 gap-6">
          <h2 className="text-6xl text-text-primary scale-y-90 origin-bottom font-bold text-center leading-16">
            {project.titlePrefix}
            <span className={variant.text}>{project.highlightedWord}</span>
            {project.titleSuffix}
          </h2>
          <p className="text-center max-w-xl text-lg">{project.description}</p>
          <div className="flex gap-4 mt-2">
            {project.repoUrl && (
              <Button type="light" href={project.repoUrl}>
                REPOSITORI
              </Button>
            )}
            {project.liveDemoUrl && (
              <Button href={project.liveDemoUrl}>LIVE DEMO</Button>
            )}
          </div>
          <div className="flex border divide-x border-border-muted divide-border-muted">
            {project.metaData.map((item) => (
              <div
                key={item.id}
                className="flex p-2 h-10 items-center justify-center text-text-muted/70 gap-2"
              >
                <span>{item.key}</span>
                <span className="uppercase text-xs tracking-wider font-medium font-mono text-text-muted">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </MainFrame>

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

      <MainFrame
        title={
          <p className="flex w-full justify-between font-mono tracking-wide text-xs text-text-muted font-light">
            <span>01 / KONTEKS PROJEK</span>
          </p>
        }
      >
        <h3 className="px-8 py-12 text-5xl text-text-primary font-bold scale-y-90">
          Tentang <span className={variant.text}>Projek</span>.
        </h3>

        <div className="grid grid-cols-2 divide-x divide-y divide-border-muted -mr-px -mb-px">
          {project.contexts.map((ctx) => (
            <div key={ctx.id} className="flex flex-col px-8 py-6 gap-2">
              <span className="font-mono text-right text-text-muted">
                {ctx.id}
              </span>
              <h4 className="text-2xl font-heading font-bold scale-y-90">
                {ctx.title}
              </h4>
              <p>{ctx.description}</p>
            </div>
          ))}
        </div>
      </MainFrame>

      <MainFrame
        title={
          <p className="flex w-full justify-between font-mono tracking-wide text-xs text-text-muted font-light">
            <span>02 / GALERI PROJEK</span>
          </p>
        }
      >
        <div className="grid grid-cols-2 -mr-px -mb-px">
          {project.galery.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border-r border-b border-border-muted"
            >
              <span className="flex w-full justify-between px-8 py-2 text-text-muted font-mono text-sm border-b border-border-muted">
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
        </div>
      </MainFrame>
    </div>
  );
}

export default ProjectDetailSlug;
