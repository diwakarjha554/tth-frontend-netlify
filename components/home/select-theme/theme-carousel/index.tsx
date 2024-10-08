'use client';

import React, { useEffect, useRef, useState } from 'react';
import CardData from '@/data/themeSelect';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import GradientIcon from '@/components/ui/features/GradientIcon';
import SwiperButtons from '@/components/ui/swiper-buttons';

const ThemeCarousel = () => {
    const cards = CardData;
    const swiperRef = useRef<SwiperType | null>(null);

    const [cardsToShow, setCardsToShow] = useState<number>(5);
    const updateCardsToShow = () => {
        if (window.innerWidth < 300) {
            setCardsToShow(1);
        } else if (window.innerWidth < 600) {
            setCardsToShow(2);
        } else if (window.innerWidth < 900) {
            setCardsToShow(3);
        } else if (window.innerWidth < 1200) {
            setCardsToShow(4);
        } else {
            setCardsToShow(5);
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
        <div className="mt-10">
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
                    <SwiperSlide key={index} className="flex-shrink-0 overflow-hidden rounded-lg">
                        <div className="flex flex-col justify-center items-center gap-2 py-2 h-[130px] bg-background hover:bg-border border-2 hover:scale-105 md:hover:scale-110 lg:hover:scale-125 transition rounded-lg cursor-pointer transform-gpu duration-500">
                            <GradientIcon icon={card.icon} size={40} />
                            <h3 className="font-medium text-center truncate w-full">{card.label}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <SwiperButtons
                swiperLeftFunction={() => swiperRef.current?.slidePrev()}
                swiperRightFunction={() => swiperRef.current?.slideNext()}
            />
        </div>
    );
};

export default ThemeCarousel;
