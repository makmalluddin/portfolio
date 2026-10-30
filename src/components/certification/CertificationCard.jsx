import { Link } from "react-router-dom";

function CertificationCard({ cert, index }) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/certifications`}
      className="flex px-4 md:px-8 py-6 border-border-muted transition-colors duration-300 hover:bg-bg-surface/50 group border-b -mb-px"
    >
      <span className="w-10 hidden md:block md:w-24 shrink-0 text-text-muted font-mono text-sm md:text-base">
        {formattedIndex}
      </span>

      <div className="flex flex-col md:flex-row w-full justify-between items-start gap-4 md:gap-0">
        <div className="flex flex-col">
          <h3 className="text-text-primary/80 font-bold text-lg md:text-3xl scale-y-90 origin-top leading-snug">
            {cert.title}
          </h3>
          <p className="text-text-secondary text-base md:text-lg font-medium mt-1">
            {cert.issuer}
          </p>
          <p className="text-text-muted font-medium mt-1 text-sm md:text-base">
            {cert.duration}
          </p>
        </div>

        <div className="flex flex-col h-full justify-between text-left md:text-right shrink-0">
          <p className="font-mono text-xs md:text-md tracking-wider text-text-muted uppercase">
            {cert.type}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CertificationCard;
