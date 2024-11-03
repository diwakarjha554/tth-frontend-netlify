import React from 'react';
import AboutHeroSection from './hero-section';
import AboutContent from './about-content';

const AboutUs = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden">
            <AboutHeroSection />
            <AboutContent />
        </main>
    );
};

export default AboutUs;
