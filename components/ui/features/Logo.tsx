import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link
      href={'/'}
      className={`${className} select-none`}
    >
      <span className='logo-font font-semibold'>
        Travel Trail Holidays
      </span>
    </Link>
  )
}

export default Logo;