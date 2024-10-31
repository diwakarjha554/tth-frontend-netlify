import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import ReviewsCarousel from './reviews-carousel';

const Reviews = () => {
    return (
        <Section className='py-20'>
            <Container className='w-full'>
                <div className='w-full flex flex-col justify-center items-center gap-1 text-center'>
                    <span className="capitalize bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit text-2xl md:text-3xl font-bold">
                        Reviews & Testimonials
                    </span>
                    <span className="font-medium text-sm md:text-base lg:text-lg">From Happy, Delighted Trips, Check out what they have to say</span>
                </div>
                <ReviewsCarousel />
            </Container>
        </Section>
    );
};

export default Reviews;
