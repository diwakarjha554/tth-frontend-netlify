'use client';

import React, { useState } from 'react';
import Avatar from '@/components/ui/features/Avatar';
import MenuItems from '@/components/navbar/lower-navbar/menu/menu-items';
import DarkModeBtn from '@/components/navbar/lower-navbar/menu/dark-mode-btn';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaFaceAngry } from 'react-icons/fa6';

const Menu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(() => !isOpen);
  };

  return (
    <div className='relative'>
      <div onClick={toggleMenu} className='rounded-full border-2 dark:border-gray-500/50 p-2 flex items-center gap-2 cursor-pointer'>
        <HiOutlineMenuAlt3 />
        <Avatar />
      </div>
      {isOpen && (
        <div className='absolute bg-background border top-12 right-0 rounded-xl w-64 p-1'>
          <MenuItems href='' title='Account' icon={FaFaceAngry} className='bg-background rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500/40' />
          <MenuItems href='' title='Liked packages' icon={FaFaceAngry} className='bg-background rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500/40' />
          <DarkModeBtn />
          <MenuItems href='' title='Account' icon={FaFaceAngry} className='bg-background rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500/40' />
          <MenuItems href='' title='Logout' icon={FaFaceAngry} className='bg-background rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500/40' />
        </div>
      )}
    </div>
  )
}

export default Menu;