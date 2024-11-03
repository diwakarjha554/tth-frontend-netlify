'use client';

// PaymentSummary.tsx
import React from 'react';
import { usePaymentData } from '@/frontend/hooks/usePaymentData';
import Section from '@/components/features/Section';
import Container from '@/components/features/Container';

// Define the structure of our payment data (same as in the hook)
interface PaymentData {
    amount: string;
    name: string;
    email: string;
    phone: string;
    paymentDetails: string;
}

// Define our functional component
const CheckoutPage: React.FC = () => {
    // Use our custom hook to get the payment data
    const paymentData: PaymentData | null = usePaymentData();

    // If there's no payment data, render a message
    if (!paymentData) {
        return <div className='mt-40'>No payment data available.</div>;
    }

    // If we have payment data, render the summary
    return (
        <Section className='my-28'>
            <Container className='w-full border-2 rounded p-5 flex flex-col gap-2'>
                <h2 className='text-2xl font-semibold'>
                    Payment Summary
                </h2>
                <div className='mt-5 relative'>
                    <p className='absolute top-1/2 -translate-y-1/2 ml-2'>
                        Amount:
                    </p>
                    <input
                        type="number"
                        value={paymentData.amount}
                        className='border rounded py-3 pl-24 focus:outline-none w-full'
                        required
                    />
                </div>
                <div className='mt-5 relative'>
                    <p className='absolute top-1/2 -translate-y-1/2 ml-2'>
                        Name:
                    </p>
                    <input
                        type="text"
                        value={paymentData.name}
                        className='border rounded py-3 pl-24 focus:outline-none w-full'
                        required
                    />
                </div>
                <div className='mt-5 relative'>
                    <p className='absolute top-1/2 -translate-y-1/2 ml-2'>
                        Email:
                    </p>
                    <input
                        type="text"
                        value={paymentData.email}
                        className='border rounded py-3 pl-24 focus:outline-none w-full'
                        required
                    />
                </div>
                <div className='mt-5 relative'>
                    <p className='absolute top-1/2 -translate-y-1/2 ml-2'>
                        Phone No:
                    </p>
                    <input
                        type="number"
                        value={paymentData.phone}
                        className='border rounded py-3 pl-24 focus:outline-none w-full'
                        required
                    />
                </div>
                <div className='mt-5 relative'>
                    <p className='absolute m-2'>
                        Payment Details:
                    </p>
                    <textarea
                        value={paymentData.paymentDetails}
                        className='border rounded pt-10 pl-24 focus:outline-none w-full'
                        required
                    />
                </div>
                <button className='py-3 px-5 w-fit bg-custom-clp rounded font-semibold'>
                        Pay Now
                    </button>
            </Container>
        </Section>
    );
};

export default CheckoutPage;