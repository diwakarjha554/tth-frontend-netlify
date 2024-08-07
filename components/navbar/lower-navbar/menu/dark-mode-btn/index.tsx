import React from 'react';
import ThemeSwitcher from '@/components/ui/theme/themeSwitcher';
import { CgDarkMode } from 'react-icons/cg';

const DarkModeBtn = () => {
    return (
        <div className="px-3 h-16 bg-background flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-gray-300/70 dark:bg-gray-500/50 p-2 rounded-full">
                    <CgDarkMode size={20} />
                </div>
                <h1 className="font-medium">Dark Mode</h1>
            </div>
            <ThemeSwitcher />
        </div>
    );
};

export default DarkModeBtn;
