import Image from 'next/image';
import React from 'react';

const LogoFull = () => {
  return (
    <div className='relative h-8 w-80'>
        <Image 
            src='/logo3.png'
            alt='Travel Trail Holidays Logo'
            fill
            quality={100}
            className='object-contain'
        />
    </div>
  )
}

export default LogoFull;