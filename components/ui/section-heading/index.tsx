import React from 'react';

interface SectionHeadingProps {
    mainHeading?: string;
    subHeading?: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ mainHeading, subHeading }) => {
    return (
        <div className="flex gap-2">
            <div className="bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 w-2"></div>
            <div>
                <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit text-2xl md:text-3xl font-bold">
                    { mainHeading }
                </h1>
                <h1 className="text-sm md:text-base lg:text-lg font-medium">{ subHeading }</h1>
            </div>
        </div>
    );
};

export default SectionHeading;
