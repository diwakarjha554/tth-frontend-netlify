<<<<<<< HEAD
'use client';

import React, { useEffect, useRef, useState } from 'react';
import PackageCard from '@/components/packages/package-card';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import CardData from '@/data/themeSelect';
import Link from 'next/link';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const HomePackages = () => {
    const cards = CardData;
    const swiperRef = useRef<SwiperType | null>(null);

    const [cardsToShow, setCardsToShow] = useState<number>(3);
    const updateCardsToShow = () => {
        if (window.innerWidth < 300) {
            setCardsToShow(1);
        } else if (window.innerWidth < 600) {
            setCardsToShow(2);
        } else {
            setCardsToShow(3);
        }
    };

    useEffect(() => {
        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => {
            window.removeEventListener('resize', updateCardsToShow);
        };
    }, []);

    return (
        <Section className="py-20">
            <Container className="w-full">
                <div className="w-full flex flex-col items-center gap-1 text-center mb-10">
                    <h1 className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit text-lg">
                        Featured tours
                    </h1>
                    <h1 className="font-semibold text-xl">Most Favorite Tour Packages</h1>
                </div>
                <div className="flex items-center justify-between gap-10">
                    <button
                        className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 md:flex items-center justify-center text-xl duration-300 hover:bg-opacity-90 hidden"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <Swiper
                        slidesPerView={cardsToShow}
                        spaceBetween={30}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation]}
                        className="custom-swiper"
                    >
                        {cards.map((card, index) => (
                            <SwiperSlide key={index} className="flex-shrink-0 overflow-hidden rounded border">
                                <PackageCard />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button
                        className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 md:flex items-center justify-center text-xl duration-300 hover:bg-opacity-90 hidden"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
                <div className="flex justify-center gap-4 mt-7 md:hidden">
                    <button
                        className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <button
                        className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
                <div className="w-full flex items-center justify-center mt-10 lg:mt-20">
                    <Link
                        href="/packages"
                        className="flex items-center gap-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 px-5 sm:px-7 rounded hover:scale-110 transition-all ease-in-out duration-500"
                    >
                        <span className="font-medium text-xs sm:text-base">View All Packages</span>
                        <FiArrowRight />
                    </Link>
                </div>
            </Container>
        </Section>
    );
};

export default HomePackages;
=======
'use client';

import React, { useEffect, useRef, useState } from 'react';
import PackageCard from '@/components/packages/package-card';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import CardData from '@/data/themeSelect';
import Link from 'next/link';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const HomePackages = () => {
    const cards = CardData;
    const swiperRef = useRef<SwiperType | null>(null);

    const [cardsToShow, setCardsToShow] = useState<number>(3);
    const updateCardsToShow = () => {
        if (window.innerWidth < 300) {
            setCardsToShow(1);
        } else if (window.innerWidth < 600) {
            setCardsToShow(2);
        } else {
            setCardsToShow(3);
        }
    };

    useEffect(() => {
        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => {
            window.removeEventListener('resize', updateCardsToShow);
        };
    }, []);

    return (
        <Section className="py-20">
            <Container className="w-full">
                <div className="w-full flex flex-col items-center gap-1 text-center mb-10">
                    <h1 className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit text-lg">
                        Featured tours
                    </h1>
                    <h1 className="font-semibold text-xl">Most Favorite Tour Packages</h1>
                </div>
                <div className="flex items-center justify-between gap-10">
                    <button
                        className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 md:flex items-center justify-center text-xl duration-300 hover:bg-opacity-90 hidden"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <Swiper
                        slidesPerView={cardsToShow}
                        spaceBetween={30}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation]}
                        className="custom-swiper"
                    >
                        {cards.map((card, index) => (
                            <SwiperSlide key={index} className="flex-shrink-0 overflow-hidden rounded">
                                <PackageCard />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button
                        className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 md:flex items-center justify-center text-xl duration-300 hover:bg-opacity-90 hidden"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
                <div className="flex justify-center gap-4 mt-7 md:hidden">
                    <button
                        className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <button
                        className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
                <div className="w-full flex items-center justify-center mt-10 lg:mt-20">
                    <Link
                        href="/packages"
                        className="flex items-center gap-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 px-5 sm:px-7 rounded hover:scale-110 transition-all ease-in-out duration-500"
                    >
                        <span className="font-medium text-xs sm:text-base">View All Packages</span>
                        <FiArrowRight />
                    </Link>
                </div>
            </Container>
        </Section>
    );
};

export default HomePackages;
>>>>>>> 2aa6a9046d4f547693f75125295e3b64f240be2a
