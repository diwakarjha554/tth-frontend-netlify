import Navbar from '@/components/navbar';
import React from 'react';

interface RoutesLayoutProps {
    children: React.ReactNode;
};

const RoutesLayout: React.FC<RoutesLayoutProps> = ({ children }) => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden'>
      <Navbar />
      {children}
    </main>
  )
}

export default RoutesLayout;