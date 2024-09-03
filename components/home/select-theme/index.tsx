import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import ThemeCarousel from './theme-carousel';
import SectionHeading from '@/components/ui/section-heading';

const SelectTheme = () => {
    return (
        <Section className="bg-gray-50 dark:bg-[#111111] py-20">
            <Container className="w-full">
                <SectionHeading mainHeading='Select Theme' subHeading='Browse packages through THEMES'/>
                <ThemeCarousel />
            </Container>
        </Section>
    );
};

export default SelectTheme;
