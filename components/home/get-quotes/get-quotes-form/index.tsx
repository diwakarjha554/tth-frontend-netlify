'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const GetQuotesForm = () => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        try {
            const response = await axios.post('/api/send-email', formData);
            console.log('Quote sent:', response.data);
            toast.success('Quote sent successfully');
        } catch (error) {
            console.error('Error sending quote:', error);
            toast.error('Error sending quote');
        } finally {
            setIsLoading(false);
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
                                    disabled={isLoading}
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                                    disabled={isLoading}
                                    value={formData.date}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                                    disabled={isLoading}
                                    value={formData.days}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                                    disabled={isLoading}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                                    disabled={isLoading}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                                    disabled={isLoading}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="flex justify-between space-x-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className={`w-full max-w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className={`w-full max-w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white py-2 px-4 transition duration-300 ${
                                        isStep2Valid() ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
                                    } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    disabled={!isStep2Valid()}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            submiting...
                                        </span>
                                    ) : (
                                        'Submit'
                                    )}
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
