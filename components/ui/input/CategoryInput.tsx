'use client';

import React, { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import GradientIconLucide from '../features/GradientIconLucide';

interface CategoryInputProps {
    icon: LucideIcon;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: FC<CategoryInputProps> = ({ icon: Icon, label, selected, onClick }) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`w-[170px] rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-custom-clp dark:hover:border-custom-clp transition cursor-pointer ${
                selected ? 'border-red-500' : 'border-neutral-200 dark:border-gray-800'
            }`}
        >
            <GradientIconLucide icon={Icon} size={40} />
            <div className="font-semibold">{label}</div>
        </div>
    );
};

export default CategoryInput;
