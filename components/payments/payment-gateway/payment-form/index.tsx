'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const PaymentForm = () => {

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
            <div className={`p-12`}>
                <div className={`text-violet-600 dark:text-violet-400 font-semibold text-[18px]`}>
                    <span>Fill the below details and proceed for the payment:</span>
                </div>
                <form onSubmit={handleSubmit} className={`text-[17px] mt-5 flex flex-col gap-2`}>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className='border rounded p-3 focus:outline-none'
                        placeholder='Amount'
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='border rounded p-3 focus:outline-none'
                        placeholder='Name'
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='border rounded p-3 focus:outline-none'
                        placeholder='Email'
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className='border rounded p-3 focus:outline-none'
                        placeholder='Phone No'
                    />
                    <textarea
                        name="paymentDetails"
                        value={formData.paymentDetails}
                        onChange={handleChange}
                        className='border rounded p-3 focus:outline-none min-h-[140px] resize-none'
                        placeholder='Payment Details'
                        required
                    />
                    <button type="submit" className='py-3 px-5 w-fit bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-semibold text-white hover:bg-custom-clp/90'>
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PaymentForm;