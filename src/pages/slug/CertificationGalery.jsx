import { ArrowUpRight } from "lucide-react";
import LazyImage from "@/src/components/LazyImage";

const padNumber = (value) => String(value).padStart(2, "0");

function CertificationGallery({ certifications }) {
  if (!certifications || certifications.length === 0) {
    return (
      <div className="border-b border-border-muted px-8 py-16 text-center font-mono text-xs uppercase tracking-wider text-text-muted">
        Belum ada sertifikat untuk ditampilkan.
      </div>
    );
  }

  return (
    <div>
      <div className="-mr-px -mb-px grid grid-cols-1 md:grid-cols-2">
        {certifications.map((cert, index) => {
          const timeItems = [
            cert.issueYear && { label: "Terbit", value: cert.issueYear },
            cert.expiryYear && {
              label: cert.expiryYear === "Selamanya" ? "Berlaku" : "Berakhir",
              value: cert.expiryYear,
            },
            cert.duration && cert.duration !== "-" && {
              label: "Durasi",
              value: cert.duration,
            },
          ].filter(Boolean);

          return (
            <article
              key={cert.id ?? index}
              className="group flex h-full flex-col border-r border-b border-border-muted"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border-muted px-4 py-3 md:px-6">
                <span className="font-mono text-xs text-green-blue-1 md:text-base">
                  {padNumber(index + 1)}
                </span>

                {cert.type && (
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    {cert.type}
                  </span>
                )}
              </div>

              <div className="relative aspect-4/3 overflow-hidden border-b border-border-muted bg-bg-muted/40">
                <LazyImage
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain p-4 md:p-6"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 px-4 py-4 md:px-6 md:py-5">
                <h3 className="origin-top scale-y-90 font-heading text-lg font-bold leading-snug text-text-primary md:text-2xl">
                  {cert.title}
                </h3>

                {timeItems.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-text-muted md:text-[11px]">
                    {timeItems.map((item, itemIndex) => (
                      <span
                        key={item.label}
                        className="flex items-center gap-x-2"
                      >
                        {itemIndex > 0 && (
                          <span aria-hidden="true" className="text-border-muted">
                            /
                          </span>
                        )}
                        <span className="whitespace-nowrap">
                          {item.label}{" "}
                          <span className="text-text-secondary">
                            {item.value}
                          </span>
                        </span>
                      </span>
                    ))}
                  </div>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary md:text-[11px]"
                  >
                    <span>Lihat Kredensial</span>
                    <ArrowUpRight className="size-3.5 text-green-blue-1 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </article>
          );
        })}

        {certifications.length % 2 !== 0 && (
          <div className="hidden border-r border-b border-border-muted md:block" />
        )}
      </div>
    </div>
  );
}

export default CertificationGallery;
