'use client'

import React, { useState, useEffect } from 'react';
import  CardData  from '@/data/themeSelect';
import GradientIcon from '@/components/ui/features/GradientIcon';

const ThemeCarousel = () => {

  const cards = CardData;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsToShow, setCardsToShow] = useState<number>(5);

  useEffect(() => {
    const handleResize = () => {
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
    <div className="w-full max-w-[1550px] mx-auto relative">
      <div className="overflow-hidden mb-10">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
          }}
        >
          {cards.map((card, index) => (
            <div key={index} className="flex-shrink-0 px-1 sm:px-2 md:px-3 lg:px-4" style={{ width: `${100 / cardsToShow}%` }}>
              <div className="flex flex-col justify-center items-center gap-2 py-2 h-[170px] bg-background hover:bg-border border-2 hover:scale-105 md:hover:scale-110 transition rounded overflow-hidden cursor-pointer">
                <GradientIcon icon={card.icon} size={40}/>
                <h3 className="font-medium text-center truncate w-full">{card.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2">
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
    </div>
  );
};

export default ThemeCarousel;