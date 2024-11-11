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
                src="/logo/logoFullLight.png"
                alt="Travel Trail Holidays Logo"
                fill
                quality={100}
                className="object-contain dark:hidden"
            />
            <Image
                src="/logo/logoFullDark.png"
                alt="Travel Trail Holidays Logo"
                fill
                quality={100}
                className="object-contain hidden dark:block"
            />
        </Link>
    );
};

export default LogoFull;