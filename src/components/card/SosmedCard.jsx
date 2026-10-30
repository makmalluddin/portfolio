import React from 'react'
import { Icon } from '@iconify/react'

function SosmedCard({  name, icon, bordercol, link }) {
    const renderIcon = (icon, textcol) => {
        const textColor = {
            className: `text-4xl ${textcol}`
        }
        switch (icon) {
            case "linkedin": return <Icon icon='devicon:linkedin' fontSize={30}/>;
            case "github": return <Icon icon='mdi:github' fontSize={30}/>;
            case "whatsapp": return <Icon icon='ic:sharp-whatsapp' fontSize={30} className='text-green-500'/>;
            case "instagram": return <Icon icon='skill-icons:instagram' fontSize={30} className='text-pink-500'/>;
            case "notion": return <Icon icon='ri:notion-fill' fontSize={30} className='text-slate-200'/>;
            case "saturn": return <Icon icon='streamline:planet-solid' fontSize={30} className='text-gray-500'/>;
            case "asteroid": return <Icon icon='game-icons:asteroid' fontSize={30} className='text-gray-500'/>;
        }
    }

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative z-10 flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 bg-black/80 backdrop-blur-md transition-all duration-300 ${bordercol} hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
        >
            {renderIcon(icon)}
            <span className="absolute -bottom-6 scale-0 group-hover:scale-100 transition-transform font-mono text-[10px] text-gray-400 uppercase tracking-tighter whitespace-nowrap">
                {name}
            </span>
        </a>
    )
}

export default SosmedCard