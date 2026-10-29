import MainFrame from "@/src/components/MainFrame";
import CertificationGallery from "../../slug/CertificationGalery";
import { galleryCertifications } from "@/src/data/skill/skillPageData";

function CertificationPage() {
  return (
    <MainFrame
      title={
        <p className="font-mono tracking-wide text-sm">
          01 / <span className="text-text-secondary font-medium">DAFTAR SERTIKAT & PELATIHAN</span>
        </p>
      }
    >
      <div className="flex flex-col gap-2 px-8 py-8 md:py-16">
        <h2 className="font-heading font-bold text-5xl scale-y-90">
          Daftar Sertifikat & <span className="text-green-blue-1">Pelatihan</span>.
        </h2>
        <p>Sertifikasi & Pelatihan yang saya ikuti selama berkarir</p>
      </div>
      <CertificationGallery certifications={galleryCertifications} />
    </MainFrame>
  );
}

export default CertificationPage;
