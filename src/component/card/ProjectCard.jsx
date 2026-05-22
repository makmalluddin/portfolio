import React, { memo } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react';

const ProjectCard = memo(({ 
    image, 
    title, 
    description, 
    tools, 
    type, 
    color = 'amber', 
    onclick, 
    keyFeatures = [], 
    demoLink = "#",
    isActive, 
    onExpand, 
    onCollapse 
}) => {
    
    const themeMap = {
        cyan: {
            text: 'text-cyan-400',
            bg: 'bg-cyan-500',
            bgHover: 'hover:bg-cyan-400',
            border: 'border-cyan-500/20',
            borderActive: 'border-cyan-500/50',
            badge: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
        },
        amber: {
            text: 'text-amber-400',
            bg: 'bg-amber-500',
            bgHover: 'hover:bg-amber-400',
            border: 'border-amber-500/20',
            borderActive: 'border-amber-500/50',
            badge: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        }
    };

    const theme = themeMap[color] || themeMap.amber;

    return (
        <motion.div
            layout
            onClick={!isActive ? onExpand : undefined}
            className={`relative flex flex-col lg:${isActive ? 'flex-row' : 'flex-col'} overflow-hidden rounded-xl border bg-[#0b0c10] transition-colors duration-300 w-full h-full
                ${isActive ? `${theme.borderActive} cursor-default shadow-2xl shadow-black/90` : `border-gray-800/80 cursor-pointer hover:border-gray-600 group`}
            `}
        >
            {/* ================= PANEL KIRI (VISUAL) ================= */}
            <motion.div 
                layout 
                className={`relative w-full shrink-0 overflow-hidden bg-black flex items-center justify-center
                    ${isActive ? 'lg:w-1/2 min-h-[300px] lg:min-h-[450px]' : 'aspect-video lg:h-72'}
                `}
            >
                <motion.img
                    layout
                    alt={title}
                    src={image}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out 
                        ${!isActive ? 'group-hover:scale-105 opacity-80 group-hover:opacity-100' : 'opacity-100'}
                    `}
                    loading="lazy"
                />

                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
                
                <div className={`absolute bottom-0 left-0 w-full p-5 transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex justify-between items-end">
                        <h3 className="text-white text-lg md:text-sm font-bold truncate pr-4">{title}</h3>
                        <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase flex-none ${theme.badge}`}>
                            {type}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ================= PANEL KANAN (DATA EKSPANSI) ================= */}
            <AnimatePresence mode="wait">
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex-1 flex flex-col p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-800/50 bg-[#0d0f14]"
                    >
                        <div className="flex justify-between items-start mb-4 gap-4">
                            <div>
                                <div className={`text-[10px] uppercase tracking-[0.2em] mb-2 font-mono ${theme.text}`}>{type} Project</div>
                                <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onCollapse(); }} 
                                className="text-gray-500 hover:cursor-pointer hover:text-white bg-gray-900 hover:bg-gray-800 p-2 rounded-full transition-colors flex-none"
                            >
                                <Icon icon="mdi:close" className="text-xl" />
                            </button>
                        </div>

                        <p className="text-gray-400 text-sm font-mono leading-relaxed mb-6">
                            {description}
                        </p>

                        <div className="mb-6">
                            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// Key Features</h4>
                            <ul className="space-y-2.5">
                                {keyFeatures.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300 font-mono leading-relaxed">
                                        <Icon icon="mdi:check-circle-outline" className={`${theme.text} text-lg flex-none mt-0.5`} />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto pt-4">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {tools.map((t, i) => (
                                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#11131a] border border-gray-800 text-gray-300">
                                        <Icon icon={t.icon} className={theme.text} />
                                        <span className="text-[10px] font-mono tracking-wide">{t.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {demoLink && demoLink !== "#" && (
                                    <a href={demoLink} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 ${theme.bg} ${theme.bgHover} text-black font-bold text-xs py-3 px-4 rounded transition-colors`}>
                                        <Icon icon="mdi:play-circle-outline" className="text-lg" /> SHOW DEMO
                                    </a>
                                )}
                                <a href={onclick} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 text-white font-bold text-xs py-3 px-4 rounded transition-colors bg-transparent">
                                    <Icon icon="mdi:github" className="text-lg" /> VIEW REPOSITORY
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

export default ProjectCard;