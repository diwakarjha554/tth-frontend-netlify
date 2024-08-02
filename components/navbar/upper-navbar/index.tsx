'use client';

import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import { NavbarNotification } from '@/data/navbar-notification';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface UpperNavbarProps {
  className?: string;
}

const UpperNavbar: React.FC<UpperNavbarProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const data = NavbarNotification;

  if (!data.message || !isVisible) {
    return null;
  }

  return (
    <Section className={`${className} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-1 relative`}>
      <Container className='text-center'>
        <span className='text-sm font-semibold'>
          {data.message}
        </span>
        <button 
          onClick={() => setIsVisible(false)}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 hover:scale-110 transition'
          aria-label="Close notification"
        >
          <IoMdClose size={18} strokeWidth={20}/>
        </button>
      </Container>
    </Section>
  )
}

export default UpperNavbar;