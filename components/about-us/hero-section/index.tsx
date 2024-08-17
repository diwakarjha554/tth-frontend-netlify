import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import Image from 'next/image';
import React from 'react';

const AboutHeroSection = () => {
    return (
        <Section className="flex flex-col items-center">
            <div
                className={`w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] relative`}
            >
                <Image
                    src="/homeHeroImage.jpg"
                    width={4240}
                    height={2832}
                    alt="hero_bg"
                    priority
                    quality={100}
                    className="w-[100vw] h-full object-cover select-none"
                />
                <div className="absolute w-full h-full bg-black top-0 opacity-60 flex justify-center items-center"></div>
                <div className="absolute w-full h-full top-0 flex flex-col gap-10 justify-center items-center">
                    <span
                        className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white transition font-semibold`}
                    >
                        About Us
                    </span>
                </div>
            </div>
        </Section>
    );
};

export default AboutHeroSection;
