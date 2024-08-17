import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LogoFull = () => {
    return (
        <Link
            href='/' 
            className="relative h-9 w-72 select-none"
        >
            <Image
                src="/logo-light.png"
                alt="Travel Trail Holidays Logo"
                fill
                quality={100}
                className="object-contain dark:hidden"
            />
            <Image
                src="/logo-dark.png"
                alt="Travel Trail Holidays Logo"
                fill
                quality={100}
                className="object-contain hidden dark:block"
            />
        </Link>
    );
};

export default LogoFull;
