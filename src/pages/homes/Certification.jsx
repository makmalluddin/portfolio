import MainFrame from "@/src/components/MainFrame";
import CertificationCard from "@/src/components/certification/CertificationCard";
import { certificationData } from "@/src/data/certificationData"
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Certification() {
  return (
    <MainFrame
      title={
        <p className="font-mono tracking-wide text-sm">
          04 / <span className="text-text-secondary font-medium">PELATIHAN & SERTIFIKASI</span>
        </p>
      }
    >
      <div>
        {certificationData.map((cert, index) => (
          <CertificationCard
            key={cert.id}
            cert={cert}
            index={index}
          />
        ))}
      </div>

      <Link
        to={'certifications/'}
        className="flex flex-col gap-2 px-8 py-6 items-center justify-center"
      >
        <div className="border-2 border-border-muted p-1">
          <ArrowRight className="-rotate-45" />
        </div>
        <span className="uppercase font-mono text-sm text-text-muted">
          LAINNYA
        </span>
      </Link>
    </MainFrame>
  );
}

export default Certification;
