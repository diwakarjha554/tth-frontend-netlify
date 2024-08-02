'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';

const CarouselCard = () => {

    const cards = [
        { title: "Card 1", content: "Content 1" },
        { title: "Card 2", content: "Content 2" },
        { title: "Card 3", content: "Content 3" },
        { title: "Card 4", content: "Content 4" },
        { title: "Card 5", content: "Content 5" },
        // Add more cards as needed
    ];
    
    const cardsPerSlide=4

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    const isFirstSlide = currentIndex === 0;
    const isLastSlide = currentIndex === totalSlides - 1;

    const nextSlide = useCallback(() => {
        if (!isLastSlide) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    }, [isLastSlide]);

    const prevSlide = useCallback(() => {
        if (!isFirstSlide) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    }, [isFirstSlide]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isLastSlide) {
                nextSlide();
            } else {
                setCurrentIndex(0);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [nextSlide, isLastSlide]);

    const handleTouchStart = (e: any) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: any) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            nextSlide();
        }

        if (touchStart - touchEnd < -75) {
            prevSlide();
        }
    };

    return (
        <Section>
            <Container>
                <div className="relative  mx-auto overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                            <div key={slideIndex} className="w-full flex-shrink-0 flex">
                                {cards.slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide).map((card, cardIndex) => (
                                    <div key={cardIndex} className={`w-1/${cardsPerSlide} p-2`}>
                                        <div className="bg-white rounded shadow p-4">
                                            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                                            <p>{card.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={prevSlide}
                        className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow ${isFirstSlide ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={isFirstSlide}
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow ${isLastSlide ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={isLastSlide}
                    >
                        &#10095;
                    </button>
                </div>
            </Container>
        </Section>
    )
}

export default CarouselCard;