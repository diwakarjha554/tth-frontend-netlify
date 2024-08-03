import React from 'react';
import UpperNavbar from '@/components/navbar/upper-navbar';
import LowerNavbar from '@/components/navbar/lower-navbar';

const Navbar = () => {
  return (
    <div className='w-full fixed z-40 top-0'>
      <UpperNavbar className=''/>
      <LowerNavbar />
    </div>
  )
}

export default Navbar;