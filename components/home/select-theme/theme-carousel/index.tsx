'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';

interface CardData {
  image: string;
  heading: string;
}

interface ThemeCarouselProps {
  cards: CardData[];
}

const ThemeCarousel: React.FC<ThemeCarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsToShow, setCardsToShow] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setCardsToShow(1);
      } else if (window.innerWidth <= 900) {
        setCardsToShow(2);
      } else if (window.innerWidth <= 1200) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
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
    <Section>
      <Container className={`${styles.carouselContainer} flex flex-col gap-10 items-center`}>
        <div className={styles.carouselWrapper}>
          <div
            className={styles.carousel}
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {cards.map((card, index) => (
              <div key={index} className={styles.card} style={{ width: `${100 / cardsToShow}%` }}>
                <div className={`flex items-center justify-center flex-col bg-background border-2 overflow-hidden h-80 py-2 px-5 rounded`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={card.image}
                      alt={card.heading}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className={styles.cardHeading}>{card.heading}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex gap-5'>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`${styles.carouselButton} ${styles.prevButton}`}
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === cards.length - cardsToShow}
            className={`${styles.carouselButton} ${styles.nextButton}`}
          >
            &gt;
          </button>
        </div>
      </Container>
    </Section>
  );
};

export default ThemeCarousel;