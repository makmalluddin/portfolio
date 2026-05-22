import React, { useRef, useState } from 'react';
import ProjectCard from '../component/card/ProjectCard';
import MainLayout from '../layout/MainLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';

import delivery from '/src/assets/myself/projects/delivery.webp';
import monitoring from '/src/assets/myself/projects/monitoring.webp';
import volatile from '/src/assets/myself/projects/volatile.webp';
import revamp from '/src/assets/myself/projects/revamp.webp';

const MagneticButton = ({ children, onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onClick={onClick}
            className="relative cursor-pointer z-10 w-fit"
        >
            {children}
        </motion.div>
    );
};

function Projects() {
    const [activeProjectId, setActiveProjectId] = useState(null);

    const featuredProjects = [
        {
            id: 1,
            image: delivery,
            title: 'Delivery Time Accuracy Prediction',
            description: 'Built a delivery time prediction model using Random Forest algorithm based on shipping factors, achieving 97% accuracy.',
            keyFeatures: [
                "Real-time prediction integration via Spring Boot REST API",
                "Optimized Random Forest hyper-parameters for peak accuracy",
                "End-to-end data pipeline from preprocessing to deployment"
            ],
            tools: [
                { icon: 'devicon:python', name: 'Python' },
                { icon: 'bxl:spring-boot', name: 'Spring Boot' },
            ],
            type: 'DS',
            color: 'amber',
            demoLink: "#",
            onclick: 'https://github.com/makmalluddin/shipping-prediction'
        },
        {
            id: 2,
            image: volatile,
            title: 'Classification Volatile Compound',
            description: 'Developed a classification system to distinguish two volatile compounds using sensor measurement data, achieving 95% accuracy.',
            keyFeatures: [
                "Custom-built sensor array with Arduino for data acquisition",
                "Signal filtering and feature extraction pipeline",
                "High-precision classification models evaluated via cross-validation"
            ],
            tools: [
                { icon: 'devicon:python', name: 'Python' },
                { icon: 'skill-icons:arduino', name: 'Arduino' },
                { icon: 'arcticons:sensor-lab', name: 'Sensor' },
            ],
            type: 'ML',
            color: 'amber',
            demoLink: "#",
            onclick: 'https://github.com/makmalluddin/chromatography-gas'
        },
        {
            id: 3,
            image: revamp,
            title: 'Company Website Revamp',
            description: 'Revamped company website design and developed an e-commerce platform, resulting in a 30% increase in website traffic.',
            keyFeatures: [
                "Modern, responsive UI/UX built with React & Tailwind CSS",
                "Seamless payment gateway integration for transactions",
                "SEO optimization leading to 30% organic traffic growth"
            ],
            tools: [
                { icon: 'devicon:react', name: 'React' },
                { icon: 'devicon:laravel', name: 'Laravel' },
                { icon: 'devicon:tailwindcss', name: 'Tailwind' },
            ],
            type: 'Web',
            color: 'cyan',
            demoLink: "#",
            onclick: 'https://github.com/sg8group/fe-sg8group'
        },
        {
            id: 4,
            image: monitoring,
            title: 'Air & Maritime Traffic Monitoring',
            description: 'Built a monitoring and visualization system to track over 120 vessels around Tanjung Priok Port and 5 aircraft trajectories using an interactive web platform.',
            keyFeatures: [
                "Real-time plotting of 120+ vessels on interactive maps",
                "Data ingestion pipeline using MongoDB and Raspberry Pi",
                "Custom alerting system for maritime anomaly detection"
            ],
            tools: [
                { icon: 'devicon:javascript', name: 'JavaScript' },
                { icon: 'devicon:mongodb', name: 'MongoDB' },
                { icon: 'logos:raspberry-pi', name: 'Raspberry Pi' },
            ],
            type: 'Web',
            color: 'cyan',
            demoLink: "#",
            onclick: 'https://github.com/makmalluddin/ship-ais'
        }
    ];

    const handleViewAll = () => {
        console.log("Navigating to /all-projects");
    };

    return (
        <section id="projects" className="min-h-screen py-20 flex flex-col items-center justify-center bg-transparent">
            <MainLayout>

                {/* Main Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-5"
                >
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight ">
                        Featured <span className="text-amber-500">Projects</span>
                    </h2>
                </motion.div>

                {/* Siasat Zero Layout Shift: Mengunci min-height kontainer agar tidak menciut */}
                <div className="relative min-h-[800px] lg:min-h-[470px] w-full max-w-5xl mx-auto mt-8 flex items-start">
                    <motion.div
                        layout
                        className={`w-full grid gap-2 ${activeProjectId !== null ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}
                    >
                        {/* Mode popLayout memastikan kartu yang hilang tidak merusak alur kartu yang aktif */}
                        <AnimatePresence mode="popLayout">
                            {featuredProjects.map((item) => {
                                const isActive = activeProjectId === item.id;

                                // Jika ada yang aktif dan ini bukan kartu tersebut, sembunyikan (Focus Mode)
                                if (activeProjectId !== null && !isActive) return null;

                                return (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        className="w-full"
                                    >
                                        <ProjectCard
                                            {...item}
                                            isActive={isActive}
                                            onExpand={() => setActiveProjectId(item.id)}
                                            onCollapse={() => setActiveProjectId(null)}
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center mt-3 w-full"
                >
                    <MagneticButton onClick={handleViewAll}>
                        <div className="group flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-gray-700 bg-[#0b0c10] hover:bg-[#11131a] hover:border-amber-500/50 transition-colors duration-300 shadow-xl overflow-hidden">
                            <span className="text-gray-300 font-mono text-xs tracking-[0.2em] uppercase group-hover:text-amber-400 transition-colors">
                                Archive
                            </span>
                            <Icon
                                icon="solar:arrow-right-linear"
                                className="text-gray-500 text-lg group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300"
                            />
                        </div>
                    </MagneticButton>
                </motion.div>

            </MainLayout>
        </section>
    );
}

export default Projects;