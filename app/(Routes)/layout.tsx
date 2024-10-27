import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import NavbarMarginLayout from '@/components/ui/navbar-margin-layout';
import React from 'react';

interface RoutesLayoutProps {
    children: React.ReactNode;
}

const RoutesLayout: React.FC<RoutesLayoutProps> = ({ children }) => {
    return (
        <NavbarMarginLayout>
            <main className='flex flex-col items-center justify-start w-full overflow-x-hidden'>
                {children}
                <Footer />
            </main>
        </NavbarMarginLayout>
    );
};

export default RoutesLayout;
