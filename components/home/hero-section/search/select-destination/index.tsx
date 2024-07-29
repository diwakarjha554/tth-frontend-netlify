import GradientIcon from '@/components/ui/features/GradientIcon';
import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';

const SelectDestination = () => {
    return (
        <div className='w-full min-w-[205px] relative rounded-xl'>
            <input
                type="text"
                placeholder='Select destination'
                className='bg-transparent w-full pr-5 pl-10 py-5 border-r border-r-gray-400 rounded-l-xl hover:rounded-l-xl focus:outline-none'
            />
            <GradientIcon icon={IoLocationSharp} size={24} className='absolute top-5 '/>
        </div>
    )
}

export default SelectDestination;