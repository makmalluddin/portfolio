import React, { useState, useRef } from 'react';
import ExperienceCard from '../component/card/ExperienceCard';
import { motion, AnimatePresence } from 'motion/react';
import {ais_rec, analytics, presentation, instalation_ais, instalation_antena, website} from '../component/Experience2';
import {presentation3, cms3, coding3, dashboard3, workspace} from '../component/Experience3';
import {class_activity, kickoff, learning_springboot, model_training, output_project, project_presentation} from '../component/Experience1';

const Experience = () => {
    const [activeCardId, setActiveCardId] = useState(null);
    
    // Referensi untuk Siasat Kamera (Scroll Lock)
    const sectionRef = useRef(null);

    const experiences = [
        {
            id: 1,
            role: "IT Assistant",
            company: "PT. Dwitunggal Jaya Pratama Maju",
            date: "Dec 2025 - Present",
            type: "INTERN",
            color: "amber", 
            stack: ["React", "Laravel", "PostgreSQL", "Tailwind"],
            descriptions: [
                "Merevitalisasi dan membangun ulang website utama perusahaan menggunakan modern React frontend.",
                "Mengembangkan platform e-commerce secara penuh (full-stack) beserta integrasi payment gateway.",
                "Meningkatkan traffic website perusahaan hingga 30% melalui optimasi performa dan SEO."
            ],
            documentations: [
                { image: cms3, title: "CMS Dashboard" },
                { image: coding3, title: "Web Development" },
                { image: presentation3, title: "Project Presentation" },
                { image: dashboard3, title: "Revamped Dashboard" },
                { image: workspace, title: "Team Workspace" }
            ]
        },
        {
            id: 2,
            role: "Java & Python For Data Science",
            company: "PT. Tata Informasi Asia",
            date: "Sep 2024 - Dec 2024",
            type: "BOOTCAMP",
            color: "cyan", 
            stack: ["Python", "Java", "Spring Boot", "Machine Learning"],
            descriptions: [
                "Membangun model Machine Learning (Random Forest) dengan tingkat akurasi dan presisi mencapai 97%.",
                "Mengembangkan lebih dari 10 model prediktif pendukung dalam berbagai sub-project data science.",
                "Merancang dan membangun Spring Boot REST API untuk melayani sistem prediksi secara real-time."
            ],
            documentations: [
                { image: kickoff, title: "Kickoff Bootcamp" },
                { image: learning_springboot, title: "Learning Spring Boot" },
                { image: model_training, title: "Model Training" },
                { image: output_project, title: "Project Output" },
                { image: project_presentation, title: "Project Presentation" }
            ]
        },
        {
            id: 3,
            role: "Technical Support Intern",
            company: "PT. IndoMega Teknologi",
            date: "Feb 2024 - June 2024",
            type: "INTERN",
            color: "amber", 
            stack: ["JavaScript", "Python", "Arduino", "Linux"],
            descriptions: [
                "Membangun platform pemantauan (monitoring) terintegrasi untuk lebih dari 120 kapal (vessel) dan 5 pesawat.",
                "Mengelola dan menganalisis data anomali pergerakan kapal selama 6 bulan masa operasional.",
                "Membantu proses prototyping perangkat keras untuk sistem fuel filler."
            ],
            documentations: [
                { image: website, title: "Vessel Monitoring" },
                { image: ais_rec, title: "AIS Receiver" },
                { image: instalation_antena, title: "Antenna Installation" },
                { image: instalation_ais, title: "AIS Installation" },
                { image: analytics, title: "Data Analytics" },
                { image: presentation, title: "Project Presentation" }
            ]
        }
    ];

    const handleCardClick = (id) => {
        const isActivating = activeCardId !== id;
        setActiveCardId(isActivating ? id : null);

        // Siasat 3: Anti-Jump Scroll Lock
        // Memaksa browser scroll secara halus ke tengah section ketika kartu aktif
        if (isActivating && sectionRef.current) {
            setTimeout(() => {
                sectionRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300); // Jeda kecil agar DOM sempat memproses kartu yang hilang
        }
    };

    return (
        // Ditambahkan min-h-screen dan flex-col justify-center agar formasi pas di tengah layar 1080p
        <section 
            id="experience" 
            ref={sectionRef} 
            className="w-full min-h-screen py-10 px-4 md:px-8 text-white flex flex-col justify-center scroll-mt-10"
        >
            <div className="max-w-6xl mx-auto w-full">
                
                {/* Margin bottom dikurangi dari mb-16 ke mb-8 agar ruang vertikal lebih lega */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-8"
                >
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight font-mono">
                        Experience <span className="text-amber-500">Timeline</span>
                    </h2>
                </motion.div>

                <div className="relative w-full flex flex-col items-center">
                    <AnimatePresence mode="popLayout">
                        {experiences.map((exp, index) => {
                            const isActive = activeCardId === exp.id;
                            
                            // Menyembunyikan kartu lain saat mode fokus
                            if (activeCardId !== null && !isActive) {
                                return null;
                            }

                            const position = index % 2 === 0 ? 'left' : 'right';
                            
                            return (
                                <motion.div
                                    layout 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                                    key={exp.id}
                                    className="w-full"
                                >
                                    <ExperienceCard
                                        position={position}
                                        isActive={isActive}
                                        onClick={() => handleCardClick(exp.id)}
                                        {...exp}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default Experience;