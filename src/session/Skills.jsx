import React from 'react';
import SkillCard from '../component/card/SkillCard'; // Sesuaikan path dengan lokasi SkillCard yang baru
import MainLayout from '../layout/MainLayout';
import { motion } from "motion/react";

const Skills = () => {
  // 1. Data Diratakan (Flattened Data)
  // Sub-kategori sekarang menjadi 'tag' di sudut kanan kotak
  const skillsData = {
    dataScience: [
      { name: "Scikit-learn", icon: "devicon:scikitlearn", tag: "ML" },
      { name: "TensorFlow", icon: "logos:tensorflow", tag: "ML" },
      { name: "Python", icon: "material-icon-theme:python", tag: "DP" },
      { name: "Pandas", icon: "devicon:pandas", tag: "DP" },
      { name: "Numpy", icon: "devicon:numpy", tag: "DP" },
      { name: "Tableau", icon: "logos:tableau-icon", tag: "DV" },
      { name: "Matplotlib", icon: "devicon:matplotlib", tag: "DV" },
    ],
    webDev: [
      { name: "React", icon: "devicon:react", tag: "FE" },
      { name: "Vite", icon: "material-icon-theme:vite", tag: "FE" },
      { name: "Tailwind", icon: "devicon:tailwindcss", tag: "FE" },
      { name: "Laravel", icon: "devicon:laravel", tag: "BE" },
      { name: "Spring Boot", icon: "bxl:spring-boot", tag: "BE", iconClass: 'text-[#6CB52D]' },
      { name: "PostgreSQL", icon: "logos:postgresql", tag: "DB" },
      { name: "MySQL", icon: "lineicons:mysql", tag: "DB" },
      { name: "Git", icon: "logos:git-icon", tag: "TL" },
    ],
    toolsOther: [
      { name: "Figma", icon: "devicon:figma", tag: "DS" },
      { name: "Autocad", icon: "simple-icons:autocad", tag: "DS" },
      { name: "Draw.io", icon: "material-icon-theme:drawio", tag: "DS" },
      { name: "Linux", icon: "devicon:linux", tag: "DV" }, // Mengganti Fedora ke Linux umum (sesuai profil)
      { name: "Arduino", icon: "skill-icons:arduino", tag: "IOT" },
      { name: "ESP", icon: "simple-icons:espressif", tag: "IOT", iconClass: 'text-[#E8362D]' },
      { name: "Tinkercad", icon: "simple-icons:tinkercad", tag: "IOT" },
      { name: "Kicad", icon: "file-icons:kicad", tag: "IOT", iconClass: 'text-[#2D4BB1]' }
    ]
  };

  // 2. Varian Animasi Framer Motion
  const titleVariant = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 } // Efek pop-up beruntun
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // 3. Komponen Bantuan untuk Sub-Title Kategori
  const CategoryHeader = ({ title, textColor }) => (
    <div className="flex items-center gap-4 mb-6 mt-8 w-full">
      <h3 className={`font-mono text-sm tracking-[0.2em] uppercase ${textColor}`}>
        {title}
      </h3>
      <div className="h-[1px] flex-1 bg-gray-800/60"></div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-transparent min-h-screen">
      <MainLayout>

        {/* Main Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-5"
        >
          <h2 className="text-2xl md:text-4xl font-black tracking-tight font-mono">
            <span className="text-cyan-500">Core</span> Skills
          </h2>
        </motion.div>

        <div className="flex flex-col w-full max-w-5xl mx-auto">

          {/* ================= BARIS 1: DATA SCIENCE ================= */}
          <CategoryHeader title="Data Science" textColor="text-amber-500" />
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            // Siasat Inti: flex-wrap dan justify-center untuk meratakan kotak ke tengah
            className="flex flex-wrap justify-center gap-4 w-full"
          >
            {skillsData.dataScience.map((skill, index) => (
              <motion.div key={index} variants={itemVariant}>
                <SkillCard {...skill} color="amber" />
              </motion.div>
            ))}
          </motion.div>

          {/* ================= BARIS 2: WEB DEVELOPMENT ================= */}
          <CategoryHeader title="Web Development" textColor="text-cyan-500" />
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-4 w-full"
          >
            {skillsData.webDev.map((skill, index) => (
              <motion.div key={index} variants={itemVariant}>
                <SkillCard {...skill} color="cyan" />
              </motion.div>
            ))}
          </motion.div>

          {/* ================= BARIS 3: TOOLS & OTHER ================= */}
          <CategoryHeader title="Tools & Other" textColor="text-violet-500" />
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-4 w-full"
          >
            {skillsData.toolsOther.map((skill, index) => (
              <motion.div key={index} variants={itemVariant}>
                <SkillCard {...skill} color="violet" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </MainLayout>
    </section>
  );
};

export default Skills;