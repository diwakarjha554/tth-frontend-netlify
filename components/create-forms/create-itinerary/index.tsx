'use client';

import React, { useState, useEffect } from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import SectionHeading from '@/components/ui/section-heading';

interface ItineraryItem {
    dayNumber: number;
    summary: string;
    imageSrc: string;
    description: string;
}

interface HotelItem {
    placeName: string;
    placeDescription: string;
    hotelName: string;
    roomType: string;
    hotelDescription: string;
}

interface Inclusion {
    value: string;
}

interface Exclusion {
    value: string;
}

const ItineraryForm: React.FC = () => {
    const [formValues, setFormValues] = useState({
        clientName: '',
        packageTitle: '',
        numberOfDays: 1,
        numberOfNights: 0,
        numberOfHotels: 1,
        numberOfInclusions: 1,
        numberOfExclusions: 1,
        tripAdvisorName: '',
        tripAdvisorNumber: '',
        cabs: '',
        flights: '',
        quotePrice: 0,
        days: [{ dayNumber: 1, summary: '', imageSrc: '', description: '' }],
        hotels: [{ placeName: '', placeDescription: '', hotelName: '', roomType: '', hotelDescription: '' }],
        inclusions: [{ value: '' }],
        exclusions: [{ value: '' }],
    });

    const [urlInput, setUrlInput] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const validateField = (name: string, value: any) => {
        if (!value || value === '') {
            return 'This field is required';
        }
        if (name === 'quotePrice' && value <= 0) {
            return 'Price must be greater than 0';
        }
        if (
            (name === 'numberOfDays' ||
                name === 'numberOfHotels' ||
                name === 'numberOfInclusions' ||
                name === 'numberOfExclusions') &&
            value < 1
        ) {
            return 'Value must be at least 1';
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        // Validate on change if field has been touched
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const days = Math.max(1, parseInt(e.target.value) || 1);
        setFormValues((prev) => ({
            ...prev,
            numberOfDays: days,
            numberOfNights: days - 1,
            days: Array.from({ length: days }, (_, index) => ({
                dayNumber: index + 1,
                summary: '',
                imageSrc: '',
                description: '',
            })),
        }));
    };

    const handleHotelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hotels = Math.max(1, parseInt(e.target.value) || 1);
        setFormValues((prev) => ({
            ...prev,
            numberOfHotels: hotels,
            hotels: Array.from({ length: hotels }, () => ({
                placeName: '',
                placeDescription: '',
                hotelName: '',
                roomType: '',
                hotelDescription: '',
            })),
        }));
    };

    const handleInclusionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inclusions = Math.max(1, parseInt(e.target.value) || 1);
        setFormValues((prev) => ({
            ...prev,
            numberOfInclusions: inclusions,
            inclusions: Array.from({ length: inclusions }, (_, index) => ({
                value: prev.inclusions[index]?.value || '',
            })),
        }));
    };

    const handleExclusionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const exclusions = Math.max(1, parseInt(e.target.value) || 1);
        setFormValues((prev) => ({
            ...prev,
            numberOfExclusions: exclusions,
            exclusions: Array.from({ length: exclusions }, (_, index) => ({
                value: prev.exclusions[index]?.value || '',
            })),
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        const requiredFields = [
            'clientName',
            'packageTitle',
            'numberOfDays',
            'numberOfHotels',
            'numberOfInclusions',
            'numberOfExclusions',
            'cabs',
            'flights',
            'quotePrice',
            'tripAdvisorName',
            'tripAdvisorNumber',
        ];

        // Validate all required fields
        requiredFields.forEach((field) => {
            const error = validateField(field, formValues[field as keyof typeof formValues]);
            if (error) {
                newErrors[field] = error;
                setTouched((prev) => ({ ...prev, [field]: true }));
            }
        });

        // Validate days
        formValues.days.forEach((day, index) => {
            if (!day.summary) newErrors[`day-summary-${index}`] = 'Summary is required';
            if (!day.description) newErrors[`day-description-${index}`] = 'Description is required';
            if (!day.imageSrc) newErrors[`day-imageSrc-${index}`] = 'Image source is required';
        });

        // Validate hotels
        formValues.hotels.forEach((hotel, index) => {
            if (!hotel.placeName) newErrors[`hotel-placeName-${index}`] = 'Place name is required';
            if (!hotel.placeDescription) newErrors[`hotel-placeDescription-${index}`] = 'Place description is required';
            if (!hotel.hotelName) newErrors[`hotel-hotelName-${index}`] = 'Hotel name is required';
            if (!hotel.roomType) newErrors[`hotel-roomType-${index}`] = 'Room type is required';
            if (!hotel.hotelDescription) newErrors[`hotel-hotelDescription-${index}`] = 'Hotel description is required';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            // Find first error and focus on it
            const firstErrorField = Object.keys(errors)[0];
            const element = document.getElementById(firstErrorField);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.focus();
            }
            return;
        }

        const queryParams = new URLSearchParams();
        Object.entries(formValues).forEach(([key, value]) => {
            queryParams.append(key, JSON.stringify(value));
        });

        window.open(`/itinerary/view-itinerary?${queryParams.toString()}`, '_blank');
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrlInput(e.target.value);
    };

    useEffect(() => {
        if (urlInput) {
            try {
                const urlParams = new URLSearchParams(urlInput);
                const newFormValues: any = {};
                urlParams.forEach((value, key) => {
                    if (key === 'days' || key === 'hotels' || key === 'inclusions' || key === 'exclusions') {
                        newFormValues[key] = JSON.parse(value);
                    } else {
                        newFormValues[key] = value;
                    }
                });
                setFormValues((prev) => ({ ...prev, ...newFormValues }));
                setErrors({}); // Clear errors when loading from URL
                setTouched({}); // Reset touched state
            } catch (error) {
                console.error('Error parsing URL:', error);
            }
        }
    }, [urlInput]);

    const inputClassName = (fieldName: string) => `
        w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200
        ${errors[fieldName] && touched[fieldName] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}
    `;

    return (
        <Section className="pt-10 pb-20">
            <Container className="w-full flex flex-col gap-10 md:px-7">
                <SectionHeading mainHeading="Create an Itinerary" subHeading="Fill the form" />
                <form onSubmit={handleSubmit} className="space-y-6 pb-10">
                    {/* URL Input Field */}
                    <div>
                        <label
                            htmlFor="urlInput"
                            className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                        >
                            Input URL
                        </label>
                        <input
                            type="text"
                            id="urlInput"
                            value={urlInput}
                            onChange={handleUrlChange}
                            placeholder="Enter URL"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                        />
                    </div>
                    <div className="space-y-4">
                        {/* Client Name */}
                        <div>
                            <label
                                htmlFor="clientName"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Client's name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="clientName"
                                name="clientName"
                                value={formValues.clientName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Client's name"
                                className={inputClassName('clientName')}
                            />
                            {errors.clientName && touched.clientName && (
                                <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
                            )}
                        </div>
                        {/* Package Title */}
                        <div>
                            <label
                                htmlFor="packageTitle"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Package title <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="packageTitle"
                                name="packageTitle"
                                value={formValues.packageTitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Package title"
                                className={inputClassName('packageTitle')}
                            />
                            {errors.packageTitle && touched.packageTitle && (
                                <p className="text-red-500 text-sm mt-1">{errors.packageTitle}</p>
                            )}
                        </div>
                        {/* Days and Nights */}
                        <div className="flex gap-4 flex-wrap md:flex-nowrap">
                            <div className="flex flex-col gap-3 relative w-full">
                                <label
                                    htmlFor="numberOfDays"
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Number of days <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="numberOfDays"
                                    type="number"
                                    name="numberOfDays"
                                    value={formValues.numberOfDays}
                                    onChange={handleDaysChange}
                                    onBlur={handleBlur}
                                    placeholder="Number of days"
                                    min="1"
                                    className={inputClassName('numberOfDays')}
                                />
                                {errors.numberOfDays && touched.numberOfDays && (
                                    <p className="text-red-500 text-sm mt-1">{errors.numberOfDays}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-3 relative w-full">
                                <label className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                    Total Nights
                                </label>
                                <input
                                    type="number"
                                    name="numberOfNights"
                                    value={formValues.numberOfNights}
                                    placeholder="Number of nights"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 relative w-full">
                            <label
                                htmlFor="numberOfHotels"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Number of hotels <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="numberOfHotels"
                                value={formValues.numberOfHotels}
                                onChange={handleHotelsChange}
                                placeholder="Number of hotels"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200 ${errors.numberOfHotels ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {errors.numberOfHotels && <p className="text-red-500 text-sm">{errors.numberOfHotels}</p>}
                        </div>
                        <div className="flex flex-col gap-3 relative w-full">
                            <label
                                htmlFor="numberOfInclusions"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Number of inclusions <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="numberOfInclusions"
                                value={formValues.numberOfInclusions}
                                onChange={handleInclusionsChange}
                                placeholder="Number of inclusions"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200 ${errors.numberOfInclusions ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {errors.numberOfInclusions && (
                                <p className="text-red-500 text-sm">{errors.numberOfInclusions}</p>
                            )}
                        </div>
                        {formValues.inclusions.map((inclusion, index) => (
                            <div key={index}>
                                <label
                                    htmlFor={`inclusion-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Inclusion {index + 1}
                                </label>
                                <input
                                    id={`inclusion-${index}`}
                                    value={inclusion.value}
                                    onChange={(e) => {
                                        const newInclusions = [...formValues.inclusions];
                                        newInclusions[index].value = e.target.value;
                                        setFormValues((prev) => ({ ...prev, inclusions: newInclusions }));
                                    }}
                                    placeholder={`Inclusion ${index + 1}`}
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                />
                            </div>
                        ))}
                        <div className="flex flex-col gap-3 relative w-full">
                            <label
                                htmlFor="numberOfExclusions"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Number of exclusions <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="numberOfExclusions"
                                value={formValues.numberOfExclusions}
                                onChange={handleExclusionsChange}
                                placeholder="Number of exclusions"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200 ${errors.numberOfExclusions ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {errors.numberOfExclusions && (
                                <p className="text-red-500 text-sm">{errors.numberOfExclusions}</p>
                            )}
                        </div>
                        {formValues.exclusions.map((exclusion, index) => (
                            <div key={index}>
                                <label
                                    htmlFor={`exclusion-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Exclusion {index + 1}
                                </label>
                                <input
                                    id={`exclusion-${index}`}
                                    value={exclusion.value}
                                    onChange={(e) => {
                                        const newExclusions = [...formValues.exclusions];
                                        newExclusions[index].value = e.target.value;
                                        setFormValues((prev) => ({ ...prev, exclusions: newExclusions }));
                                    }}
                                    placeholder={`Exclusion ${index + 1}`}
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                />
                            </div>
                        ))}
                        <div>
                            <label
                                htmlFor="cabs"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Cab details <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="cabs"
                                value={formValues.cabs}
                                onChange={handleChange}
                                placeholder="Cab details"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200 ${errors.cabs ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {errors.cabs && <p className="text-red-500 text-sm">{errors.cabs}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="flights"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Flight details <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="flights"
                                value={formValues.flights}
                                onChange={handleChange}
                                placeholder="Flight details"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200 ${errors.flights ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {errors.flights && <p className="text-red-500 text-sm">{errors.flights}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="quotePrice"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Quote price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="quotePrice"
                                value={formValues.quotePrice}
                                onChange={handleChange}
                                placeholder="Quote price"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200 ${errors.quotePrice ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {errors.quotePrice && <p className="text-red-500 text-sm">{errors.quotePrice}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="tripAdvisorName"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Trip advisor&apos;s name <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="tripAdvisorName"
                                value={formValues.tripAdvisorName}
                                onChange={handleChange}
                                placeholder="Trip advisor's name"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200 ${errors.tripAdvisorName ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {errors.tripAdvisorName && <p className="text-red-500 text-sm">{errors.tripAdvisorName}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="tripAdvisorNumber"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Trip advisor&apos;s number <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="tripAdvisorNumber"
                                value={formValues.tripAdvisorNumber}
                                onChange={handleChange}
                                placeholder="Trip advisor's number"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition duration-200 ${errors.tripAdvisorNumber ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {errors.tripAdvisorNumber && (
                                <p className="text-red-500 text-sm">{errors.tripAdvisorNumber}</p>
                            )}
                        </div>
                        <h2 className="text-2xl font-semibold !mt-10">Day Details</h2>
                        {formValues.days.map((day, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <label
                                    htmlFor={`day-summary-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Day summary
                                </label>
                                <input
                                    id={`day-summary-${index}`}
                                    type="text"
                                    value={day.summary}
                                    onChange={(e) => {
                                        const newDays = [...formValues.days];
                                        newDays[index].summary = e.target.value;
                                        setFormValues((prev) => ({ ...prev, days: newDays }));
                                    }}
                                    placeholder="Day summary"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
                                <label
                                    htmlFor={`day-imageSrc-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Image source link
                                </label>
                                <input
                                    id={`day-imageSrc-${index}`}
                                    type="text"
                                    value={day.imageSrc}
                                    onChange={(e) => {
                                        const newDays = [...formValues.days];
                                        newDays[index].imageSrc = e.target.value;
                                        setFormValues((prev) => ({ ...prev, days: newDays }));
                                    }}
                                    placeholder="Image source link"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
                                <label
                                    htmlFor={`day-description-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Day description
                                </label>
                                <textarea
                                    id={`day-description-${index}`}
                                    value={day.description}
                                    onChange={(e) => {
                                        const newDays = [...formValues.days];
                                        newDays[index].description = e.target.value;
                                        setFormValues((prev) => ({ ...prev, days: newDays }));
                                    }}
                                    placeholder="Day description"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
                            </div>
                        ))}
                        <h2 className="text-2xl font-semibold !mt-10">Hotel Details</h2>
                        {formValues.hotels.map((hotel, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <label
                                    htmlFor={`hotel-placeName-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Place name
                                </label>
                                <input
                                    id={`hotel-placeName-${index}`}
                                    type="text"
                                    value={hotel.placeName}
                                    onChange={(e) => {
                                        const newHotels = [...formValues.hotels];
                                        newHotels[index].placeName = e.target.value;
                                        setFormValues((prev) => ({ ...prev, hotels: newHotels }));
                                    }}
                                    placeholder="Place name"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
                                <label
                                    htmlFor={`hotel-placeDescription-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Place description
                                </label>
                                <textarea
                                    id={`hotel-placeDescription-${index}`}
                                    value={hotel.placeDescription}
                                    onChange={(e) => {
                                        const newHotels = [...formValues.hotels];
                                        newHotels[index].placeDescription = e.target.value;
                                        setFormValues((prev) => ({ ...prev, hotels: newHotels }));
                                    }}
                                    placeholder="Place description"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
                                <label
                                    htmlFor={`hotel-hotelName-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Hotel name
                                </label>
                                <input
                                    id={`hotel-hotelName-${index}`}
                                    type="text"
                                    value={hotel.hotelName}
                                    onChange={(e) => {
                                        const newHotels = [...formValues.hotels];
                                        newHotels[index].hotelName = e.target.value;
                                        setFormValues((prev) => ({ ...prev, hotels: newHotels }));
                                    }}
                                    placeholder="Hotel name"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
                                <label
                                    htmlFor={`hotel-roomType-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Room type
                                </label>
                                <input
                                    id={`hotel-roomType-${index}`}
                                    type="text"
                                    value={hotel.roomType}
                                    onChange={(e) => {
                                        const newHotels = [...formValues.hotels];
                                        newHotels[index].roomType = e.target.value;
                                        setFormValues((prev) => ({ ...prev, hotels: newHotels }));
                                    }}
                                    placeholder="Room type"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
                                <label
                                    htmlFor={`hotel-hotelDescription-${index}`}
                                    className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                                >
                                    Hotel description
                                </label>
                                <textarea
                                    id={`hotel-hotelDescription-${index}`}
                                    value={hotel.hotelDescription}
                                    onChange={(e) => {
                                        const newHotels = [...formValues.hotels];
                                        newHotels[index].hotelDescription = e.target.value;
                                        setFormValues((prev) => ({ ...prev, hotels: newHotels }));
                                    }}
                                    placeholder="Hotel description"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
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
