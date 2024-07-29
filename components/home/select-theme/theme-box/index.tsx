import GradientIcon from '@/components/ui/features/GradientIcon';
import React from 'react';
import { IconType } from 'react-icons';

interface ThemeBoxProps {
  icon: IconType;
  size?: number;
};

const ThemeBox: React.FC<ThemeBoxProps> = ({ icon, size = 24 }) => {
  return (
    <div className='border-2 w-fit py-5 px-10 rounded bg-background hover:bg-border cursor-pointer flex flex-col items-center gap-2'>
      <GradientIcon icon={icon} size={size}/>
      <span>
        ThemeBox
      </span>
    </div>
  )
}

export default ThemeBox;