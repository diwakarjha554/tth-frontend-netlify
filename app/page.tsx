import React from 'react';
import FooterBar from '@/components/footer/footer-bar';
import DataCounter from '@/components/home/data-counter';
import HeroSection from '@/components/home/hero-section';
import HomePackages from '@/components/home/home-packages';
import SelectTheme from '@/components/home/select-theme';
import TopValues from '@/components/home/top-values';
import Navbar from '@/components/navbar';

const page = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <SelectTheme />
            <HomePackages />
            <TopValues />
            <DataCounter />
            <FooterBar />
        </main>
    );
};

export default page;
