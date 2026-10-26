import MainFrame from "@/src/components/MainFrame";
import CertificationCard from "@/src/components/certification/CertificationCard";
import { certificationData } from "@/src/data/certificationData"

function Certification() {
  return (
    <MainFrame
      title={
        <p className="font-mono tracking-wide text-sm">
          04 / <span className="text-text-secondary font-medium">PELATIHAN & SERTIFIKASI</span>
        </p>
      }
    >
      {certificationData.map((cert, index) => (
        <CertificationCard
          key={cert.id}
          cert={cert}
          index={index}
        />
      ))}
    </MainFrame>
  );
}

export default Certification;
