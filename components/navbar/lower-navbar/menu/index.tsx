'use client';

import Avatar from '@/components/ui/features/Avatar';
import ThemeSwitcher from '@/components/ui/theme/themeSwitcher';
import React, { useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import MenuItems from '@/components/navbar/lower-navbar/menu/menu-items';
import { FaFaceAngry } from 'react-icons/fa6';
import { MdDarkMode } from 'react-icons/md';

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
        <div className='absolute bg-background border-2 top-12 right-0 rounded-3xl w-60'>
          <MenuItems href='' title='Account' icon={FaFaceAngry} className='border-b' />
          <MenuItems href='' title='Liked packages' icon={FaFaceAngry} className='border-b' />
          <div className='flex items-center gap-3 px-3 h-16 border-b'>
            <div className='bg-gray-300/70 dark:bg-gray-500/50 p-2 rounded-full'>
              <MdDarkMode size={20} />
            </div>
            <h1 className='font-medium'>
              Dark Mode
            </h1>
            <ThemeSwitcher />
          </div>
          <MenuItems href='' title='Account' icon={FaFaceAngry} className='border-b' />
          <MenuItems href='' title='Logout' icon={FaFaceAngry} />
        </div>
      )}
    </div>
  )
}

export default Menu;