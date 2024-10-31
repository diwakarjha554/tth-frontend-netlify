import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface SwiperButtonProps {
    onClick: () => void;
}

interface SwiperButtonsProps {
    swiperLeftFunction: () => void;
    swiperRightFunction: () => void;
    margin?: number;
}

export const SwiperLeftButton: React.FC<SwiperButtonProps> = ({ onClick  }) => (
    <button
        className="p-3 transition-colors bg-purple-500/60 dark:bg-purple-500/30 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-purple-500/80 dark:hover:bg-purple-500/50"
        onClick={onClick }
    >
        <FiChevronLeft size={24} strokeWidth={3} />
    </button>
);

export const SwiperRightButton: React.FC<SwiperButtonProps> = ({ onClick  }) => (
    <button
        className="p-3 transition-colors bg-purple-500/60 dark:bg-purple-500/30 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-purple-500/80 dark:hover:bg-purple-500/50"
        onClick={onClick }
    >
        <FiChevronRight size={24} strokeWidth={3} />
    </button>
);

const SwiperButtons: React.FC<SwiperButtonsProps> = ({ swiperLeftFunction, swiperRightFunction, margin }) => {
    return (
        <div className={`flex justify-center gap-4 ${margin ? `mt-${margin}` : 'mt-10'}`}>
            <SwiperLeftButton onClick={swiperLeftFunction} />
            <SwiperRightButton onClick={swiperRightFunction} />
        </div>
    );
};

export default SwiperButtons;