import React, { useState } from 'react';
import CertificationCard from '../component/card/CertificationCard';
import MainLayout from '../layout/MainLayout';
import { motion, AnimatePresence } from 'motion/react';

// Ganti path ini dengan lokasi gambar asli Anda
import bnspCert from '/src/assets/myself/certifications/bnsp.webp';
import javaCert from '/src/assets/myself/certifications/stupen.webp';

function Certification() {
    // Data sertifikasi (Data pertama otomatis menjadi default aktif)
    const certifications = [
        {
            id: 1,
            title: "Associate Data Scientist",
            provider: "BNSP",
            year: "2024",
            icon: "carbon:certificate",
            color: "amber",
            image: bnspCert // Gambar format lanskap/potret
        },
        {
            id: 2,
            title: "Java & Python For Data Science",
            provider: "Government Bootcamp",
            year: "2024",
            icon: "mdi:code-braces",
            color: "cyan",
            image: javaCert // Ganti dengan placeholder/gambar asli
        },
        // Anda bisa menambahkan sertifikat kompetensi lainnya di sini
    ];

    // State untuk mengontrol gambar mana yang muncul di proyektor kanan
    const [activeCertId, setActiveCertId] = useState(certifications[0].id);

    // Mencari data lengkap dari sertifikat yang sedang aktif
    const activeCert = certifications.find(cert => cert.id === activeCertId);

    // Variasi Animasi
    const titleVariant = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
    };

    return (
        <section id="certifications" className="py-20 flex flex-col items-center justify-center bg-transparent min-h-screen">
            <MainLayout>

                {/* Main Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-5"
                >
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight font-mono">
                        Certified <span className="text-cyan-500">Skills</span>
                    </h2>
                </motion.div>

                {/* Main Split-Screen Layout */}
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto items-start">

                    {/* ================= PANEL KIRI (Daftar Menu) ================= */}
                    <motion.div
                        variants={containerVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="w-full lg:w-5/12 flex flex-col gap-4 order-2 lg:order-1"
                    >
                        {certifications.map((cert) => (
                            <motion.div key={cert.id} variants={itemVariant}>
                                <CertificationCard
                                    {...cert}
                                    isActive={activeCertId === cert.id}
                                    onClick={() => setActiveCertId(cert.id)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ================= PANEL KANAN (Proyektor Gambar) ================= */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        // Siasat Proyektor: Mengunci posisi (sticky) agar tetap terlihat saat daftar di kiri di-scroll
                        className="w-full lg:w-7/12 order-1 lg:order-2 lg:sticky lg:top-24"
                    >
                        {/* Frame Proyektor dengan background gelap untuk kontras */}
                        <div className="relative w-full aspect-[4/3] lg:aspect-[16/12] rounded-2xl border border-gray-800/80 bg-[#07080a] overflow-hidden shadow-2xl flex items-center justify-center p-4 lg:p-8 backdrop-blur-sm">

                            {/* Watermark UI di background layar */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                <span className="font-mono text-4xl lg:text-6xl font-black tracking-widest text-white rotate-[-15deg]">
                                    VERIFIED
                                </span>
                            </div>

                            {/* AnimatePresence untuk transisi cross-fade gambar yang mulus */}
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeCert.id} // Kunci (key) perubahan state
                                    src={activeCert.image}
                                    alt={activeCert.title}
                                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
                                    transition={{ duration: 0.3 }}
                                    // Siasat object-contain: Menangani format Lanskap/Potret tanpa distorsi
                                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                                />
                            </AnimatePresence>

                        </div>
                    </motion.div>

                </div>
            </MainLayout>
        </section>
    );
}

export default Certification;