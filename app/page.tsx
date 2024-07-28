import HeroSection from '@/components/home/hero-section';
import Navbar from '@/components/navbar';
import React from 'react';

const page = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden'>
      <Navbar />
      <HeroSection />
    </main>
  )
}

export default page;