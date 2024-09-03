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

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth < 500) {
                setCardsToShow(1);
            } else if (window.innerWidth < 900) {
                setCardsToShow(2);
            } else if (window.innerWidth < 1500) {
                setCardsToShow(3);
            } else {
                setCardsToShow(4);
            }
        };

        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => {
            window.removeEventListener('resize', updateCardsToShow);
        };
    }, []);

    return (
        <Section className="py-20">
            <Container className="w-full">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit text-lg">
                            Featured tours
                        </h1>
                        <h1 className="font-semibold text-xl">Most Favorite Tour Packages</h1>
                    </div>
                    <Link
                        href="/packages"
                        className="flex items-center gap-[2px] text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl hover:scale-105 transition-all ease-in-out duration-500 h-10 min-w-24 justify-center"
                    >
                        <span className="font-medium text-sm">View All</span>
                        <FiArrowRight />
                    </Link>
                </div>
                <div className="flex items-center justify-between mt-10">
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
                            <SwiperSlide key={index} className="flex-shrink-0 overflow-hidden">
                                <PackageCard />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex justify-center gap-4 mt-10">
                    <button
                        className="p-3 transition-colors bg-purple-500/[0.6] dark:bg-purple-500/[0.3] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-purple-500/[0.8] dark:hover:bg-purple-500/[0.5]"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <FiChevronLeft size={24} strokeWidth={3} />
                    </button>
                    <button
                        className="p-3 transition-colors bg-purple-500/[0.6] dark:bg-purple-500/[0.3] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-purple-500/[0.8] dark:hover:bg-purple-500/[0.5]"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <FiChevronRight size={24} strokeWidth={3} />
                    </button>
                </div>
            </Container>
        </Section>
    );
};

export default HomePackages;
