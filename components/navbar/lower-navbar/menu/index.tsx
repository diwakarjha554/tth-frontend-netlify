import Avatar from '@/components/ui/features/Avatar';
import React from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Menu = () => {
  return (
    <div className='rounded-full border-2 p-2 flex items-center gap-2 cursor-pointer'>
        <HiOutlineMenuAlt3 />
        <Avatar />
    </div>
  )
}

export default Menu;