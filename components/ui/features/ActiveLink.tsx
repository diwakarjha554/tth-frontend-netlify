'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface ActiveLinkProps {
    href: string;
    text: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, text }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={
                isActive ? 'text-violet-500 dark:text-violet-400' : 'hover:text-violet-500 dark:hover:text-violet-400'
            }
        >
            {text}
        </Link>
    );
};

export default ActiveLink;
