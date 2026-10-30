import { User, Check, CalendarDays, Users } from "lucide-react";
import corporateRevamp from "@/src/assets/Project/corporateRevamp.webp";
import bnsp from "@/src/assets/Project/bnsp.webp";

export const corporateData = {
  slug: "corporate-website-revamp",
  categoryTitle: "CORPORATE WEBSITE REVAMP",
  titlePrefix: "Corporate Website Revamp With ",
  highlightedWord: "Custom ",
  titleSuffix: "CMS.",
  colorVariantKey: "blue-1",
  description:
    "Ini adalah aplikasi yang saya buat sebagai pembaruan landing page perusahaan lengkap dengan custom CMS untuk manage berbagai konten yang ditampilkan di landing page.",
  repoUrl: "https://github.com/makmalluddin?tab=repositories",
  liveDemoUrl: "#",
  heroImage: corporateRevamp,
  metaData: [
    { id: 1, key: <User size={16} />, value: "Fullstack Developer" },
    { id: 2, key: <Check size={16} />, value: "Selesai" },
    { id: 3, key: <CalendarDays size={16} />, value: "6 Bulan" },
    { id: 4, key: <Users size={16} />, value: "4 Orang" },
  ],
  contexts: [
    {
      id: "01",
      title: "Latar Belakang & Tujuan",
      description:
        "Pada projek ini tanggung jawab saya meliputi pembuatan antarmuka dan backend untuk section recruitment beserta integrasinya, memimpin tim untuk melakukan migrasi domain perusahaan ke provider baru, dan memimpin tim untuk melakukan produksi aplikasi ke server shared hosting menggunakan cpanel.",
    },
    {
      id: "02",
      title: "Kontribusi yang Saya Lakukan",
      description:
        "Pada projek ini tanggung jawab saya meliputi pembuatan antarmuka dan backend untuk section recruitment beserta integrasinya, memimpin tim untuk melakukan migrasi domain perusahaan ke provider baru, dan memimpin tim untuk melakukan produksi aplikasi ke server shared hosting menggunakan cpanel.",
    },
    {
      id: "03",
      title: "Tantangan & Solusi",
      description:
        "Pada projek ini tanggung jawab saya meliputi pembuatan antarmuka dan backend untuk section recruitment beserta integrasinya, memimpin tim untuk melakukan migrasi domain perusahaan ke provider baru, dan memimpin tim untuk melakukan produksi aplikasi ke server shared hosting menggunakan cpanel.",
    },
    {
      id: "04",
      title: "Hasil Akhir",
      description:
        "Pada projek ini tanggung jawab saya meliputi pembuatan antarmuka dan backend untuk section recruitment beserta integrasinya, memimpin tim untuk melakukan migrasi domain perusahaan ke provider baru, dan memimpin tim untuk melakukan produksi aplikasi ke server shared hosting menggunakan cpanel.",
    },
  ],
  galery: [
    { id: 1, image: corporateRevamp, caption: "Halaman awal landing page" },
    { id: 2, image: corporateRevamp, caption: "Halaman awal landing page" },
    { id: 3, image: corporateRevamp, caption: "Halaman awal landing page" },
    { id: 4, image: bnsp, caption: "Halaman awal landing page" },
    { id: 5, image: corporateRevamp, caption: "Halaman awal landing page" },
  ],
};
