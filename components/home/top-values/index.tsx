import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import ValuesCard from './values-card';
import { FaPersonWalkingLuggage } from 'react-icons/fa6';
import { MdOutlineSentimentVerySatisfied, MdTravelExplore } from 'react-icons/md';
import SectionHeading from '@/components/ui/section-heading';

const TopValues = () => {
    const values = [
        {
            title: "Top Travel Destinations",
            description: "Discover India's beauty with us: the Himalayas of Himachal, vibrant Rajasthan, Kerala's backwaters, and Ladakh's high passes. Enjoy diverse landscapes, ancient temples, delicious cuisine, and warm hospitality.",
            icon: MdTravelExplore,
        },
        {
            title: "Affordable Travel Deals",
            description: "Explore India's wonders affordably with our curated budget packages. Enjoy rich culture, diverse landscapes, and top attractions without compromising on quality or value for your money.",
            icon: FaPersonWalkingLuggage,
        },
        {
            title: "Promise of Satisfaction",
            description: "Your satisfaction matters most to us. We aim to provide amazing travel experiences that surpass your expectations, ensuring every moment of your journey is memorable. Let us design your ideal trip.",
            icon: MdOutlineSentimentVerySatisfied,
        },
    ];

    return (
        <Section className="bg-gray-50 dark:bg-[#111111] py-20">
            <Container className="w-full">
                <SectionHeading mainHeading='What We Serve' subHeading='Top Values For You !'/>
                <div className="mt-10 flex flex-wrap md:flex-nowrap gap-5 justify-center">
                    {values.map((value, index) => (
                        <ValuesCard 
                            key={index} 
                            title={value.title} 
                            description={value.description} 
                            icon={value.icon} 
                        /> 
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default TopValues;
