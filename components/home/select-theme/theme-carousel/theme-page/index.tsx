'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import qs from 'query-string';
import Link from 'next/link';
import GradientIconLucide from '@/components/ui/features/GradientIconLucide';

interface ThemePageProps {
    icon: LucideIcon;
    label: string;
    className?: string;
    selected?: boolean;
}

const ThemePage: React.FC<ThemePageProps> = ({ icon: Icon, label, className, selected }) => {
    const params = useSearchParams();

    const handleClick = React.useCallback(() => {
        const currentQuery = params ? qs.parse(params.toString()) : {};

        const updatedQuery: Record<string, string | undefined> = {
            ...currentQuery,
            theme: params?.get('theme') === label ? undefined : label,
        };

        // Remove undefined values
        Object.keys(updatedQuery).forEach((key) => updatedQuery[key] === undefined && delete updatedQuery[key]);

        return qs.stringifyUrl(
            {
                url: '/packages',
                query: updatedQuery,
            },
            { skipNull: true }
        );
    }, [label, params]);

    return (
        <Link
            href={handleClick()}
            className="flex flex-col justify-center items-center gap-2 py-2 h-[130px] bg-background hover:bg-border border-2 hover:scale-105 md:hover:scale-110 lg:hover:scale-125 transition rounded-lg cursor-pointer transform-gpu duration-500"
        >
            <GradientIconLucide icon={Icon} size={40} />
            <h3 className="font-medium text-center truncate w-full">{label}</h3>
        </Link>
    );
};

// New ThemePageSkeleton component
const ThemePageSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-2 py-2 h-[130px] bg-background border-2 rounded-lg animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
    );
};

export { ThemePage, ThemePageSkeleton };
export default ThemePage;
