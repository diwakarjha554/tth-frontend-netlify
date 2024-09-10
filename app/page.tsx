import React from 'react';
import FooterBar from '@/components/footer/footer-bar';
import DataCounter from '@/components/home/data-counter';
import HeroSection from '@/components/home/hero-section';
import FeaturedTrips from '@/components/home/featured-trips';
import SelectTheme from '@/components/home/select-theme';
import TopValues from '@/components/home/top-values';
import Navbar from '@/components/navbar';
import WeekendTrips from '@/components/home/weekend-trips';
import Footer from '@/components/footer';

const page = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <SelectTheme />
            <FeaturedTrips />
            <WeekendTrips />
            <TopValues />
            <DataCounter />
            <Footer />
            <FooterBar />
        </main>
    );
};

export default page;
