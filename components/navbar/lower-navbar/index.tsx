import React from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import Logo from '@/components/ui/features/Logo';
import Menu from './menu';

const LowerNavbar = () => {
  return (
    <Section className='py-2 shadow'>
      <Container className='w-full flex justify-center items-center md:justify-between'>
        <Logo className=''/>
        <div className='hidden md:flex'> 
          <Menu />
        </div>
      </Container>
    </Section>
  )
}

export default LowerNavbar;