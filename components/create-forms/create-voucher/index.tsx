'use client';

import React, { useCallback, useState, useRef } from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import SectionHeading from '@/components/ui/section-heading';

interface ItineraryItem {
    hotelName: string;
    nights: number;
    fromDate: string;
    toDate: string;
    description: string;
}

interface VoucherFormValues {
    clientName: string;
    bookingId: string;
    hotelNo: number;
    adultNo: number;
    childrenNo: number;
    totalNights: number;
    itinary: ItineraryItem[];
    cabDetails: string;
}

const VoucherForm = () => {
    const [formValues, setFormValues] = useState<VoucherFormValues>({
        clientName: '',
        bookingId: '',
        hotelNo: 1,
        adultNo: 1,
        childrenNo: 0,
        totalNights: 1,
        itinary: [{ hotelName: '', nights: 1, fromDate: '', toDate: '', description: '' }],
        cabDetails: '',
    });

    const [touched, setTouched] = useState({
        clientName: false,
        bookingId: false,
        totalNights: false,
        hotelNo: false,
        adultNo: false,
        childrenNo: false,
        cabDetails: false,
        itinary: [{ hotelName: false, nights: false, fromDate: false, toDate: false, description: false }],
    });

    const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);

    const generateBookingId = useCallback((length: number = 8): string => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleItineraryChange = (index: number, field: keyof ItineraryItem, value: string | number) => {
        const updatedItinary = [...formValues.itinary];
        updatedItinary[index] = { ...updatedItinary[index], [field]: value };
        setFormValues((prev) => ({ ...prev, itinary: updatedItinary }));
    };

    const handleHotelNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numHotels = Math.max(1, parseInt(e.target.value) || 1);
        const totalNights = formValues.totalNights;
        const newItinary = Array(numHotels)
            .fill(null)
            .map((_, index) => ({
                hotelName: '',
                nights: index === 0 ? totalNights : 0,
                fromDate: '',
                toDate: '',
                description: '',
            }));

        let remainingNights = totalNights;
        for (let i = 0; i < numHotels - 1; i++) {
            const nights = Math.ceil(remainingNights / (numHotels - i));
            newItinary[i].nights = nights;
            remainingNights -= nights;
        }
        if (numHotels > 0) {
            newItinary[numHotels - 1].nights = remainingNights;
        }

        setFormValues((prev) => ({ ...prev, hotelNo: numHotels, itinary: newItinary }));
    };

    const handleNightChange = (index: number, value: number) => {
        const totalNights = formValues.totalNights;
        const currentItinary = [...formValues.itinary];
        const numHotels = currentItinary.length;

        value = Math.max(0, value);
        const diff = value - currentItinary[index].nights;
        currentItinary[index].nights = value;

        let remainingDiff = -diff;
        for (let i = 0; i < numHotels; i++) {
            if (i !== index) {
                const availableToReduce = Math.min(currentItinary[i].nights, remainingDiff);
                currentItinary[i].nights -= availableToReduce;
                remainingDiff -= availableToReduce;
                if (remainingDiff <= 0) break;
            }
        }

        if (remainingDiff > 0) {
            currentItinary[index].nights += remainingDiff;
        }

        const sumNights = currentItinary.reduce((sum, hotel) => sum + hotel.nights, 0);
        if (sumNights !== totalNights) {
            const lastIndex = numHotels - 1;
            currentItinary[lastIndex].nights += totalNights - sumNights;
        }

        setFormValues((prev) => ({ ...prev, itinary: currentItinary }));
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let hasError = false;

        // Check for empty fields and set touched state
        Object.keys(formValues).forEach((key) => {
            if (key === 'itinary') {
                formValues.itinary.forEach((item, index) => {
                    Object.keys(item).forEach((itineraryKey) => {
                        if (!item[itineraryKey as keyof ItineraryItem]) {
                            hasError = true;
                            setTouched((prev) => {
                                const newTouched = { ...prev };
                                newTouched.itinary[index][itineraryKey as keyof ItineraryItem] = true;
                                return newTouched;
                            });
                        }
                    });
                });
            } else if (!formValues[key as keyof VoucherFormValues] && key !== 'itinary') {
                hasError = true;
                setTouched((prev) => ({ ...prev, [key]: true }));
            }
        });

        if (hasError) {
            // Navigate to the first empty field
            const firstEmptyField = Object.keys(touched).find((key) => {
                if (key === 'itinary') {
                    return formValues.itinary.some((item) => {
                        return Object.values(item).some((value) => !value);
                    });
                }
                return !formValues[key as keyof VoucherFormValues];
            });

            if (firstEmptyField && inputRefs.current[0]) {
                const index = Object.keys(formValues).indexOf(firstEmptyField);
                inputRefs.current[index]?.focus(); // Focus on the first empty field
            }
            return;
        }

        // Generate booking ID if it's empty
        const bookingId = formValues.bookingId || generateBookingId();
        const queryParams = new URLSearchParams();

        // Add each form field to the query parameters
        queryParams.append('clientName', formValues.clientName);
        queryParams.append('bookingId', bookingId);
        queryParams.append('hotelNo', formValues.hotelNo.toString());
        queryParams.append('adultNo', formValues.adultNo.toString());
        queryParams.append('childrenNo', formValues.childrenNo.toString());
        queryParams.append('totalNights', formValues.totalNights.toString());
        queryParams.append('itinary', JSON.stringify(formValues.itinary));
        queryParams.append('cabDetails', formValues.cabDetails);

        window.open(`/view/voucher?${queryParams.toString()}`, '_blank');
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (url) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const newFormValues: Partial<VoucherFormValues> = {
                clientName: urlParams.get('clientName') || '',
                bookingId: urlParams.get('bookingId') || '',
                hotelNo: parseInt(urlParams.get('hotelNo') || '1') || 1,
                adultNo: parseInt(urlParams.get('adultNo') || '1') || 1,
                childrenNo: parseInt(urlParams.get('childrenNo') || '0') || 0,
                totalNights: parseInt(urlParams.get('totalNights') || '1') || 1,
                cabDetails: urlParams.get('cabDetails') || '',
            };

            const itinerary = JSON.parse(urlParams.get('itinary') || '[]');
            if (Array.isArray(itinerary)) {
                newFormValues.itinary = itinerary;
            }

            setFormValues((prev) => ({ ...prev, ...newFormValues }));
        }
    };

    // Function to update touched state for itinerary items
    const updateTouchedItinerary = (index: number) => {
        setTouched((prev) => {
            const newTouched = { ...prev };
            if (!newTouched.itinary[index]) {
                newTouched.itinary[index] = {
                    hotelName: false,
                    nights: false,
                    fromDate: false,
                    toDate: false,
                    description: false,
                };
            }
            return newTouched;
        });
    };

    return (
        <Section className="pt-10 pb-20">
            <Container className="w-full flex flex-col gap-10 md:px-7">
                <SectionHeading mainHeading="Create Voucher" subHeading="Fill in the details" />
                <form onSubmit={onSubmit} className="space-y-6 pb-10">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="urlInput" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Edit by URL
                            </label>
                            <input
                                type="text"
                                name="urlInput"
                                onChange={handleUrlChange}
                                placeholder="Enter URL to pre-fill form"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="clientName" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Client's Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="clientName"
                                value={formValues.clientName}
                                onChange={handleChange}
                                onBlur={() => handleBlur('clientName')}
                                placeholder="Enter client's name"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.clientName && !formValues.clientName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                                ref={(el) => { inputRefs.current[0] = el; }}
                            />
                            {touched.clientName && !formValues.clientName && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="bookingId" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Booking ID
                            </label>
                            <input
                                name="bookingId"
                                value={formValues.bookingId}
                                onChange={handleChange}
                                onBlur={() => handleBlur('bookingId')}
                                placeholder="Booking ID (leave blank for auto-generation)"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.bookingId && !formValues.bookingId ? 'border-red-500' : 'border-gray-300'
                                }`}
                                ref={(el) => { inputRefs.current[1] = el; }}
                            />
                            {touched.bookingId && !formValues.bookingId && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="totalNights" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Total Nights <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="totalNights"
                                value={formValues.totalNights}
                                onChange={(e) => {
                                    const value = Math.max(1, parseInt(e.target.value) || 1);
                                    setFormValues((prev) => ({ ...prev, totalNights: value }));
                                    handleHotelNoChange({
                                        target: { value: formValues.hotelNo.toString() },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                }}
                                onBlur={() => handleBlur('totalNights')}
                                placeholder="Enter total nights"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.totalNights && !formValues.totalNights ? 'border-red-500' : 'border-gray-300'
                                }`}
                                ref={(el) => { inputRefs.current[2] = el; }}
                            />
                            {touched.totalNights && !formValues.totalNights && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="hotelNo" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Hotel's No <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="hotelNo"
                                value={formValues.hotelNo}
                                onChange={handleHotelNoChange}
                                onBlur={() => handleBlur('hotelNo')}
                                placeholder="Enter number of hotels"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.hotelNo && !formValues.hotelNo ? 'border-red-500' : 'border-gray-300'
                                }`}
                                ref={(el) => { inputRefs.current[3] = el; }}
                            />
                            {touched.hotelNo && !formValues.hotelNo && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="adultNo" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Adults <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="adultNo"
                                value={formValues.adultNo}
                                onChange={handleChange}
                                onBlur={() => handleBlur('adultNo')}
                                placeholder="Enter number of adults"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.adultNo && !formValues.adultNo ? 'border-red-500' : 'border-gray-300'
                                }`}
                                min={1}
                                ref={(el) => { inputRefs.current[4] = el; }}
                            />
                            {touched.adultNo && !formValues.adultNo && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="childrenNo" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Children
                            </label>
                            <input
                                type="number"
                                name="childrenNo"
                                value={formValues.childrenNo}
                                onChange={handleChange}
                                onBlur={() => handleBlur('childrenNo')}
                                placeholder="Enter number of children"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.childrenNo && !formValues.childrenNo ? 'border-red-500' : 'border-gray-300'
                                }`}
                                min={0}
                                ref={(el) => { inputRefs.current[5] = el; }}
                            />
                            {touched.childrenNo && !formValues.childrenNo && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                        <ul className="flex flex-col gap-8">
                            {formValues.itinary.map((item, index) => (
                                <li key={index} className="flex flex-col gap-2">
                                    <div>
                                        <label htmlFor={`itinary.${index}.hotelName`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Hotel's Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name={`itinary.${index}.hotelName`}
                                            value={item.hotelName}
                                            onChange={(e) => handleItineraryChange(index, 'hotelName', e.target.value)}
                                            onBlur={() => {
                                                handleBlur(`itinary.${index}.hotelName`);
                                                updateTouchedItinerary(index); // Update touched state
                                            }}
                                            placeholder="Enter hotel's name"
                                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                                touched.itinary[index]?.hotelName && !item.hotelName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            required
                                            ref={(el) => { inputRefs.current[6 + index] = el; }}
                                        />
                                        {touched.itinary[index]?.hotelName && !item.hotelName && (
                                            <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor={`itinary.${index}.nights`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Nights <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name={`itinary.${index}.nights`}
                                            value={item.nights}
                                            onChange={(e) => handleNightChange(index, parseInt(e.target.value) || 0)}
                                            onBlur={() => handleBlur(`itinary.${index}.nights`)}
                                            placeholder="Enter number of nights"
                                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                                touched.itinary[index]?.nights && item.nights <= 0 ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            min={0}
                                            ref={(el) => { inputRefs.current[6 + index + 1] = el; }}
                                        />
                                        {touched.itinary[index]?.nights && item.nights <= 0 && (
                                            <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor={`itinary.${index}.fromDate`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Check-in <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name={`itinary.${index}.fromDate`}
                                            value={item.fromDate}
                                            onChange={(e) => handleItineraryChange(index, 'fromDate', e.target.value)}
                                            onBlur={() => handleBlur(`itinary.${index}.fromDate`)}
                                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                                touched.itinary[index]?.fromDate && !item.fromDate ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            required
                                            ref={(el) => { inputRefs.current[6 + index + 2] = el; }}
                                        />
                                        {touched.itinary[index]?.fromDate && !item.fromDate && (
                                            <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor={`itinary.${index}.toDate`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Check-out <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name={`itinary.${index}.toDate`}
                                            value={item.toDate}
                                            onChange={(e) => handleItineraryChange(index, 'toDate', e.target.value)}
                                            onBlur={() => handleBlur(`itinary.${index}.toDate`)}
                                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                                touched.itinary[index]?.toDate && !item.toDate ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            required
                                            ref={(el) => { inputRefs.current[6 + index + 3] = el; }}
                                        />
                                        {touched.itinary[index]?.toDate && !item.toDate && (
                                            <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor={`itinary.${index}.description`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name={`itinary.${index}.description`}
                                            value={item.description}
                                            onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                                            onBlur={() => handleBlur(`itinary.${index}.description`)}
                                            placeholder="Enter description"
                                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                                touched.itinary[index]?.description && !item.description ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            required
                                            rows={4}
                                            ref={(el) => { inputRefs.current[6 + index + 4] = el; }}
                                        />
                                        {touched.itinary[index]?.description && !item.description && (
                                            <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <label htmlFor="cabDetails" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Cab Details <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="cabDetails"
                                value={formValues.cabDetails}
                                onChange={handleChange}
                                onBlur={() => handleBlur('cabDetails')}
                                placeholder="Enter cab details"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.cabDetails && !formValues.cabDetails ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                                ref={(el) => { inputRefs.current[6 + formValues.itinary.length + 5] = el; }}
                            />
                            {touched.cabDetails && !formValues.cabDetails && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="py-5 px-10 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full lg:w-fit text-center text-white hover:scale-105 transition-all duration-300"
                        >
                            Generate PDF
                        </button>
                    </div>
                </form>
            </Container>
        </Section>
    );
};

export default VoucherForm;