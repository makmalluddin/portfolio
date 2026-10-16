import React, { memo } from 'react';
import { Icon } from '@iconify/react';

const SkillCard = memo(({ name, icon, tag, color = 'amber', iconClass = '' }) => {
    // Siasat: Object mapping untuk mengatur tema warna per kotak
    // Menggunakan opacity (seperti /20 dan /50) agar serasi dengan background gelap
    const themeMap = {
        amber: {
            border: "border-amber-500/20 hover:border-amber-500/60",
            tagText: "text-amber-500/40 group-hover:text-amber-500/80",
            iconColor: "text-amber-400", 
            glow: "hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
        },
        cyan: {
            border: "border-cyan-500/20 hover:border-cyan-500/60",
            tagText: "text-cyan-500/40 group-hover:text-cyan-500/80",
            iconColor: "text-cyan-400",
            glow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        },
        violet: {
            border: "border-violet-500/20 hover:border-violet-500/60",
            tagText: "text-violet-500/40 group-hover:text-violet-500/80",
            iconColor: "text-violet-400",
            glow: "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
        }
    };

    const theme = themeMap[color] || themeMap.amber;

    return (
        <div 
            className={`relative w-28 h-28 flex flex-col items-center justify-center gap-3 rounded-md border bg-[#0a0b0d]/50 backdrop-blur-sm cursor-default transition-all duration-300 group ${theme.border} ${theme.glow} hover:bg-[#0f1115] hover:-translate-y-1`}
        >
            {/* Tag / Sub-category Badge di Pojok Kanan Atas */}
            {tag && (
                <span className={`absolute top-2 right-2 text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-300 ${theme.tagText}`}>
                    {tag}
                </span>
            )}

            {/* Ikon Skill */}
            {/* iconClass digunakan jika ada ikon yang warnanya perlu di-override secara spesifik dari parent */}
            <Icon 
                icon={icon} 
                className={`text-4xl transition-transform duration-300 group-hover:scale-110 ${iconClass || theme.iconColor}`} 
            />

            {/* Nama Skill */}
            <span className="text-xs font-mono text-gray-400 group-hover:text-gray-200 transition-colors duration-300 truncate w-full text-center px-2">
                {name}
            </span>
        </div>
    );
});

export default SkillCard;