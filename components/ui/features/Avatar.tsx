import Image from 'next/image';
import React from 'react';

interface AvatarProps {
    src: string | null | undefined;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, className }) => {
    return (
        <Image
            src={src || '/avatar.png'}
            alt=""
            width={26}
            height={26}
            className={`rounded-full select-none hidden sm:block ${className}`}
        />
    );
};

export default Avatar;
