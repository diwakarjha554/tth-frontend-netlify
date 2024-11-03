import React from 'react';
import type { Metadata } from 'next';
import AboutUs from '@/components/about-us';

export const metadata: Metadata = {
    title: 'About Us - Travel Trail Holidays',
    description: 'At Travel Trail Holidays, our mission is to design journeys that leave an indelible mark on travelers, unveiling the captivating essence of India&apos;s culture, heritage, and natural splendor. As a leading travel company specializing in bespoke India tour packages, we are committed to curating experiences that surpass expectations and forge enduring memories.',
};

const page = () => {
    return <AboutUs />;
};

export default page;
