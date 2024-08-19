'use client';

import GradientIcon from '@/components/ui/features/GradientIcon';
import React, { useState } from 'react';
import { MdTimer } from 'react-icons/md';

const SelectDuration = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const options = ['1 to 3 days', '4 to 6 days', '7 to 9 days', '10 to 12 days', '13 days or more'];

    return (
        <div className="w-full relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="relative">
                <div className="backdrop-filter backdrop-blur-md bg-opacity-30 bg-gray-500 lg:backdrop-filter-none md:bg-transparent w-full pr-5 pl-10 py-5 lg:border-r border-r-gray-500 rounded lg:rounded-none lg:rounded-l-xl focus:outline-none">
                    {selectedOption || 'Select duration'}
                </div>
                {isOpen && (
                    <div className="absolute w-full mt-1 backdrop-blur-md bg-opacity-100 dark:bg-opacity-90 bg-white text-black dark:text-white dark:bg-slate-500 rounded shadow-lg z-10">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 hover:bg-transparent/10"
                                onClick={() => {
                                    setSelectedOption(option);
                                    setIsOpen(false);
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <GradientIcon icon={MdTimer} size={24} className="absolute top-5 left-3 " />
        </div>
    );
};

export default SelectDuration;
