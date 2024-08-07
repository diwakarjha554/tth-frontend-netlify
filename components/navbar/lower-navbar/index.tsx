import React from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import Logo from '@/components/ui/features/Logo';
import Menu from '@/components/navbar/lower-navbar/menu';
import Navlinks from '@/components/navbar/lower-navbar/navlinks';

const LowerNavbar = () => {
    return (
        <Section className="py-2 shadow dark:shadow-gray-500/60 bg-background">
            <Container className="w-full flex justify-center items-center md:justify-between">
                <Logo className="" />
                <div className="hidden md:flex items-center gap-5">
                    <Navlinks />
                    <Menu />
                </div>
            </Container>
        </Section>
    );
};

export default LowerNavbar;
