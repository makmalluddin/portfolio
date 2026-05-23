import React, { useRef, useState } from 'react';
import { motion } from "motion/react";
import MainLayout from '../layout/MainLayout';
import { Icon } from '@iconify/react';
import CircularText from '/components/CircularText';
import SosmedCard from '../component/card/SosmedCard';

// ==========================================
// Komponen Tambahan: Magnetic Physics Button
// ==========================================
const MagneticButton = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
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
            className="relative cursor-pointer z-10 w-fit"
        >
            {children}
        </motion.div>
    );
};

// ==========================================
// Komponen Utama: Contact Section
// ==========================================
function Contact() {
    const socialMedia = [
        { id: 1, name: 'Linkedin', textcol: 'text-blue-400', icon: 'linkedin', bordercol: 'border-blue-500', link: 'https://www.linkedin.com/in/makmalluddin/' },
        { id: 2, name: 'Github', textcol: 'text-gray-300', icon: 'github', bordercol: 'border-gray-500', link: 'https://github.com/makmalluddin/makmalluddin' },
        { id: 3, name: 'Whatsapp', textcol: 'text-green-400', icon: 'whatsapp', bordercol: 'border-green-500', link: 'http://wa.me/6285159594771' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id='contact' className='min-h-screen bg-transparent text-white flex items-center justify-center overflow-hidden py-20'>
            <MainLayout>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex flex-col gap-16 md:gap-20 max-w-6xl mx-auto"
                >
                    <div className='flex flex-col lg:flex-row gap-16 lg:gap-10 justify-between items-center w-full'>

                        {/* ================= PANEL KIRI (Transmission Hub) ================= */}
                        <motion.div variants={itemVariants} className='flex flex-col gap-8 z-10 w-full lg:w-1/2'>
                            
                            {/* 1. Status Indicator Bar */}
                            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 w-fit backdrop-blur-sm">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                                </span>
                                <span className="text-amber-400 text-[10px] font-mono tracking-widest uppercase font-bold">
                                    Available for Work
                                </span>
                            </div>

                            {/* 2. Main Heading */}
                            <div className='flex flex-col'>
                                <h2 className='text-6xl md:text-8xl tracking-tighter font-black leading-none text-white'>
                                    SAY <br /> 
                                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200'>
                                        HELLO.
                                    </span>
                                </h2>
                            </div>

                            {/* 3. Data-Driven Copywriting */}
                            <div className='flex gap-4 items-stretch'>
                                <div className="w-1 bg-gray-800 rounded-full"></div>
                                <p className='max-w-md text-gray-400 leading-relaxed font-mono text-sm md:text-base'>
                                    Whether you have a question, a project idea, or just want to connect. Blending a background in Physics with expertise in web development and data science, I'm ready to help you build robust systems.
                                </p>
                            </div>

                            {/* 4. Action Button */}
                            <div className="mt-4">
                                <MagneticButton>
                                    <a 
                                        href="mailto:makmalluddin123@gmail.com"
                                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0b0c10] border border-gray-700 hover:border-amber-500 rounded-lg overflow-hidden transition-all duration-300 shadow-xl"
                                    >
                                        <div className="absolute inset-0 w-0 bg-amber-500/10 group-hover:w-full transition-all duration-500 ease-out"></div>
                                        <span className="relative text-gray-300 font-mono text-xs tracking-[0.2em] uppercase font-bold group-hover:text-amber-400 transition-colors">
                                            Transmit Message
                                        </span>
                                        <Icon icon="solar:plain-2-linear" className="relative text-xl text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                    </a>
                                </MagneticButton>
                            </div>
                        </motion.div>

                        {/* ================= PANEL KANAN (Orbit & Contact Cards) ================= */}
                        <motion.div variants={itemVariants} className='flex flex-col items-center gap-12 w-full lg:w-1/2'>
                            
                            {/* The Atomic Orbital System (Tetap persis seperti kode Anda) */}
                            <div className='relative flex items-center justify-center w-[350px] h-[350px] md:w-[500px] md:h-[300px]'>
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                <svg className="absolute w-full h-full opacity-80 pointer-events-none">
                                    <motion.circle cx="50%" cy="50%" r="140" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4,4" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
                                </svg>
                                <div className="absolute inset-0 pointer-events-none">
                                    {socialMedia.map((socc, index) => {
                                        const angle = (index / socialMedia.length) * 2 * Math.PI;
                                        const radius = 140;
                                        return (
                                            <motion.div key={socc.id} className="absolute pointer-events-auto" style={{ left: '50%', top: '50%', x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, }} animate={{ x: Math.cos(angle) * radius, y: [ Math.sin(angle) * radius, (Math.sin(angle) * radius) - 10, Math.sin(angle) * radius ], }} transition={{ duration: 4, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}>
                                                <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group">
                                                    <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${socc.textcol.replace('text', 'bg')}`}></div>
                                                    <a href={socc.link} target="_blank" rel="noopener noreferrer">
                                                        <SosmedCard {...socc}/>
                                                    </a>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="scale-75 opacity-30">
                                        <CircularText text="* DATA * PHYSICS * TECH * WEB " spinDuration={20} className="font-mono text-white tracking-widest" />
                                    </div>
                                </div>
                                <div className="absolute z-20 w-16 h-16 rounded-full border border-gray-700 bg-black/60 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                                    <Icon icon="solar:cpu-bold" className="text-3xl text-amber-400 animate-pulse" />
                                </div>
                            </div>

                            {/* Info Cards (Simpel, Tanpa Glow, Bersih) */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center items-end">
                                
                                {/* Email Card */}
                                <a 
                                    href="mailto:makmalluddin123@gmail.com" 
                                    className="flex-1 flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-[#0b0c10] hover:bg-[#11131a] hover:border-gray-600 transition-colors group"
                                >
                                    <div className="flex-none p-3 bg-gray-900 rounded-lg text-gray-500 group-hover:text-amber-400 transition-colors">
                                        <Icon icon="mdi:email-outline" className="text-xl" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-0.5">Email</span>
                                        <span className="text-xs md:text-sm text-gray-300 font-mono truncate">makmalluddin123<br className="hidden md:block lg:hidden"/>@gmail.com</span>
                                    </div>
                                </a>

                                {/* Phone Card */}
                                <a 
                                    href="http://wa.me/6285159594771" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex-1 flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-[#0b0c10] hover:bg-[#11131a] hover:border-gray-600 transition-colors group"
                                >
                                    <div className="flex-none p-3 bg-gray-900 rounded-lg text-gray-500 group-hover:text-green-400 transition-colors">
                                        <Icon icon="mdi:whatsapp" className="text-xl" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-0.5">WhatsApp</span>
                                        <span className="text-xs md:text-sm text-gray-300 font-mono truncate">+62 851 5959 4771</span>
                                    </div>
                                </a>

                            </div>

                        </motion.div>
                    </div>
                </motion.div>
            </MainLayout>
        </section>
    );
}

export default Contact;