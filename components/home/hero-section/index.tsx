import React from 'react';
import Image from 'next/image';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import Search from '@/components/home/hero-section/search';

const HeroSection = () => {
    return (
        <Section className="h-[600px] sm:h-[700px] md:h-[100vh] relative bg-black">
            <Container className="">
                <Image
                    fill
                    src="/homeHeroImage.jpg"
                    alt="heroImage"
                    className="object-cover select-none "
                    quality={100}
                    priority
                />

                <div className=" absolute left-0 top-0 bg-black bg-opacity-80 md:bg-opacity-70 backdrop-filter backdrop-blur-xs w-full h-full"></div>
                <div className="flex flex-col text-center items-center justify-center text-gray-800 dark:text-gray-100 gap-2 relative z-30">
                    <span className="mt-10 md:mt-0 hero-title font-extrabold uppercase bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit">
                        Travel Beyond Boundaries !
                    </span>
                    <p className="hero-subtitle hidden md:block w-[600px] lg:w-[800px] xl:w-auto max-w-[1000px] text-white">
                        Whether you&apos;re looking for a romantic getaway, a family-friendly adventure, or a solo
                        journey to explore the world, we travel trail holidays can provide you with a custom-tailored
                        itinerary that exceeds your expectations.
                    </p>
                    <Search className="lg:absolute -bottom-40" />
                </div>
            </Container>
        </Section>
    );
};

export default HeroSection;
