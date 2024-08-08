import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Link href='/' className={`${className} select-none flex items-center justify-center gap-2`}>
            <div className='relative w-4 xxs:w-5 xs:w-6 sm:w-7 md:w-8 h-4 xxs:h-5 xs:h-6 sm:h-7 md:h-8 transition-all ease-in-out duration-150'>
                <Image 
                    src='/logo2.png'
                    alt='Travel Trail Holidays Logo'
                    fill
                    quality={100}
                    className='object-cover'
                />
            </div>
            <span className="logo-font font-semibold">
                Travel Trail Holidays
            </span>
        </Link>
    );
};

export default Logo;
