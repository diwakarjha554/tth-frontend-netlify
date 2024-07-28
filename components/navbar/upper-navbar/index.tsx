import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';

interface UpperNavbarProps {
  className?: string;
};

const UpperNavbar: React.FC<UpperNavbarProps> = ({ className }) => {
  return (
    <Section className={`${className} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-1`}>
      <Container className=''>
        <span className='text-sm font-semibold'>
          Flat 10% off on all packages
        </span>
      </Container>
    </Section>
  )
}

export default UpperNavbar;