import React from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import Menu from '@/components/navbar/lower-navbar/menu';
import Navlinks from '@/components/navbar/lower-navbar/navlinks';
import LogoFull from '@/components/ui/features/LogoFull';

const LowerNavbar = () => {
    return (
        <Section className="py-2 shadow dark:shadow-gray-500/60 bg-background">
            <Container className="w-full flex items-center justify-between gap-10">
                <LogoFull />
                <div className="flex items-center gap-5">
                    <Navlinks />
                    <Menu />
                </div>
            </Container>
        </Section>
    );
};

export default LowerNavbar;
