import { Link } from "react-router-dom";

function CertificationCard({ cert, index }) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/certification/${cert.slug}`}
      className="flex px-8 py-6 border-b border-border-muted transition-colors duration-300 hover:bg-bg-surface/50 group"
    >
      <span className="w-24 shrink-0 text-text-muted font-mono">
        {formattedIndex}
      </span>

      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col">
          <h3 className="text-text-primary font-bold text-3xl scale-y-90 origin-top">
            {cert.title}
          </h3>
          <p className="text-text-secondary font-medium mt-1">
            {cert.issuer}
          </p>

          <div className="flex items-center gap-2 mt-2 text-md text-text-muted">
            {cert.metadata.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="uppercase">
                  <span className="font-mono text-sm">
                    {item.label} :
                  </span>
                  <span className="font-inter text-text-muted text-sm ml-1">
                    {item.value}
                  </span>
                </span>
                {idx < cert.metadata.length - 1 && (
                  <span className="text-lg font-bold">/</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-full justify-between text-right">
          <p className="font-mono text-xs tracking-wider text-text-muted uppercase">
            {cert.type}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CertificationCard;
