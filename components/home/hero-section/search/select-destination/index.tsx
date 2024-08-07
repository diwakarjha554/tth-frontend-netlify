import GradientIcon from '@/components/ui/features/GradientIcon';
import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';

const SelectDestination = () => {
    return (
        <div className="w-full relative rounded">
            <input
                type="text"
                placeholder="Select destination"
                className="backdrop-filter backdrop-blur-md bg-opacity-30 bg-gray-500 lg:backdrop-filter-none md:bg-transparent w-full pr-5 pl-10 py-5 lg:border-r border-r-gray-500 rounded lg:rounded-none lg:rounded-l-xl focus:outline-none"
            />
            <GradientIcon icon={IoLocationSharp} size={24} className="absolute top-5 left-3" />
        </div>
    );
};

export default SelectDestination;
