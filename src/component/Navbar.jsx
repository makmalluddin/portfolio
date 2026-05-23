import React, { useState, useEffect } from 'react';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll Handler
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        // font-mono ditambahkan di sini agar menurun ke semua child element
        <nav className={`fixed top-0 flex z-50 w-full font-heading transition-all duration-500 ${isScrolled ? 'h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800 shadow-xl' : 'h-24 bg-transparent'}`}>
            <div className='flex justify-between max-w-7xl w-full items-center px-6 lg:px-8 mx-auto'>

                {/* 1. Minimalist Branding */}
                <div className='flex justify-start cursor-pointer'>
                    <a href="#" className="text-lg md:text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
                        Udin<span className="text-amber-500">.</span>
                    </a>
                </div>

                {/* 2. Menu Navigasi - Pill Style */}
                <ul className='hidden md:flex gap-2 text-gray-400 items-center justify-center text-sm'>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* 3. Status Indicator - Clean & Subtle */}
                <div className="flex items-center gap-2.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full cursor-default">
                    <div className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] md:text-xs font-semibold tracking-wide text-emerald-400">
                        Available for hire
                    </span>
                </div>
                
            </div>
        </nav>
    );
}

export default Navbar;