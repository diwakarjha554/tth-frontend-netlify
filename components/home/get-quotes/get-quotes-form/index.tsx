'use client';

import React, { useState } from 'react';
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

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStep1Valid()) {
            setStep(2);
        }
    };

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        setStep(1);
        if (isLoading) {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            destination: '',
            date: '',
            days: '',
            name: '',
            email: '',
            phone: '',
        });
        setStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isStep2Valid() || isLoading) return;
        
        setIsLoading(true);
        
        // Create a copy of the form data before resetting
        const submittedData = { ...formData };
        
        // Show initial loading toast
        toast.loading('Processing your request...', { duration: 3000 });
        
        try {
            // Reset form immediately for better UX
            resetForm();
            
            // Make API call with increased timeout
            const response = await axios.post('/api/send-email', submittedData, {
                timeout: 30000, // 30 seconds timeout
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.status === 200) {
                toast.success('Quote request sent successfully!');
            } else {
                throw new Error('Server responded with an error');
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Handle different types of errors
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    toast.error('Request timed out. Our team will contact you soon.');
                } else if (error.response) {
                    toast.error('Server error. Please try again later.');
                } else if (error.request) {
                    toast.error('Network error. Please check your connection.');
                } else {
                    toast.error('An unexpected error occurred.');
                }
            } else {
                toast.error('Failed to send request. Please try again.');
            }
            
            // Store failed submission in localStorage for retry
            try {
                const failedSubmissions = JSON.parse(localStorage.getItem('failedSubmissions') || '[]');
                failedSubmissions.push({
                    data: submittedData,
                    timestamp: new Date().toISOString(),
                });
                localStorage.setItem('failedSubmissions', JSON.stringify(failedSubmissions));
            } catch (storageError) {
                console.error('Error storing failed submission:', storageError);
            }
            
        } finally {
            setIsLoading(false);
        }
    };

    const isStep1Valid = () => {
        return Boolean(formData.destination && formData.date && formData.days);
    };

    const isStep2Valid = () => {
        return Boolean(formData.name && formData.email && formData.phone);
    };

    return (
        <div className="w-full max-w-[650px] xl:max-w-[500px] border bg-white dark:bg-black rounded overflow-hidden">
            <div className="p-6 relative">
                {step === 1 ? (
                    <form onSubmit={handleNext} className="space-y-4">
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
                                disabled={!isStep1Valid() || isLoading}
                            >
                                Next
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                className="w-full max-w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className={`w-full max-w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white py-2 px-4 transition duration-300 ${
                                    isStep2Valid() && !isLoading ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
                                }`}
                                disabled={!isStep2Valid() || isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default GetQuotesForm;