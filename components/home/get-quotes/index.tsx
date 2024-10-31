import Container from '@/components/ui/features/Container';
import GradientIcon from '@/components/ui/features/GradientIcon';
import Section from '@/components/ui/features/Section';
import React from 'react';
import { MdOutlineSupportAgent } from 'react-icons/md';
import GetQuotesForm from './get-quotes-form';

const GetQuotes = () => {
    return (
        <Section className="bg-gray-50 dark:bg-[#111111] py-20">
            <Container className='w-full flex justify-around items-center flex-wrap gap-10'>
                <div className="flex flex-col gap-2 items-center lg:mb-5 max-w-[650px] text-center">
                    <GradientIcon icon={MdOutlineSupportAgent} size={100}/>
                    <span className='text-2xl md:text-3xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>Our experts would love to help you plan your next trip!</span>
                    <span className='mt-1 font-semibold flex items-center'>Fill in your requirements here &gt;</span>
                </div>
                <GetQuotesForm />
            </Container>
        </Section>
    );
};

export default GetQuotes;
