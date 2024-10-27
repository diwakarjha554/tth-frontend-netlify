'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperButtons from '@/components/ui/swiper-buttons';
import ThemePage, { ThemePageSkeleton } from './theme-page';
import { CardData, getCards } from '@/actions/themeSelect';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const ThemeCarousel = () => {
    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true);
                const fetchedCards = await getCards();
                setCards(fetchedCards);
            } catch (error) {
                console.error('Error fetching themes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
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
                {loading
                    ? Array(cardsToShow).fill(0).map((_, index) => (
                        <SwiperSlide key={`skeleton-${index}`} className="flex-shrink-0 overflow-hidden rounded-lg">
                            <ThemePageSkeleton />
                        </SwiperSlide>
                    ))
                    : cards.map((card) => {
                        const IconComponent = (LucideIcons as any)[card.icon] as LucideIcon;
                        return (
                            <SwiperSlide key={card.id} className="flex-shrink-0 overflow-hidden rounded-lg">
                                <ThemePage icon={IconComponent} label={card.label} />
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>
            <SwiperButtons
                swiperLeftFunction={() => swiperRef.current?.slidePrev()}
                swiperRightFunction={() => swiperRef.current?.slideNext()}
            />
        </div>
    );
};

export default ThemeCarousel;
