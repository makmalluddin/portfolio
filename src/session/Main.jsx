import React, { useRef, useState } from 'react';
import avatar from '../assets/myself/avatar.webp';
import Typewriter from 'typewriter-effect';
import FuzzyText from '/components/FuzzyText';
import { motion } from "motion/react";
import { Icon } from '@iconify/react';

const MagneticButton = ({ children, onClick }) => {
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
            onClick={onClick}
            className="relative cursor-pointer z-10 w-fit"
        >
            {children}
        </motion.div>
    );
};

function Main() {
    const bevelStyle = {
        clipPath: "polygon(0 15%, 15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
    };

    const openPdf = () => {
        window.open("https://drive.google.com/file/d/1EW2LCEcWlBTI88M1xfy8Hv64Hq74THoj/view?usp=sharing", "_blank");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section id='main' className='relative flex flex-col w-full min-h-screen scroll-mt-10 items-center justify-center text-white overflow-hidden bg-transparent py-20 lg:py-0'>
            {/* Version Website Tracker (Desktop Only) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -10, 0]
                }}
                transition={{
                    opacity: { duration: 1 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className='absolute top-32 left-10 hidden lg:block'
            >
                <div className="text-[10px] font-mono text-gray-500 tracking-[0.5em] rotate-90 origin-left">
                    <FuzzyText baseIntensity={0.1} hoverIntensity={0.5} fontSize={13} enableHover>
                        RESUME_SYSTEM.v1.3
                    </FuzzyText>
                </div>
            </motion.div>

            {/* Container Utama (Lebar dibatasi ke max-w-6xl agar proporsional) */}
            <div className='flex flex-col max-w-6xl mx-auto px-6 lg:px-8 z-10 w-full gap-12 lg:gap-16'>

                {/* 1. Area Avatar & Tipografi */}
                <div className='flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20'>

                    {/* Panel Kiri: Avatar Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: [
                                "drop-shadow(0px 0px 0px rgba(245, 158, 11, 0))",
                                "drop-shadow(0px 0px 20px rgba(245, 158, 11, 0.15))",
                                "drop-shadow(0px 0px 0px rgba(245, 158, 11, 0))"
                            ]
                        }}
                        transition={{
                            opacity: { duration: 1.5 },
                            filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className='relative flex justify-center group'
                    >
                        {/* Bingkai Bevel */}
                        <div
                            className="absolute w-64 h-72 lg:w-60 lg:h-75 border border-amber-500/50 translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4 transition-transform group-hover:translate-x-5 group-hover:translate-y-5 duration-700"
                            style={bevelStyle}
                        ></div>

                        {/* Foto Asli */}
                        <img
                            src={avatar}
                            alt="Muhammad Akmalluddin"
                            width={232}
                            height={280}
                            loading="eager"
                            decoding="sync"
                            className='w-58 h-70 lg:w-60 lg:h-75 object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl relative z-10 bg-[#0a0a0a]'
                            style={bevelStyle}
                            fetchPriority='high'
                        />
                    </motion.div>

                    {/* Panel Kanan: Tipografi & CTA */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='flex flex-col items-center lg:items-start justify-center gap-4 text-center lg:text-left w-full max-w-xl'
                    >
                        {/* Nama (Responsive Size) */}
                        <motion.div variants={itemVariants} className='space-y-1'>
                            <h1 className='text-4xl md:text-5xl lg:text-5xl font-black tracking-tighter uppercase leading-none'>
                                Muhammad <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Akmalluddin</span>
                            </h1>
                        </motion.div>

                        {/* Typewriter Role (Warna Cyan untuk kontras) */}
                        <motion.div variants={itemVariants} className='text-lg lg:text-2xl font-mono text-cyan-400 h-8 flex items-center justify-center lg:justify-start w-full'>
                            <Typewriter
                                options={{
                                    strings: ['Full Stack Developer', 'Software Engineer'],
                                    autoStart: true,
                                    loop: true,
                                    delay: 75,
                                    cursor: '_',
                                }}
                            />
                        </motion.div>

                        {/* Deskripsi Singkat */}
                        <motion.p variants={itemVariants} className='text-gray-400 text-sm lg:text-base leading-relaxed font-mono max-w-md mx-auto lg:mx-0'>
                            Full-Stack Developer with <span className='text-amber-400 font-bold'>1 year</span> of experience building scalable 
                            web applications using <span className='text-amber-400 font-bold'>React, Node.js, Python, and PostgreSQL</span>. 
                        </motion.p>

                        {/* Area Tombol & Sosmed (Flex adaptif untuk mobile) */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6 w-full">

                            {/* Tombol Resume Cyber-Minimalist */}
                            <MagneticButton onClick={openPdf}>
                                <div className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0b0c10] border border-gray-700 hover:border-amber-500 rounded-sm overflow-hidden transition-all duration-300 shadow-xl">
                                    <div className="absolute inset-0 w-0 bg-amber-500/10 group-hover:w-full transition-all duration-500 ease-out"></div>
                                    <span className="relative text-gray-300 font-mono text-xs tracking-[0.2em] uppercase font-bold group-hover:text-amber-400 transition-colors">
                                        VIEW RESUME
                                    </span>
                                    <Icon icon="solar:document-text-linear" className="relative text-lg text-gray-500 group-hover:text-amber-400 transition-colors" />
                                </div>
                            </MagneticButton>

                            {/* Lingkaran Ikon Sosmed */}
                            <div className='flex items-center gap-4'>
                                <a href='https://github.com/makmalluddin' target='_blank' rel="noopener noreferrer" className="p-2 border border-gray-800 rounded-sm hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group">
                                    <Icon icon='mdi:github' className='text-xl text-gray-400 group-hover:text-cyan-400 transition-colors' />
                                </a>
                                <a href='https://www.linkedin.com/in/makmalluddin/' target='_blank' rel="noopener noreferrer" className="p-2 border border-gray-800 rounded-sm hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group">
                                    <Icon icon='devicon-plain:linkedin' className='text-xl text-gray-400 group-hover:text-cyan-400 transition-colors' />
                                </a>
                                <a href='mailto:makmalluddin123@gmail.com' target='_blank' rel="noopener noreferrer" className="p-2 border border-gray-800 rounded-sm hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group">
                                    <Icon icon='mdi:gmail' className='text-xl text-gray-400 group-hover:text-cyan-400 transition-colors' />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* 2. Box Metrics (Responsif & Relatif) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    // Diubah menjadi max-w-4xl dan flex-col di mobile agar tidak merusak lebar layar
                    className="flex flex-col md:flex-row relative bg-[#0b0c10]/80 backdrop-blur-md border border-gray-800 w-full max-w-4xl mx-auto font-mono shadow-2xl rounded-xl z-20"
                >
                    {/* Sudut Dekoratif Cyber */}
                    <div className="h-4 w-4 border-t-2 border-l-2 border-amber-500 absolute -top-1 -left-1 rounded-tl-xs"></div>
                    <div className="h-4 w-4 border-b-2 border-r-2 border-amber-500 absolute -right-1 -bottom-1 rounded-br-xs"></div>

                    {[
                        { val: "1", label: "year experience" },
                        { val: "4", label: "featured projects" },
                        { val: "4", label: "prog. languages" }
                    ].map((item, index) => (
                        <div
                            key={index}
                            // Menggunakan border-b di mobile, border-r di desktop
                            className={`w-full flex flex-col gap-1 items-center justify-center py-6 px-4 text-center group border-gray-800 ${index !== 2 ? 'border-b md:border-b-0 md:border-r' : ''}`}
                        >
                            <div className="text-3xl lg:text-4xl font-black text-amber-500 tracking-tighter group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300">
                                {item.val}
                            </div>
                            <div className="text-xs lg:text-sm uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-300 transition-colors">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Main;