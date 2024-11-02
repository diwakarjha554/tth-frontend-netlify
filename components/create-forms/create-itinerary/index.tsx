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

const CreateItinerary: React.FC = () => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();

        // Append all form values to queryParams
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
            } catch (error) {
                console.error("Error parsing URL:", error);
            }
        }
    }, [urlInput]);

    return (
        <Section className="pt-10 pb-20">
            <Container className="w-full flex flex-col gap-10 md:px-7">
                <SectionHeading mainHeading='Create an Itinerary' subHeading='Fill the form'/>
                <form onSubmit={handleSubmit} className="space-y-6 pb-10">
                    <div>
                        <label htmlFor="urlInput" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                            Input URL
                        </label>
                        <input
                            type="text"
                            value={urlInput}
                            onChange={handleUrlChange}
                            placeholder="Enter URL"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="clientName" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Client&apos;s name
                            </label>
                            <input
                                name="clientName"
                                value={formValues.clientName}
                                onChange={handleChange}
                                placeholder="Client&apos;s name"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="packageTitle" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Package title
                            </label>
                            <input
                                name="packageTitle"
                                value={formValues.packageTitle}
                                onChange={handleChange}
                                placeholder="Package title"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        <div className="flex gap-4 flex-wrap md:flex-nowrap">
                            <div className="flex flex-col gap-3 relative w-full">
                                <label htmlFor="numberOfDays" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                    Number of days
                                </label>
                                <input
                                    type="number"
                                    name="numberOfDays"
                                    value={formValues.numberOfDays}
                                    onChange={handleDaysChange}
                                    placeholder="Number of days"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                    required
                                />
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
                            <label htmlFor="numberOfHotels" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Number of hotels
                            </label>
                            <input
                                type="number"
                                name="numberOfHotels"
                                value={formValues.numberOfHotels}
                                onChange={handleHotelsChange}
                                placeholder="Number of hotels"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3 relative w-full">
                            <label htmlFor="numberOfInclusions" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Number of inclusions
                            </label>
                            <input
                                type="number"
                                name="numberOfInclusions"
                                value={formValues.numberOfInclusions}
                                onChange={handleInclusionsChange}
                                placeholder="Number of inclusions"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        {formValues.inclusions.map((inclusion, index) => (
                            <div key={index}>
                                <label htmlFor={`inclusion-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                            <label htmlFor="numberOfExclusions" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Number of exclusions
                            </label>
                            <input
                                type="number"
                                name="numberOfExclusions"
                                value={formValues.numberOfExclusions}
                                onChange={handleExclusionsChange}
                                placeholder="Number of exclusions"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        {formValues.exclusions.map((exclusion, index) => (
                            <div key={index}>
                                <label htmlFor={`exclusion-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                            <label htmlFor="cabs" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Cab details
                            </label>
                            <input
                                name="cabs"
                                value={formValues.cabs}
                                onChange={handleChange}
                                placeholder="Cab details"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="flights" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Flight details
                            </label>
                            <input
                                name="flights"
                                value={formValues.flights}
                                onChange={handleChange}
                                placeholder="Flight details"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="quotePrice" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Quote price
                            </label>
                            <input
                                type="number"
                                name="quotePrice"
                                value={formValues.quotePrice}
                                onChange={handleChange}
                                placeholder="Quote price"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="tripAdvisorName" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Trip advisor&apos;s name
                            </label>
                            <input
                                name="tripAdvisorName"
                                value={formValues.tripAdvisorName}
                                onChange={handleChange}
                                placeholder="Trip advisor&apos;s name"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="tripAdvisorNumber" className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
                                Trip advisor&apos;s number
                            </label>
                            <input
                                name="tripAdvisorNumber"
                                value={formValues.tripAdvisorNumber}
                                onChange={handleChange}
                                placeholder="Trip advisor&apos;s number"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 border-gray-300"
                                required
                            />
                        </div>
                        <h2 className="text-2xl font-semibold !mt-10">Day Details</h2>
                        {formValues.days.map((day, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <label htmlFor={`day-summary-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                                <label htmlFor={`day-imageSrc-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                                <label htmlFor={`day-description-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                                <label htmlFor={`hotel-placeName-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                                <label htmlFor={`hotel-placeDescription-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                                <label htmlFor={`hotel-hotelName-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                                <label htmlFor={`hotel-roomType-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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
                                <label htmlFor={`hotel-hotelDescription-${index}`} className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
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

export default CreateItinerary;