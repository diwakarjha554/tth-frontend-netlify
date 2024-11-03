'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const UpiDetails = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        amount: '',
        name: '',
        email: '',
        phone: '',
        paymentDetails: ''
    });

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('paymentFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // Save to localStorage
        localStorage.setItem('paymentFormData', JSON.stringify(formData));
        console.log('Form data submitted and saved:', formData);

        // Optional: Clear form after submission
        setFormData({
            amount: '',
            name: '',
            email: '',
            phone: '',
            paymentDetails: ''
        });

        // Optional: Set expiration time (e.g., 1 hour)
        const expirationTime:any = new Date().getTime() + 60 * 60 * 1000; // 1 hour
        localStorage.setItem('paymentFormExpiration', expirationTime);
        router.push('/checkout');
    };

    // Check and clear expired data
    useEffect(() => {
        const checkExpiration = () => {
            const expirationTime = localStorage.getItem('paymentFormExpiration');
            if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
                localStorage.removeItem('paymentFormData');
                localStorage.removeItem('paymentFormExpiration');
            }
        };

        checkExpiration();
        const interval = setInterval(checkExpiration, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-2 border-[0.125rem] rounded-md border-border">
            <div className={`p-12 flex flex-col gap-5`}>
                <div className={`text-violet-600 dark:text-violet-400 font-semibold text-[18px]`}>
                    <span>Scan to pay with any BHIM UPI App:</span>
                </div>
                <Image 
                    src={'/payments/upi.jpg'}
                    alt=''
                    width={200}
                    height={200}
                />
                <div className='flex flex-col gap-2 text-[16px] font-semibold'>
                    <span>
                        Merchant: Travel Trail Holidays
                    </span>
                    <span>
                        UPI ID: 9625992025@upi
                    </span>
                </div>
                <Image 
                    src={'/payments/pay.jpg'}
                    alt=''
                    width={200}
                    height={200}
                    className=' bg-blend-exclusion'
                />
            </div>
        </div>
    );
}

export default UpiDetails;