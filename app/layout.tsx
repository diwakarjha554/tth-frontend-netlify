import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/ui/theme/providers';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { GoogleTagManager } from '@next/third-parties/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: {
        default: 'Travel Trail Holidays',
        template: '%s',
    },
    description:
        'Crafting unforgettable travel experiences. We take care of the details, so you can focus on making memories.',
    icons: {
        icon: '/icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={montserrat.className}>
                <NextTopLoader color="#98FF98" height={3} showSpinner={false} />
                <SessionProvider>
                    <Providers>
                        {children}
                        <Toaster />
                    </Providers>
                </SessionProvider>
                <GoogleTagManager gtmId="GTM-MP378SLG" />
            </body>
        </html>
    );
}
