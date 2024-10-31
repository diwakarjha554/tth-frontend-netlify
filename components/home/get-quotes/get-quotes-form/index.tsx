'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const GetQuotesForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        destination: '',
        date: '',
        days: '',
        name: '',
        email: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/send-email', formData);
            console.log('Email sent:', response.data);
            toast.success('Email sent successfully');
            // You can add a success message or reset the form here
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Error sending email');
            // You can add an error message for the user here
        }
    };

    const pageVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        }),
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.3,
    };

    const isStep1Valid = () => {
        return formData.destination && formData.date && formData.days;
    };

    const isStep2Valid = () => {
        return formData.name && formData.email && formData.phone;
    };

    return (
        <div className="w-full max-w-[650px] xl:max-w-[500px] border bg-white dark:bg-black rounded overflow-hidden">
            <div className="p-6 relative">
                <AnimatePresence initial={false} mode="wait" custom={step === 1 ? -1 : 1}>
                    {step === 1 ? (
                        <motion.form
                            key="step1"
                            custom={-1}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={pageVariants}
                            transition={pageTransition}
                            onSubmit={handleNext}
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="destination" className="block text-sm font-medium mb-1">
                                    Destination
                                </label>
                                <input
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                    placeholder="Enter your destination"
                                />
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                    placeholder="Select a date"
                                />
                            </div>
                            <div>
                                <label htmlFor="days" className="block text-sm font-medium mb-1">
                                    Number of Days
                                </label>
                                <input
                                    type="number"
                                    id="days"
                                    name="days"
                                    value={formData.days}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                    min="1"
                                    placeholder="Enter number of days"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className={`py-2 px-5 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-fit text-center text-white transition-all duration-300 ${
                                        isStep1Valid() ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
                                    }`}
                                    disabled={!isStep1Valid()}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="step2"
                            custom={1}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={pageVariants}
                            transition={pageTransition}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="flex justify-between space-x-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="w-full max-w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className={`w-full max-w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white py-2 px-4 transition duration-300 ${
                                        isStep2Valid() ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
                                    }`}
                                    disabled={!isStep2Valid()}
                                >
                                    Submit
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GetQuotesForm;
