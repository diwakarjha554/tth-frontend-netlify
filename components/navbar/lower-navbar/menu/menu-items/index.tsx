import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

interface LargeMenuItemsProps {
    icon: IconType;
    href: string;
    title: string;
    className?: string;
    onClick?: () => void;
}

const MenuItems: React.FC<LargeMenuItemsProps> = ({ icon: Icon, href, title, className, onClick }) => {
    return (
        <Link href={href} className={`${className} flex items-center gap-3 px-3 h-16`} onClick={onClick}>
            <div className="bg-gray-300/70 dark:bg-gray-500/50 p-2 rounded-full">
                <Icon size={20} />
            </div>
            <h1 className="font-medium">{title}</h1>
        </Link>
    );
};

export default MenuItems;
