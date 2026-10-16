import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';

const ExperienceCard = ({
    id,
    position,
    isActive,
    onClick,
    role,
    company,
    date,
    type,
    stack,
    color = 'amber',
    descriptions = [],
    documentations = []
}) => {
    const isLeft = position === 'left';
    const carouselRef = useRef(null);

    const theme = {
        amber: {
            text: 'text-amber-500',
            textHover: 'text-amber-400',
            bg: 'bg-amber-500',
            bgLight: 'bg-amber-500/10',
            border: 'border-amber-500/50',
            glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]',
            bullet: 'text-amber-500'
        },
        cyan: {
            text: 'text-cyan-500',
            textHover: 'text-cyan-400',
            bg: 'bg-cyan-500',
            bgLight: 'bg-cyan-500/10',
            border: 'border-cyan-500/50',
            glow: 'shadow-[0_0_15px_rgba(6,182,212,0.5)]',
            bullet: 'text-cyan-500'
        }
    }[color] || theme.amber;

    return (
        // Siasat 1 & 2: Menggunakan py-3 (padding) tanpa margin agar garis timeline tidak putus
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center py-3 group">
            
            {/* ================= TIMELINE CENTER ================= */}
            {/* Garis vertikal membentang penuh 100% tinggi kontainer (bersentuhan antar kartu) */}
            <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 -translate-x-1/2 z-0 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}></div>
            
            <div 
                className={`hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-5 h-5 rounded-full border-2 transition-all duration-500 items-center justify-center
                ${isActive ? `${theme.border} bg-[#111] scale-125 ${theme.glow}` : 'border-gray-600 bg-[#111] group-hover:border-gray-400'}`}
            >
                {isActive && <div className={`w-2 h-2 ${theme.bg} rounded-full`}></div>}
            </div>

            {/* ================= MAIN CARD CONTAINER ================= */}
            <div 
                className={`w-full md:w-1/2 flex relative z-10 
                ${isLeft ? 'md:pr-12 md:justify-end' : 'md:pl-12 md:justify-start md:order-2'}`}
            >
                <motion.div
                    onClick={onClick}
                    layout
                    initial={{ scale: 1, rotate: 0 }}
                    animate={{ 
                        scale: isActive ? 1.05 : 1, 
                        rotate: isActive ? (isLeft ? -2 : 2) : 0, 
                        zIndex: isActive ? 50 : 10
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    // Card dibuat lebih compact (p-5 dari p-6)
                    className={`w-full max-w-md p-5 rounded-md border cursor-pointer backdrop-blur-sm transition-colors duration-300
                        ${isActive 
                            ? `bg-[#1a1a1a]/90 ${theme.border} shadow-2xl shadow-black/80` 
                            : 'bg-[#111111]/80 border-gray-800 hover:bg-[#151515]/90 hover:border-gray-700'
                        }`}
                >
                    <div className="flex justify-between items-start mb-3">
                        <div className={`text-[10px] font-mono tracking-[0.2em] uppercase ${theme.text} border ${theme.border} ${theme.bgLight} px-2 py-1 rounded`}>
                            {type}
                        </div>
                        <div className="text-[11px] font-mono text-gray-500 mt-1">
                            {date}
                        </div>
                    </div>
                    
                    <h3 className={`text-lg font-bold tracking-tight mb-1 transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {role}
                    </h3>
                    <div className={`text-sm font-mono ${theme.textHover} opacity-90 mb-4`}>
                        {company}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-800/60">
                        {stack.map((tech, idx) => (
                            <span key={idx} className="text-[10px] font-mono text-gray-400 bg-gray-900 px-2 py-1 rounded-xs">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ================= CROSS-EXPANSION (OPPOSITE SIDE) ================= */}
            <div 
                className={`w-full md:w-1/2 flex flex-col mt-6 md:mt-0 relative z-10
                ${isLeft ? 'md:pl-12 md:justify-start md:order-2' : 'md:pr-12 md:justify-end'}`}
            >
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0, x: isLeft ? -30 : 30, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: isLeft ? -10 : 10, filter: 'blur(2px)' }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full max-w-md flex flex-col gap-5"
                        >
                            {/* Bullet Points Deskripsi */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-md shadow-xl">
                                <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">// key_responsibilities</h4>
                                <ul className="space-y-2.5">
                                    {descriptions.map((desc, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed font-mono">
                                            <Icon icon="mdi:chevron-right" className={`${theme.bullet} text-lg flex-none mt-0.5`} />
                                            <span>{desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Dokumentasi Carousel Kaca */}
                            {documentations.length > 0 && (
                                <div className="flex flex-col">
                                    <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">// documentation</h4>
                                    
                                    <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-2">
                                        <motion.div 
                                            drag="x" 
                                            dragConstraints={carouselRef} 
                                            className="flex gap-4 w-max"
                                        >
                                            {documentations.map((doc, idx) => (
                                                <motion.div 
                                                    key={idx}
                                                    whileHover={{ y: -5 }}
                                                    className="w-40 flex-none flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-xs overflow-hidden shadow-lg relative"
                                                >
                                                    <img 
                                                        src={doc.image} 
                                                        alt={doc.title} 
                                                        width="160"
                                                        height="96" 
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="w-full h-24 object-cover pointer-events-none opacity-80" 
                                                    />
                                                    <div className="p-2 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0 w-full">
                                                        <span className="text-[10px] font-mono text-white truncate block">
                                                            {doc.title}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ExperienceCard;