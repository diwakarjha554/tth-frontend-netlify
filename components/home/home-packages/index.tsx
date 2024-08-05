'use client';

import PackageCard from '@/components/packages/package-card';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import CardData from '@/data/themeSelect';
import React, { useEffect, useState } from 'react'

const HomePackages = () => {
    const cards = CardData;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [cardsToShow, setCardsToShow] = useState<number>(3);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);
            if (width < 640) {
                setCardsToShow(1);
            } else if (width < 1024) {
                setCardsToShow(2);
            } else {
                setCardsToShow(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, cards.length - cardsToShow)
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    return (
        <Section className='py-20'>
            <Container className='w-full'>
                <div className='w-full flex flex-col items-center gap-1 text-center mb-10'>
                    <h1 className='font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit text-lg'>
                        Featured tours
                    </h1>
                    <h1 className='font-semibold text-xl'>
                        Most Favorite Tour Packages
                    </h1>
                </div>
                <div className="w-full mx-auto relative">
                    <div className={`flex ${isMobile ? 'flex-col' : 'items-center'}`}>
                        {!isMobile && (
                            <button
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                                className="bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors duration-300 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                            >
                                &lt;
                            </button>
                        )}
                        <div className="overflow-hidden flex-grow mx-4">
                            <div
                                className="flex gap-5 transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(calc(-${currentIndex * (100 / cardsToShow)}% - ${currentIndex * 20 / cardsToShow}px))`,
                                }}
                            >
                                {cards.map((card, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0"
                                        style={{
                                            width: `calc(${100 / cardsToShow}% - ${20 * (cardsToShow - 1) / cardsToShow}px)`,
                                            minWidth: '230px'
                                        }}
                                    >
                                        <PackageCard />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {!isMobile && (
                            <button
                                onClick={nextSlide}
                                disabled={currentIndex === cards.length - cardsToShow}
                                className="bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors duration-300 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                            >
                                &gt;
                            </button>
                        )}
                    </div>
                    {isMobile && (
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                                className="bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors duration-300 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &lt;
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={currentIndex === cards.length - cardsToShow}
                                className="bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors duration-300 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </div>
            </Container>
        </Section>
    )
}

export default HomePackages;