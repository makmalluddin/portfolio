import React, { memo } from 'react';
import { Icon } from '@iconify/react';

const CertificationCard = memo(({ title, provider, year, icon, isActive, onClick, color = 'amber' }) => {
    
    // Tema warna dinamis untuk status aktif
    const themeMap = {
        amber: {
            activeBorder: 'border-amber-500/50',
            activeBg: 'bg-amber-500/10',
            iconColor: 'text-amber-400',
            textHighlight: 'text-amber-400'
        },
        cyan: {
            activeBorder: 'border-cyan-500/50',
            activeBg: 'bg-cyan-500/10',
            iconColor: 'text-cyan-400',
            textHighlight: 'text-cyan-400'
        }
    };
    
    const theme = themeMap[color] || themeMap.amber;

    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 group
                ${isActive 
                    ? `${theme.activeBorder} ${theme.activeBg} shadow-[0_0_20px_rgba(0,0,0,0.5)]` 
                    : 'border-gray-800/80 bg-[#0b0c10] hover:border-gray-600 hover:bg-[#11131a]'
                }
            `}
        >
            {/* Logo / Ikon Provider */}
            <div className={`flex-none w-12 h-12 rounded-lg bg-[#050505] border flex items-center justify-center transition-colors
                ${isActive ? theme.activeBorder : 'border-gray-800'}
            `}>
                <Icon 
                    icon={icon} 
                    className={`text-2xl transition-colors duration-300 ${isActive ? theme.iconColor : 'text-gray-500 group-hover:text-gray-300'}`} 
                />
            </div>

            {/* Area Informasi Teks */}
            <div className="flex flex-col flex-1 min-w-0">
                <h4 className={`font-bold text-sm md:text-base truncate transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-mono font-semibold truncate transition-colors duration-300 ${isActive ? theme.textHighlight : 'text-gray-500'}`}>
                        {provider}
                    </span>
                    <span className="text-gray-700 text-[10px]">•</span>
                    <span className="text-gray-500 text-[10px] font-mono">{year}</span>
                </div>
            </div>
        </div>
    );
});

export default CertificationCard;