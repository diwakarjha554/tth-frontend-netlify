'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <label className="flex cursor-pointer select-none items-center">
            <div className="relative">
                <input type="checkbox" checked={isDark} onChange={toggleTheme} className="sr-only" />
                <div className={`box block h-8 w-14 rounded-full ${isDark ? 'bg-[#222222]' : 'bg-border'}`}></div>
                <div
                    className={`
                        absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition 
                        ${isDark ? 'translate-x-full' : ''}
                    `}
                ></div>
            </div>
        </label>
    );
}
