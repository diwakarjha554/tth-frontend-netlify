import GradientIcon from '@/components/ui/features/GradientIcon';
import React from 'react';
import { FaFaceGrinBeamSweat } from 'react-icons/fa6';

const ValuesCard = () => {
    return (
        <div className="flex flex-col pt-10 relative w-full md:w-4/12">
            <div className="w-20 h-20 absolute top-0 bg-gray-50 dark:bg-[#111111] left-6 flex justify-center items-center">
                <GradientIcon icon={FaFaceGrinBeamSweat} size={48} />
            </div>
            <div className="bg-purple-500/[0.05] dark:bg-purple-500/[0.2] pt-16 px-6 pb-6 flex flex-col w-full gap-4 rounded-3xl rounded-tl-none">
                <h5 className="text-3xl font-medium">Budget Friendly Packages</h5>
                <p className="text-lg">
                    Discover the wonders of India without straining your wallet with our budget-friendly packages. We
                    committed to providing affordable options, we have curated a range of packages that offer
                    exceptional value for your money. Experience the rich culture, diverse landscapes, and history of
                    India without compromising on quality or missing out on must-see attractions.
                </p>
            </div>
            <div className="bg-gradient-to-t from-gray-50 dark:from-[#111111] to-transparent h-[200px] w-full absolute bottom-0" />
        </div>
    );
};

export default ValuesCard;
