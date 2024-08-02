import CarouselCard from '@/components/home/carousel';
import DataCounter from '@/components/home/data-counter';
import HeroSection from '@/components/home/hero-section';
import HomePackages from '@/components/home/home-packages';
import SelectTheme from '@/components/home/select-theme';
import TopValues from '@/components/home/top-values';
import Navbar from '@/components/navbar';
import React from 'react';

const page = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden'>
      <Navbar />
      <HeroSection />
      {/* <CarouselCard /> */}
      <SelectTheme />
      <HomePackages />
      <TopValues />
      <DataCounter />
    </main>
  )
}

export default page;