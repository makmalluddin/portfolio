import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import reactbits from '/src/assets/footer/reactbits.webp';
import motionlog from '/src/assets/footer/motion.webp';

const Footer = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Time Formatting
    const jakartaTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(time);

    return (
        <footer className="w-full py-5 md:py-4 border-t border-gray-800 bg-[#050505] font-mono">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Container Utama Responsif */}
                <div className="flex flex-row md:flex-row items-center justify-between gap-6 md:gap-0">

                    {/* 1. Build Stack Section */}
                    <div className="flex flex-col items-start w-full md:w-1/3">
                        <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-2.5">System_Stack</span>
                        <div className="flex gap-3 text-gray-400 items-center">
                            <Icon icon="logos:react" height="16" className="grayscale hover:grayscale-0 transition-all" />
                            <Icon icon="logos:tailwindcss-icon" height="15" className="grayscale hover:grayscale-0 transition-all" />
                            <img alt='reactbits' src={reactbits} className='h-[16px] opacity-60 hover:opacity-100 transition-opacity'/>
                            <img alt='motion' src={motionlog} className='h-[16px] opacity-60 hover:opacity-100 transition-opacity'/>
                        </div>
                    </div>

                    {/* 2. Local Time Section (Siasat: Menggunakan hidden untuk mobile, md:flex untuk desktop) */}
                    <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/3">
                        <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Local Time / JKT</span>
                        <span className="text-amber-400 text-lg md:text-xl font-bold tracking-wider">
                            {jakartaTime} <span className="text-[10px] text-gray-600 font-normal">WIB</span>
                        </span>
                    </div>

                    {/* 3. Copyright Section */}
                    <div className="flex flex-col items-end w-full md:w-1/3">
                        <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-1.5">Edition</span>
                        <p className="text-gray-400 text-xs md:text-sm">© 2026 — All Rights Reserved</p>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;