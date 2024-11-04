'use client';

import React, { useCallback, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import SectionHeading from '@/components/ui/section-heading';

interface VoucherFormValues {
    clientName: string;
    bookingId: string;
    hotelNo: number;
    adultNo: number;
    childrenNo: number;
    totalNights: number;
    itinary: Array<{
        hotelName: string;
        nights: number;
        fromDate: string;
        toDate: string;
        description: string;
    }>;
    cabDetails: string;
}

const VoucherForm = () => {
    const generateBookingId = useCallback((length: number = 8): string => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    }, []);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<VoucherFormValues>({
        defaultValues: {
            clientName: '',
            bookingId: '',
            hotelNo: 1,
            adultNo: 1,
            childrenNo: 0,
            totalNights: 1,
            itinary: [{ hotelName: '', nights: 1, fromDate: '', toDate: '', description: '' }],
            cabDetails: '',
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'itinary',
    });

    const onSubmit = useCallback(
        (data: VoucherFormValues) => {
            const bookingId = data.bookingId || generateBookingId();
            const queryParams = new URLSearchParams();

            queryParams.append('clientName', data.clientName);
            queryParams.append('bookingId', bookingId);
            queryParams.append('hotelNo', data.hotelNo.toString());
            queryParams.append('adultNo', data.adultNo.toString());
            queryParams.append('childrenNo', data.childrenNo.toString());
            queryParams.append('totalNights', data.totalNights.toString());
            queryParams.append('itinary', JSON.stringify(data.itinary));
            queryParams.append('cabDetails', data.cabDetails);

            window.open(`/view/voucher?${queryParams.toString()}`, '_blank');
        },
        [generateBookingId]
    );

    const handleHotelNoChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const numHotels = Math.max(1, parseInt(e.target.value) || 1);
            const totalNights = watch('totalNights');
            const currentItinary = watch('itinary');

            const newItinary = Array(numHotels)
                .fill(null)
                .map((_, index) => ({
                    ...(currentItinary[index] || { hotelName: '', fromDate: '', toDate: '', description: '' }),
                    nights: index === 0 ? totalNights : 0,
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

            setValue('hotelNo', numHotels);
            setValue('itinary', newItinary);
        },
        [setValue, watch]
    );

    const handleNightChange = useCallback(
        (index: number, value: number) => {
            const totalNights = watch('totalNights');
            const currentItinary = [...watch('itinary')];
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

            setValue('itinary', currentItinary);
        },
        [setValue, watch]
    );

    const memoizedFields = useMemo(() => fields, [fields]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (url) {
            const urlParams = new URLSearchParams(url.split('?')[1]);

            // Parse and set each value from the URL parameters
            setValue('clientName', urlParams.get('clientName') || '');
            setValue('bookingId', urlParams.get('bookingId') || '');
            setValue('hotelNo', parseInt(urlParams.get('hotelNo') || '1') || 1);
            setValue('adultNo', parseInt(urlParams.get('adultNo') || '1') || 1);
            setValue('childrenNo', parseInt(urlParams.get('childrenNo') || '0') || 0);
            setValue('totalNights', parseInt(urlParams.get('totalNights') || '1') || 1);
            setValue('cabDetails', urlParams.get('cabDetails') || '');

            // Parse itinerary and set it if valid
            const itinerary = JSON.parse(urlParams.get('itinary') || '[]');
            if (Array.isArray(itinerary)) {
                setValue('itinary', itinerary);
            }
        }
    };

    return (
        <Section className="pt-10 pb-20">
            <Container className="w-full">
                <SectionHeading mainHeading="Create Voucher" subHeading="Fill in the details" />
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 px-3 flex flex-col gap-5">
                    <div>
                        <label
                            htmlFor="urlInput"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Edit by URL
                        </label>
                        <input
                            type="text"
                            name="urlInput"
                            onChange={handleUrlChange}
                            placeholder="Enter URL to pre-fill form"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="clientName"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Client's Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('clientName', { required: 'Client name is required' })}
                            type="text"
                            name="clientName"
                            placeholder="Enter client's name"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                        {errors.clientName && <span className="text-red-500">{errors.clientName.message}</span>}
                    </div>

                    <div>
                        <label
                            htmlFor="bookingId"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Booking ID
                        </label>
                        <input
                            {...register('bookingId')}
                            type="text"
                            name="bookingId"
                            placeholder="Booking ID (leave blank for auto-generation)"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="totalNights"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Total Nights <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('totalNights', {
                                valueAsNumber: true,
                                min: 1,
                                onChange: (e) => {
                                    const value = Math.max(1, parseInt(e.target.value) || 1);
                                    setValue('totalNights', value);
                                    handleHotelNoChange({
                                        target: { value: watch('hotelNo').toString() },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                },
                            })}
                            type="number"
                            name="totalNights"
                            placeholder="Enter total nights"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="hotelNo"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Hotel's No <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('hotelNo', { valueAsNumber: true, min: 1 })}
                            onChange={handleHotelNoChange}
                            type="number"
                            name="hotelNo"
                            placeholder="Enter number of hotels"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="adultNo"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Adults <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('adultNo', { valueAsNumber: true, min: 1 })}
                            type="number"
                            name="adultNo"
                            placeholder="Enter number of adults"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            min={1}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="childrenNo"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Children
                        </label>
                        <input
                            {...register('childrenNo', { valueAsNumber: true, min: 0 })}
                            type="number"
                            name="childrenNo"
                            placeholder="Enter number of children"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            min={0}
                        />
                    </div>

                    <div className="mt-6">
                        {memoizedFields.map((field, index) => (
                            <div key={field.id} className="mb-6 p-4 border rounded bg-gray-50 dark:bg-gray-800">
                                <h4 className="text-md font-medium mb-3">Hotel {index + 1}</h4>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Hotel Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register(`itinary.${index}.hotelName` as const, {
                                                required: 'Hotel name is required',
                                            })}
                                            type="text"
                                            placeholder="Enter hotel name"
                                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Nights <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register(`itinary.${index}.nights` as const, {
                                                valueAsNumber: true,
                                                required: 'Number of nights is required',
                                                min: 0,
                                            })}
                                            type="number"
                                            onChange={(e) => handleNightChange(index, parseInt(e.target.value) || 0)}
                                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            From Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register(`itinary.${index}.fromDate` as const, {
                                                required: 'From date is required',
                                            })}
                                            type="date"
                                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            To Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register(`itinary.${index}.toDate` as const, {
                                                required: 'To date is required',
                                            })}
                                            type="date"
                                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            {...register(`itinary.${index}.description` as const)}
                                            placeholder="Enter hotel description"
                                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label
                            htmlFor="cabDetails"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Cab Details
                        </label>
                        <input
                            {...register('cabDetails')}
                            name="cabDetails"
                            placeholder="Enter cab details"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                        {errors.cabDetails && <span className="text-red-500">{errors.cabDetails.message}</span>}
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
