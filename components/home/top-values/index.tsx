import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import ValuesCard from './values-card';

const TopValues = () => {
    return (
        <Section className="bg-gray-50 dark:bg-[#111111] py-20">
            <Container className="w-full">
                <div>
                    <h1 className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit">
                        What We Serve
                    </h1>
                    <h1 className="font-semibold text-lg">Top Values For You !</h1>
                </div>
                <div className="mt-10 flex flex-wrap md:flex-nowrap gap-5 justify-center">
                    <ValuesCard />
                    <ValuesCard />
                    <ValuesCard />
                </div>
            </Container>
        </Section>
    );
};

export default TopValues;
