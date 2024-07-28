import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import Image from 'next/image';
import React from 'react'

const HeroSection = () => {
    return (
        <Section className='h-[80vh] relative'>
            <Container className=''>
                <Image
                    fill
                    src='/heroBg.webp'
                    alt='heroImage'
                    className='object-cover select-none'
                    quality={100}
                />
                <div className='hidden dark:block absolute left-0 top-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-xs w-full h-full'></div>
                <div className='md:flex flex-col text-center items-center justify-center text-gray-800 dark:text-gray-100 gap-2 relative'>
                    <span className='hero-title font-extrabold uppercase bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit'>
                        Travel Beyond Boundaries !
                    </span>
                    <p className='hero-subtitle hidden md:block w-[600px] lg:w-[800px] xl:w-auto max-w-[1000px]'>
                        Whether you&apos;re looking for a romantic getaway, a family-friendly adventure, or a solo journey to explore the world, we travel trail holidays can provide you with a custom-tailored itinerary that exceeds your expectations.
                    </p>
                </div>
            </Container>
        </Section>
    )
}

export default HeroSection;