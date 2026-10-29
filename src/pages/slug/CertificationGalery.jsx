import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

function CertificationGallery({ certifications }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!certifications || certifications.length === 0) {
    return (
      <div className="p-8 font-mono text-xs text-text-muted text-center border border-border-muted">
        TIDAK ADA SERTIFIKAT UNTUK DITAMPILKAN
      </div>
    );
  }

  const currentCert = certifications[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certifications.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === certifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col w-full bg-bg-surface/20">
      <div className="relative flex items-center justify-center p-4 md:p-8 min-h-65 md:min-h-120 border-b border-border-muted select-none">
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-4 z-10 p-3 border border-border-muted bg-bg-surface hover:bg-white text-text-primary transition-colors duration-200"
          aria-label="Sertifikat Sebelumnya"
        >
          <ChevronLeft className="size-6" />
        </button>

        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={currentCert.image}
            alt={currentCert.title}
            className="h-60 md:h-105 w-auto object-contain transition-all duration-300"
          />
        </div>

        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-4 z-10 p-3 border border-border-muted bg-bg-surface hover:bg-white text-text-primary transition-colors duration-200"
          aria-label="Sertifikat Selanjutnya"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      <div className="flex md:hidden items-center justify-between px-4 py-2 border-b border-border-muted bg-bg-surface/40">
        <button
          onClick={handlePrev}
          className="p-1.5 border border-border-muted bg-bg-surface hover:bg-white text-text-primary transition-colors duration-200"
          aria-label="Sertifikat Sebelumnya"
        >
          <ChevronLeft className="size-4" />
        </button>

        <span className="font-mono text-xs text-text-muted">
          [{String(currentIndex + 1).padStart(2, "0")}/
          {String(certifications.length).padStart(2, "0")}]
        </span>

        <button
          onClick={handleNext}
          className="p-1.5 border border-border-muted bg-bg-surface hover:bg-white text-text-primary transition-colors duration-200"
          aria-label="Sertifikat Selanjutnya"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 px-4 md:px-6 py-4 bg-bg-surface/50 font-mono">
        <div className="flex flex-col sm:grid sm:grid-cols-3 items-start sm:items-center justify-between gap-3">
          <span className="hidden md:inline text-text-muted text-xs shrink-0">
            [{String(currentIndex + 1).padStart(2, "0")}/
            {String(certifications.length).padStart(2, "0")}]
          </span>

          <div className="flex flex-wrap md:flex-col items-center gap-2">
            <h4 className="font-bold text-text-secondary text-sm md:text-xl">
              {currentCert.title}
            </h4>
            {currentCert.type && (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-bg-surface border border-border-muted text-text-muted tracking-wider">
                {currentCert.type}
              </span>
            )}
          </div>

          {currentCert.credentialUrl && (
            <a
              href={currentCert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary border \
              border-border-muted hover:border-text-primary transition-colors tracking-wider shrink-0 \
              w-fit sm:justify-self-end"
            >
              <span>KREDENSIAL</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-text-muted border-t border-border-muted/50 pt-3">
          {currentCert.issueYear && (
            <span>
              TERBIT :{" "}
              <span className="text-text-secondary">{currentCert.issueYear}</span>
            </span>
          )}

          {currentCert.issueYear && currentCert.expiryYear && (
            <span className="font-bold text-border-muted">/</span>
          )}

          {currentCert.expiryYear && (
            <span>
              BERAKHIR :{" "}
              <span className="text-text-secondary">{currentCert.expiryYear}</span>
            </span>
          )}

          {currentCert.duration && (
            <>
              <span className="font-bold text-border-muted">/</span>
              <span>
                DURASI :{" "}
                <span className="text-text-secondary">{currentCert.duration}</span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificationGallery;
