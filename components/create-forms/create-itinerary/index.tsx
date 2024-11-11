'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import SectionHeading from '@/components/ui/section-heading';

// Zod schema for form validation
const ItinerarySchema = z.object({
    clientName: z.string().min(1, 'Client name is required'),
    packageTitle: z.string().min(1, 'Package title is required'),
    numberOfDays: z.number().min(1, 'Number of days must be at least 1'),
    numberOfNights: z.number(),
    numberOfHotels: z.number().min(1, 'Number of hotels must be at least 1'),
    tripAdvisorName: z.string().min(1, 'Trip advisor name is required'),
    tripAdvisorNumber: z.string().min(1, 'Trip advisor number is required'),
    cabs: z.string().min(1, 'Cabs details are required'),
    flights: z.string().min(1, 'Flight details are required'),
    quotePrice: z.number().min(0, 'Quote price cannot be negative'),
    pricePerPerson: z.number().min(0, 'Price per person cannot be negative'),
    days: z.array(
        z.object({
            dayNumber: z.number(),
            summary: z.string().min(1, 'Day summary is required'),
            imageSrc: z.string().min(1, 'Image source is required'),
            description: z.string().min(1, 'Day description is required'),
        })
    ),
    hotels: z.array(
        z.object({
            placeName: z.string().min(1, 'Place name is required'),
            placeDescription: z.string().min(1, 'Place description is required'),
            hotelName: z.string().min(1, 'Hotel name is required'),
            roomType: z.string().min(1, 'Room type is required'),
            hotelDescription: z.string().min(1, 'Hotel description is required'),
        })
    ),
    inclusions: z.array(
        z.object({
            value: z.string().min(1, 'Inclusion value is required'),
        })
    ),
    exclusions: z.array(
        z.object({
            value: z.string().min(1, 'Exclusion value is required'),
        })
    ),
});

type ItineraryFormValues = z.infer<typeof ItinerarySchema>;

const DEFAULT_VALUES: ItineraryFormValues = {
    clientName: '',
    packageTitle: '',
    numberOfDays: 1,
    numberOfNights: 0,
    numberOfHotels: 1,
    tripAdvisorName: '',
    tripAdvisorNumber: '',
    cabs: '',
    flights: '',
    quotePrice: 0,
    pricePerPerson: 0,
    days: [{ dayNumber: 1, summary: '', imageSrc: '', description: '' }],
    hotels: [{ placeName: '', placeDescription: '', hotelName: '', roomType: '', hotelDescription: '' }],
    inclusions: [{ value: '' }],
    exclusions: [{ value: '' }],
};

const ItineraryForm = () => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ItineraryFormValues>({
        resolver: zodResolver(ItinerarySchema),
        defaultValues: DEFAULT_VALUES,
    });

    const { fields: hotelFields, replace: replaceHotels } = useFieldArray({
        control,
        name: 'hotels',
    });

    const {
        fields: inclusionFields,
        append: appendInclusion,
        remove: removeInclusion,
    } = useFieldArray({
        control,
        name: 'inclusions',
    });

    const {
        fields: exclusionFields,
        append: appendExclusion,
        remove: removeExclusion,
    } = useFieldArray({
        control,
        name: 'exclusions',
    });

    const { fields: dayFields, replace: replaceDays } = useFieldArray({
        control,
        name: 'days',
    });

    // Watch for changes in numberOfDays and numberOfHotels
    const numberOfDays = watch('numberOfDays');
    const numberOfHotels = watch('numberOfHotels');

    // Update number of nights when days change
    useEffect(() => {
        setValue('numberOfNights', Math.max(0, numberOfDays - 1));
    }, [numberOfDays, setValue]);

    // Update days array when numberOfDays changes
    useEffect(() => {
        if (Array.isArray(watch('days'))) {
            const newDays = watch('days').map((day, index) => ({
                dayNumber: index + 1,
                summary: day.summary || '',
                imageSrc: day.imageSrc || '',
                description: day.description || '',
            }));
            replaceDays(newDays);
        }
    }, [replaceDays, numberOfDays]);

    // Update hotels array when numberOfHotels changes
    useEffect(() => {
        const parsedHotels = watch('hotels');
        if (Array.isArray(parsedHotels)) {
            const newHotels = parsedHotels.map((hotel, index) => ({
                placeName: hotel.placeName || '',
                placeDescription: hotel.placeDescription || '',
                hotelName: hotel.hotelName || '',
                roomType: hotel.roomType || '',
                hotelDescription: hotel.hotelDescription || '',
            }));
            replaceHotels(newHotels);
        } else {
            const newHotels = Array.from({ length: numberOfHotels }, () => ({
                placeName: '',
                placeDescription: '',
                hotelName: '',
                roomType: '',
                hotelDescription: '',
            }));
            replaceHotels(newHotels);
        }
    }, [numberOfHotels, replaceHotels]);

    const onSubmit = (data: ItineraryFormValues) => {
        const queryParams = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            queryParams.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
        });
        window.open(`/view/itinerary?${queryParams.toString()}`, '_blank');
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (url) {
            try {
                const urlParams = new URLSearchParams(url.split('?')[1]);

                urlParams.forEach((value, key) => {
                    if (!value) return;

                    try {
                        // Handle array fields specially
                        if (['days', 'hotels', 'inclusions', 'exclusions'].includes(key)) {
                            const parsedValue = JSON.parse(decodeURIComponent(value));
                            setValue(key as keyof ItineraryFormValues, parsedValue);
                        }
                        // Handle number fields
                        else if (
                            [
                                'numberOfDays',
                                'numberOfNights',
                                'numberOfHotels',
                                'quotePrice',
                                'pricePerPerson',
                            ].includes(key)
                        ) {
                            setValue(key as keyof ItineraryFormValues, Number(value));
                        }
                        // Handle string fields
                        else {
                            setValue(key as keyof ItineraryFormValues, decodeURIComponent(value));
                        }
                    } catch (parseError) {
                        console.error(`Error parsing field ${key}:`, parseError);
                    }
                });
            } catch (error) {
                console.error('Error parsing URL parameters:', error);
            }
        }
    };

    const inputClassName =
        'w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200';
    const labelClassName = 'block text-gray-700 dark:text-white text-sm font-semibold mb-2';
    const errorClassName = 'text-red-500 text-sm mt-1';

    return (
        <Section className="pt-10 pb-20">
            <Container className="w-full">
                <SectionHeading mainHeading="Create Itinerary" subHeading="Fill in the details" />
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 px-3 flex flex-col gap-5">
                    {/* URL Input */}
                    <div>
                        <label htmlFor="urlInput" className={labelClassName}>
                            Edit by URL
                        </label>
                        <input
                            type="text"
                            onChange={handleUrlChange}
                            placeholder="Enter URL to pre-fill form"
                            className={inputClassName}
                        />
                    </div>

                    {/* Basic Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="clientName" className={labelClassName}>
                                Client&apos;s Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('clientName')}
                                type="text"
                                placeholder="Enter client's name"
                                className={inputClassName}
                            />
                            {errors.clientName && <p className={errorClassName}>{errors.clientName.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="packageTitle" className={labelClassName}>
                                Package Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('packageTitle')}
                                type="text"
                                placeholder="Enter package title"
                                className={inputClassName}
                            />
                            {errors.packageTitle && <p className={errorClassName}>{errors.packageTitle.message}</p>}
                        </div>
                    </div>

                    {/* Numbers Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label htmlFor="numberOfDays" className={labelClassName}>
                                Number of Days <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('numberOfDays', { valueAsNumber: true })}
                                type="number"
                                min="1"
                                placeholder="Enter number of days"
                                className={inputClassName}
                            />
                            {errors.numberOfDays && <p className={errorClassName}>{errors.numberOfDays.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="numberOfNights" className={labelClassName}>
                                Number of Nights (Auto-calculated)
                            </label>
                            <input
                                {...register('numberOfNights', { valueAsNumber: true })}
                                type="number"
                                disabled
                                className={inputClassName}
                            />
                        </div>

                        <div>
                            <label htmlFor="numberOfHotels" className={labelClassName}>
                                Number of Hotels <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('numberOfHotels', { valueAsNumber: true })}
                                type="number"
                                min="1"
                                placeholder="Enter number of hotels"
                                className={inputClassName}
                            />
                            {errors.numberOfHotels && <p className={errorClassName}>{errors.numberOfHotels.message}</p>}
                        </div>
                    </div>

                    {/* Trip Advisor Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="tripAdvisorName" className={labelClassName}>
                                Trip Advisor Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('tripAdvisorName')}
                                type="text"
                                placeholder="Enter Trip Advisor Name"
                                className={inputClassName}
                            />
                            {errors.tripAdvisorName && (
                                <p className={errorClassName}>{errors.tripAdvisorName.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="tripAdvisorNumber" className={labelClassName}>
                                Trip Advisor Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('tripAdvisorNumber')}
                                type="text"
                                placeholder="Enter Trip Advisor Number"
                                className={inputClassName}
                            />
                            {errors.tripAdvisorNumber && (
                                <p className={errorClassName}>{errors.tripAdvisorNumber.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Transport Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="cabs" className={labelClassName}>
                                Cabs Details <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('cabs')}
                                type="text"
                                placeholder="Enter cab details"
                                className={inputClassName}
                            />
                            {errors.cabs && <p className={errorClassName}>{errors.cabs.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="flights" className={labelClassName}>
                                Flights Details <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('flights')}
                                type="text"
                                placeholder="Enter flight details"
                                className={inputClassName}
                            />
                            {errors.flights && <p className={errorClassName}>{errors.flights.message}</p>}
                        </div>
                    </div>

                    {/* Quote Price */}
                    <div>
                        <label htmlFor="quotePrice" className={labelClassName}>
                            Quote Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('quotePrice', { valueAsNumber: true })}
                            type="number"
                            placeholder="Enter quote price"
                            className={inputClassName}
                            min={0}
                        />
                        {errors.quotePrice && <p className={errorClassName}>{errors.quotePrice.message}</p>}
                    </div>

                    {/* Price Per Person */}
                    <div>
                        <label htmlFor="pricePerPerson" className={labelClassName}>
                            Price per person <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('pricePerPerson', { valueAsNumber: true })}
                            type="number"
                            placeholder="Enter price per person"
                            className={inputClassName}
                            min={0}
                        />
                        {errors.pricePerPerson && <p className={errorClassName}>{errors.pricePerPerson.message}</p>}
                    </div>

                    {/* Days Section */}
                    <div className="border-t pt-5">
                        <h3 className="text-lg font-semibold mb-4">Daily Itinerary</h3>
                        {dayFields.map((field, index) => (
                            <div key={field.id} className="mb-5 p-4 border rounded">
                                <h4 className="font-medium mb-3">Day {index + 1}</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClassName}>Summary</label>
                                        <textarea
                                            {...register(`days.${index}.summary`)}
                                            placeholder={`Summary for Day ${index + 1}`}
                                            className={inputClassName}
                                        />
                                        {errors.days?.[index]?.summary && (
                                            <p className={errorClassName}>{errors.days[index]?.summary?.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClassName}>Image Source</label>
                                        <input
                                            {...register(`days.${index}.imageSrc`)}
                                            type="text"
                                            placeholder="Image URL"
                                            className={inputClassName}
                                        />
                                        {errors.days?.[index]?.imageSrc && (
                                            <p className={errorClassName}>{errors.days[index]?.imageSrc?.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClassName}>Description</label>
                                        <textarea
                                            {...register(`days.${index}.description`)}
                                            placeholder="Detailed description"
                                            className={inputClassName}
                                        />
                                        {errors.days?.[index]?.description && (
                                            <p className={errorClassName}>{errors.days[index]?.description?.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hotels Section */}
                    <div className="border-t pt-5">
                        <h3 className="text-lg font-semibold mb-4">Hotels</h3>
                        {hotelFields.map((field, index) => (
                            <div key={field.id} className="mb-5 p-4 border rounded">
                                <h4 className="font-medium mb-3">Hotel {index + 1}</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClassName}>Place Name</label>
                                        <input
                                            {...register(`hotels.${index}.placeName`)}
                                            type="text"
                                            placeholder="Enter place name"
                                            className={inputClassName}
                                        />
                                        {errors.hotels?.[index]?.placeName && (
                                            <p className={errorClassName}>{errors.hotels[index]?.placeName?.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClassName}>Place Description</label>
                                        <textarea
                                            {...register(`hotels.${index}.placeDescription`)}
                                            placeholder="Number of Nights (Example: 1st Night, 2nd Night...)"
                                            className={inputClassName}
                                        />
                                        {errors.hotels?.[index]?.placeDescription && (
                                            <p className={errorClassName}>
                                                {errors.hotels[index]?.placeDescription?.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClassName}>Hotel Name</label>
                                        <input
                                            {...register(`hotels.${index}.hotelName`)}
                                            type="text"
                                            placeholder="Enter hotel name"
                                            className={inputClassName}
                                        />
                                        {errors.hotels?.[index]?.hotelName && (
                                            <p className={errorClassName}>{errors.hotels[index]?.hotelName?.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClassName}>Room Type</label>
                                        <input
                                            {...register(`hotels.${index}.roomType`)}
                                            type="text"
                                            placeholder="Enter room type"
                                            className={inputClassName}
                                        />
                                        {errors.hotels?.[index]?.roomType && (
                                            <p className={errorClassName}>{errors.hotels[index]?.roomType?.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClassName}>Hotel Description</label>
                                        <textarea
                                            {...register(`hotels.${index}.hotelDescription`)}
                                            placeholder="Enter hotel description"
                                            className={inputClassName}
                                        />
                                        {errors.hotels?.[index]?.hotelDescription && (
                                            <p className={errorClassName}>
                                                {errors.hotels[index]?.hotelDescription?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Inclusions Section */}
                    <div className="border-t pt-5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Inclusions</h3>
                            <button
                                type="button"
                                onClick={() => appendInclusion({ value: '' })}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Add Inclusion
                            </button>
                        </div>
                        {inclusionFields.map((field, index) => (
                            <div key={field.id} className="mb-4 flex gap-4">
                                <div className="flex-1">
                                    <input
                                        {...register(`inclusions.${index}.value`)}
                                        type="text"
                                        placeholder={`Inclusion ${index + 1}`}
                                        className={inputClassName}
                                    />
                                    {errors.inclusions?.[index]?.value && (
                                        <p className={errorClassName}>{errors.inclusions[index]?.value?.message}</p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (inclusionFields.length > 1) removeInclusion(index);
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Exclusions Section */}
                    <div className="border-t pt-5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Exclusions</h3>
                            <button
                                type="button"
                                onClick={() => appendExclusion({ value: '' })}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Add Exclusion
                            </button>
                        </div>
                        {exclusionFields.map((field, index) => (
                            <div key={field.id} className="mb-4 flex gap-4">
                                <div className="flex-1">
                                    <input
                                        {...register(`exclusions.${index}.value`)}
                                        type="text"
                                        placeholder={`Exclusion ${index + 1}`}
                                        className={inputClassName}
                                    />
                                    {errors.exclusions?.[index]?.value && (
                                        <p className={errorClassName}>{errors.exclusions[index]?.value?.message}</p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (exclusionFields.length > 1) removeExclusion(index);
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="border-t pt-5 flex justify-end">
                        <button
                            type="submit"
                            className="py-5 px-10 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full lg:w-fit text-center text-white hover:scale-105 transition-all duration-300"
                        >
                            Generate Itinerary
                        </button>
                    </div>
                </form>
            </Container>
        </Section>
    );
};

export default ItineraryForm;
