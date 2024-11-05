import React from 'react';
import Section from '../ui/features/Section';
import Container from '../ui/features/Container';
import LogoFull from '../ui/features/LogoFull';
import SocialBtns from './social-btns';
import Link from 'next/link';
import QuickLinksFooter from './quick-links';
import GetInTouchFooter from './get-in-touch';
import LegalFooter from './legal';

const Footer = () => {
    return (
        <Section className="pt-7 pb-12 md:pb-7 border-t-[1px]">
            <Container className='w-full flex flex-col gap-5'>
                <div className="w-full flex flex-col gap-5 sm:flex-row items-center justify-between">
                    <LogoFull />
                    <SocialBtns />
                </div>
                <div className='w-full border-b-[1px]'></div>
                <div className='py-2 dark:border-gray-800 flex flex-col gap-10 sm:px-10'>
                    <div className='flex gap-10 flex-wrap justify-between'>
                        <QuickLinksFooter />
                        <LegalFooter />
                        <GetInTouchFooter />
                    </div>
                </div>
                <div className='w-full border-b-[1px]'></div>
                <div className='w-full flex justify-between flex-col text-center md:flex-row items-center gap-2 font-medium'>
                    <span className={``}>Copyright © 2024 <Link href={`/`} className={`hover:underline`}>Travel Trail Holidays</Link>. All Rights Reserved.</span>
                    <span className={``}>
                        <span>Designed with <span className={`text-red-500 text-lg select-none`}>&#x2665;</span> by <Link href={`https://diwakarjha.vercel.app/`} target="_blank" className={`text-custom-clp hover:underline font-semibold text-violet-600 dark:text-violet-400`}>Diwakar Jha</Link>.</span>
                    </span>
                </div>
            </Container>
        </Section>
    );
};

export default Footer;
