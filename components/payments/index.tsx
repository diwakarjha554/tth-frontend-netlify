import React from 'react';
import PaymentsHeroSection from './hero-section';
import Container from '../ui/features/Container';
import PaymentUpi from './payment-upi';
import PaymentGateway from './payment-gateway';
import PaymentsAccordion from './payment-accordion';
import { FaPhoneAlt } from 'react-icons/fa';

const Payments = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden">
            <PaymentsHeroSection />
            <Container className={`px-3 md:px-5 w-[99%] mt-24`}>
                <div className={`flex justify-between flex-col md:flex-row gap-10`}>
                    <div className={`w-full`}>
                        <div>
                            <span className={`font-semibold text-lg`}>Select the desired payment option</span>
                        </div>
                        <div className="mt-5 flex flex-col gap-5">
                            <PaymentsAccordion />
                            <PaymentUpi />
                            <PaymentGateway />
                        </div>
                    </div>

                    <div className={`rounded-md bg-border p-10 max-w-[450px] w-full h-auto md:h-[310px]`}>
                        <div>
                            <div className={`text-violet-600 dark:text-violet-400 font-semibold text-xl`}>
                                <span>Get Help</span>
                            </div>
                            <div className={`font-semibold text-3xl mt-3`}>
                                <span>Have Any Query ?</span>
                            </div>
                            <div className={`text-[15px] mt-5`}>
                                <div>Need help with any payment related issue? Please feel free to contact us!</div>
                            </div>
                            <div className={`text-[15px] mt-5`}>
                                <div className={`flex items-center gap-5 flex-wrap`}>
                                    <div
                                        className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full w-16 h-16 flex justify-center items-center text-custom-txd`}
                                    >
                                        <FaPhoneAlt size={24} />
                                    </div>
                                    <div>
                                        <div>
                                            <span className={`font-semibold text-base`}>Call Us</span>
                                        </div>
                                        <div>
                                            <span className={`font-semibold text-lg`}>+91 9625992025</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`text-violet-600 dark:text-violet-400 w-full flex justify-center py-20 px-2 text-center`}
                >
                    <div>
                        Please kindly provide a screenshot confirming your successful payment. Your cooperation is
                        greatly appreciated.
                    </div>
                </div>
            </Container>
        </main>
    );
};

export default Payments;
