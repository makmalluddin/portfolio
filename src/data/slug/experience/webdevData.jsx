import sg8_logo from "@/src/assets/sg8_logo.webp";
import { Calendar, Clock, BriefcaseBusiness, MapPin } from "lucide-react";

export const webdevData = {
  id: "1",
  slug: "web-developer-sg8",
  relatedProjectKey: "sg8-group",
  role: "Web Developer",
  companyName: "PT DWITUNGGAL JAYA PRATAMA MAJU (SG8 GROUP)",
  logo: sg8_logo,
  caption:
    "Ini adalah contoh caption yang akan menjelaskan tanggung jawab dan peran secara general saya selama menjadi web developer di sg8 group",
  metaData: [
    { id: 1, icon: <Calendar size={16} />, value: "2026" },
    { id: 2, icon: <Clock size={16} />, value: "6 Bulan" },
    { id: 3, icon: <BriefcaseBusiness size={16} />, value: "Internship" },
    { id: 4, icon: <MapPin size={16} />, value: "Jakarta" },
  ],
  detailPengalaman: [
    {
      id: 1,
      icon: <Calendar size={14} />,
      title: "Tanggung Jawab",
      description: "Ini contoh deskripsi dan tanggung jawab",
    },
    {
      id: 2,
      icon: <Clock size={14} />,
      title: "Kontribusi",
      description: "Ini contoh deskripsi dan tanggung jawab",
    },
    {
      id: 3,
      icon: <BriefcaseBusiness size={14} />,
      title: "Tantangan & Solusi",
      description: "Ini contoh deskripsi dan tanggung jawab",
    },
    {
      id: 4,
      icon: <MapPin size={14} />,
      title: "Hasil & Dampak",
      description: "Ini contoh deskripsi dan tanggung jawab",
    },
  ],
  teknologi: [
    {
      id: 1,
      type: "Alat Pengembangan",
      tools: "Visual Studio Code, Git, GitHub, Postman, Figma, Canva, Notion",
    },
    {
      id: 2,
      type: "Frontend",
      tools: "Javascript, Next.js, React.js, Tailwind CSS",
    },
    {
      id: 3,
      type: "Backend",
      tools: "PHP, Laravel, REST API",
    },
  ],
};
