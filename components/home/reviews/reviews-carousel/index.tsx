'use client';

import React, { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ReviewsData } from '@/data/reviewsData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReviewsCard from '../reviews-card';
import SwiperButtons from '@/components/ui/swiper-buttons';

const ReviewsCarousel = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="w-full mt-16">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                modules={[Navigation]}
                className="custom-swiper"
            >
                {ReviewsData.map((card, index) => (
                    <SwiperSlide key={index} className="flex-shrink-0 overflow-hidden">
                        <ReviewsCard {...card} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <SwiperButtons
                swiperLeftFunction={() => swiperRef.current?.slidePrev()}
                swiperRightFunction={() => swiperRef.current?.slideNext()}
                margin={0}
            />
        </div>
    );
};

export default ReviewsCarousel;
