import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/ui/theme/providers';
import { Toaster } from 'react-hot-toast';

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

export function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    try {
                        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                            document.documentElement.classList.add('dark');
                        } else {
                            document.documentElement.classList.remove('dark');
                        }
                    } catch (_) {}
                `,
            }}
        />
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ThemeScript />
            </head>
            <body className={montserrat.className}>
                <Providers>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
