import Footer from '@/components/footer';
import FooterBar from '@/components/footer/footer-bar';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import NavbarMarginLayout from '@/components/ui/navbar-margin-layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <NavbarMarginLayout>
            <main className="flex flex-col items-center justify-start w-full overflow-x-hidden">
                <Section className="py-10">
                    <Container className="w-full flex flex-col justify-center items-center">
                        <Image
                            src={`/not-found/df.png`}
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-[350px] h-full"
                            priority
                        />
                        <div className="flex flex-col gap-1 text-center mt-5">
                            <span className="text-3xl font-bold">Oops!!! Page not found!</span>
                            <span className="text-xl">
                                We can&apos;t seem to find the page you&apos;re looking for.
                            </span>
                        </div>
                        <div className="mt-5 flex flex-col gap-3 justify-center items-center">
                            <span>Here are some helpful links instead:</span>
                            <div className="flex flex-wrap gap-5 justify-center items-center">
                                <Link
                                    href="/"
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white py-2 px-3"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/packages"
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white py-2 px-3"
                                >
                                    Packages
                                </Link>
                                <Link
                                    href="/about-us"
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white py-2 px-3"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white py-2 px-3"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href="/payments"
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white py-2 px-3"
                                >
                                    Payments
                                </Link>
                            </div>
                        </div>
                    </Container>
                </Section>
                <FooterBar />
                <Footer />
            </main>
        </NavbarMarginLayout>
    );
};

export default NotFound;
