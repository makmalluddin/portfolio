import Button from "@/src/utils/Button";
import MainFrame from "@/src/components/MainFrame";

function HeroCard({ data }) {
  const {
    location,
    titleLine1,
    titleLine2,
    description,
    statsTagline,
    stats,
    avatar,
    cvUrl,
    worksHref,
  } = data;

  return (
    <div className="flex flex-col">
      {/* Main Hero Frame */}
      <MainFrame
        title={
          <p className="font-mono text-xs md:text-sm font-medium">
            {location}
          </p>
        }
        className="py-2 px-4 md:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 py-6 md:py-10 gap-8 md:gap-0">
          <div className="flex flex-col gap-4">
            <h1 className="flex flex-col font-bold text-3xl sm:text-4xl md:text-5xl tracking-normal">
              <span>{titleLine1}</span>
              <span className="text-blue-2">{titleLine2}</span>
            </h1>

            <p className="max-w-2xl text-base md:text-lg leading-relaxed font-inter">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 text-xs font-mono tracking-widest">
              <Button
                type={'dark'}
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                DOWNLOAD CV
              </Button>
              <Button type={'light'} href={worksHref}>
                MY WORKS
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={avatar}
              className="h-60 w-60 object-cover rounded-full shadow-2xl shadow-black">
            </img>
          </div>
        </div>
      </MainFrame>

      {/* Hero Stats Frame */}
      <MainFrame>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-muted">
          <div className="flex items-center justify-start py-4 md:py-2 px-6 md:px-8 gap-1 text-text-muted">
            <span className="text-xl md:text-2xl text-red-1">Apa </span>{" "}
            {statsTagline}
          </div>

          {stats.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start justify-center py-6 md:py-8 px-6 md:px-8"
            >
              <p className="font-heading font-bold text-xl md:text-2xl text-text-secondary">
                {item.value}{" "}
                <span className="text-lg md:text-xl">{item.unit}</span>
              </p>
              <p className="text-xs md:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </MainFrame>
    </div>
  );
}

export default HeroCard;
