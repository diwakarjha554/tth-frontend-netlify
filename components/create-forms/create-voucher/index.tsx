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

            Object.entries(data).forEach(([key, value]) => {
                if (key === 'itinary') {
                    queryParams.append(key, JSON.stringify(value));
                } else {
                    queryParams.append(key, value.toString());
                }
            });

            window.open(`/view/voucher?${queryParams.toString()}`, '_blank');
        },
        [generateBookingId]
    );

    const handleHotelNoChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const numHotels = Math.max(1, parseInt(e.target.value) || 1);
            const totalNights = watch('totalNights');
            const currentItinary = watch('itinary');

            // Create new itinary array with specified number of hotels
            const newItinary = Array(numHotels)
                .fill(null)
                .map((_, index) => ({
                    // Preserve existing hotel data if available
                    ...(currentItinary[index] || {
                        hotelName: '',
                        fromDate: '',
                        toDate: '',
                        description: '',
                    }),
                    // First hotel gets all nights, others get 0
                    nights: index === 0 ? totalNights : 0,
                }));

            setValue('hotelNo', numHotels);
            setValue('itinary', newItinary);
        },
        [setValue, watch]
    );

    const handleNightChange = useCallback(
        (index: number, value: number) => {
            const totalNights = watch('totalNights');
            const currentItinary = [...watch('itinary')];

            // Ensure non-negative value
            value = Math.max(0, value);

            // Calculate maximum allowable nights for this hotel
            const previousHotelsNights = currentItinary.slice(0, index).reduce((sum, hotel) => sum + hotel.nights, 0);
            const remainingNightsForCurrentAndNext = totalNights - previousHotelsNights;
            value = Math.min(value, remainingNightsForCurrentAndNext);

            // Update current hotel nights
            currentItinary[index].nights = value;

            // Calculate remaining nights for subsequent hotels
            let remainingNights = remainingNightsForCurrentAndNext - value;

            // Distribute remaining nights to subsequent hotels
            for (let i = index + 1; i < currentItinary.length; i++) {
                if (i === currentItinary.length - 1) {
                    // Last hotel gets all remaining nights
                    currentItinary[i].nights = remainingNights;
                } else {
                    // Intermediate hotels keep their current nights if possible
                    const currentHotelNights = Math.min(currentItinary[i].nights || 0, remainingNights);
                    currentItinary[i].nights = currentHotelNights;
                    remainingNights -= currentHotelNights;
                }
            }

            setValue('itinary', currentItinary);
        },
        [setValue, watch]
    );

    const handleTotalNightsChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newTotalNights = Math.max(1, parseInt(e.target.value) || 1);
            setValue('totalNights', newTotalNights);

            // Redistribute nights when total changes
            const currentItinary = watch('itinary');
            const firstHotel = currentItinary[0];
            if (firstHotel) {
                handleNightChange(0, newTotalNights);
            }
        },
        [setValue, watch, handleNightChange]
    );

    const handleUrlChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const url = e.target.value;
            if (url) {
                try {
                    const urlParams = new URLSearchParams(url.split('?')[1]);

                    setValue('clientName', urlParams.get('clientName') || '');
                    setValue('bookingId', urlParams.get('bookingId') || '');
                    setValue('hotelNo', parseInt(urlParams.get('hotelNo') || '1'));
                    setValue('adultNo', parseInt(urlParams.get('adultNo') || '1'));
                    setValue('childrenNo', parseInt(urlParams.get('childrenNo') || '0'));
                    setValue('totalNights', parseInt(urlParams.get('totalNights') || '1'));
                    setValue('cabDetails', urlParams.get('cabDetails') || '');

                    const itinaryData = urlParams.get('itinary');
                    if (itinaryData) {
                        const itinary = JSON.parse(itinaryData);
                        if (Array.isArray(itinary)) {
                            setValue('itinary', itinary);
                        }
                    }
                } catch (error) {
                    console.error('Error parsing URL:', error);
                }
            }
        },
        [setValue]
    );

    const memoizedFields = useMemo(() => fields, [fields]);

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
                                required: 'Total nights is required',
                            })}
                            type="number"
                            min="1"
                            onChange={handleTotalNightsChange}
                            placeholder="Enter total nights"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                        {errors.totalNights && <span className="text-red-500">{errors.totalNights.message}</span>}
                    </div>

                    <div>
                        <label
                            htmlFor="hotelNo"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Number of Hotels <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('hotelNo', {
                                valueAsNumber: true,
                                min: 1,
                                required: 'Number of hotels is required',
                            })}
                            onChange={handleHotelNoChange}
                            type="number"
                            min="1"
                            placeholder="Enter number of hotels"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                        {errors.hotelNo && <span className="text-red-500">{errors.hotelNo.message}</span>}
                    </div>

                    <div>
                        <label
                            htmlFor="adultNo"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Adults <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('adultNo', {
                                valueAsNumber: true,
                                min: 1,
                                required: 'Number of adults is required',
                            })}
                            type="number"
                            min="1"
                            placeholder="Enter number of adults"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                        {errors.adultNo && <span className="text-red-500">{errors.adultNo.message}</span>}
                    </div>

                    <div>
                        <label
                            htmlFor="childrenNo"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Children
                        </label>
                        <input
                            {...register('childrenNo', {
                                valueAsNumber: true,
                                min: 0,
                            })}
                            type="number"
                            min="0"
                            placeholder="Enter number of children"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
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
                                        {errors.itinary?.[index]?.hotelName && (
                                            <span className="text-red-500">
                                                {errors.itinary[index].hotelName?.message}
                                            </span>
                                        )}
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
                                            min="0"
                                            onChange={(e) => handleNightChange(index, parseInt(e.target.value) || 0)}
                                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                        />
                                        {errors.itinary?.[index]?.nights && (
                                            <span className="text-red-500">
                                                {errors.itinary[index].nights?.message}
                                            </span>
                                        )}
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
                                        {errors.itinary?.[index]?.fromDate && (
                                            <span className="text-red-500">
                                                {errors.itinary[index].fromDate?.message}
                                            </span>
                                        )}
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
                                        {errors.itinary?.[index]?.toDate && (
                                            <span className="text-red-500">
                                                {errors.itinary[index].toDate?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            {...register(`itinary.${index}.description` as const, {
                                                required: 'Description is required',
                                            })}
                                            placeholder="Enter hotel description"
                                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                            rows={3}
                                        />
                                        {errors.itinary?.[index]?.description && (
                                            <span className="text-red-500">
                                                {errors.itinary[index].description?.message}
                                            </span>
                                        )}
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
                            Cab Details <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('cabDetails', {
                                required: 'Cab details are required',
                            })}
                            type="text"
                            placeholder="Enter cab details"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                        {errors.cabDetails && <span className="text-red-500">{errors.cabDetails.message}</span>}
                    </div>

                    <div className="flex justify-end mt-6">
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
