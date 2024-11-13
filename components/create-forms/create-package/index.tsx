'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import SectionHeading from '@/components/ui/section-heading';
import CategoryInput from '@/components/ui/input/CategoryInput';
import { CardData, getCards } from '@/actions/theme-select.actions';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LucideIcon, Plus, Trash2, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Types
interface InfoSection {
    title: string;
    content: string;
}

interface DayItinerary {
    brief: string;
    description: string;
}

interface PackageFormData extends FieldValues {
    title: string;
    description: string;
    imageSrc: string;
    theme: string;
    price: number;
    location: string;
    days: number;
    nights: number;
    rating: number;
    discount: number;
    pickup: string;
    drop: string;
    otherInfo: {
        info: Record<string, string>;
        disclaimer: string;
    };
    itinerary: Record<
        string,
        {
            brief: string;
            description: string;
        }
    >;
}

const PackageForm = () => {
    // States
    const [categories, setCategories] = useState<CardData[]>([]);
    const [infoSections, setInfoSections] = useState<InfoSection[]>([{ title: '', content: '' }]);
    const [disclaimer, setDisclaimer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    // Router
    const router = useRouter();

    // Form Setup
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<PackageFormData>({
        defaultValues: {
            title: '',
            description: '',
            imageSrc: '',
            theme: '',
            price: 1,
            location: '',
            days: 1,
            nights: 0,
            rating: 5,
            discount: 0,
            pickup: '',
            drop: '',
            otherInfo: {
                info: {},
                disclaimer: '',
            },
            itinerary: {
                day1: {
                    brief: '',
                    description: '',
                },
            },
        },
    });

    // Watch values
    const imageSrc = watch('imageSrc');
    const theme = watch('theme');
    const days = watch('days') || 1;
    const currentItinerary = watch('itinerary');

    // Effects
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCards();
                setCategories(fetchedCategories);
            } catch (error) {
                toast.error('Failed to fetch categories');
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        // Update preview image when imageSrc changes
        setPreviewImage(imageSrc);
    }, [imageSrc]);

    // Handlers
    const handleInfoSectionChange = (index: number, field: 'title' | 'content', value: string) => {
        const newSections = [...infoSections];
        newSections[index][field] = value;
        setInfoSections(newSections);

        // Convert to desired JSON format
        const otherInfo = {
            info: infoSections.reduce(
                (acc, section) => {
                    if (section.title) {
                        acc[section.title] = section.content;
                    }
                    return acc;
                },
                {} as Record<string, string>
            ),
            disclaimer,
        };

        setValue('otherInfo', otherInfo);
    };

    const addInfoSection = () => {
        setInfoSections([...infoSections, { title: '', content: '' }]);
    };

    const removeInfoSection = (index: number) => {
        const newSections = infoSections.filter((_, i) => i !== index);
        setInfoSections(newSections);

        // Update form value after removing section
        const updatedInfo = newSections.reduce(
            (acc, section) => {
                if (section.title) {
                    acc[section.title] = section.content;
                }
                return acc;
            },
            {} as Record<string, string>
        );

        setValue('otherInfo', {
            info: updatedInfo,
            disclaimer,
        });
    };

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numDays = parseInt(e.target.value) || 1;
        const numNights = Math.max(0, numDays - 1);

        setValue('days', numDays);
        setValue('nights', numNights);

        // Preserve existing itinerary data while updating for new days
        const itineraryObj: Record<string, DayItinerary> = {};
        for (let i = 1; i <= numDays; i++) {
            const dayKey = `day${i}`;
            itineraryObj[dayKey] = currentItinerary[dayKey] || {
                brief: '',
                description: '',
            };
        }
        setValue('itinerary', itineraryObj);
    };

    const handleItineraryChange = (day: number, field: 'brief' | 'description', value: string) => {
        const dayKey = `day${day}`;
        setValue('itinerary', {
            ...currentItinerary,
            [dayKey]: {
                ...currentItinerary[dayKey],
                [field]: value,
            },
        });
    };

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const validateForm = (data: PackageFormData): boolean => {
        // Basic validation
        if (!data.title?.trim()) {
            toast.error('Title is required');
            return false;
        }
        if (!data.description?.trim()) {
            toast.error('Description is required');
            return false;
        }
        if (!data.imageSrc?.trim()) {
            toast.error('Image URL is required');
            return false;
        }
        if (!data.theme) {
            toast.error('Please select a theme');
            return false;
        }
        if (!data.price || data.price <= 0) {
            toast.error('Price must be greater than 0');
            return false;
        }
        if (!data.location?.trim()) {
            toast.error('Location is required');
            return false;
        }

        // Allow nights to be zero if days is at least one
        if (data.days < 1) {
            toast.error('Days must be at least 1');
            return false;
        }

        // Validate nights only if days are greater than zero
        if (data.days === 1 && data.nights !== 0) {
            toast.error('If days are 1, nights must be 0');
            return false;
        }

        if (data.rating < 0 || data.rating > 5) {
            toast.error('Rating must be between 0 and 5');
            return false;
        }

        if (!data.pickup?.trim()) {
            toast.error('Pickup location is required');
            return false;
        }

        if (!data.drop?.trim()) {
            toast.error('Drop location is required');
            return false;
        }

        // Validate itinerary
        for (let i = 1; i <= data.days; i++) {
            const dayKey = `day${i}`;
            if (!data.itinerary[dayKey]?.brief?.trim() || !data.itinerary[dayKey]?.description?.trim()) {
                toast.error(`Please fill in all details for Day ${i}`);
                return false;
            }
        }

        return true; // All validations passed
    };

    const onSubmit = async (data: PackageFormData) => {
        if (!validateForm(data)) return;

        setIsLoading(true);
        try {
            // Ensure all numeric fields are properly converted to numbers
            const formattedData = {
                ...data,
                price: Number(data.price),
                days: Number(data.days),
                nights: Number(data.nights || 0), // Ensure nights is properly included
                rating: Number(data.rating),
                discount: Number(data.discount || 0),
                // Ensure otherInfo is properly structured
                otherInfo: {
                    info: infoSections.reduce(
                        (acc, section) => {
                            if (section.title) {
                                acc[section.title] = section.content;
                            }
                            return acc;
                        },
                        {} as Record<string, string>
                    ),
                    disclaimer: disclaimer || '',
                },
                // Ensure itinerary is properly structured
                itinerary: Object.fromEntries(
                    Array.from({ length: data.days }, (_, i) => {
                        const dayKey = `day${i + 1}`;
                        return [
                            dayKey,
                            {
                                brief: data.itinerary[dayKey]?.brief || '',
                                description: data.itinerary[dayKey]?.description || '',
                            },
                        ];
                    })
                ),
            };

            const response = await axios.post('/api/packages', formattedData);

            if (response.status === 200) {
                toast.success('Package created successfully');
                router.refresh();
                reset();
                setInfoSections([{ title: '', content: '' }]);
                setDisclaimer('');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data || 'Failed to create package');
                console.error('Package creation error:', error.response?.data);
            } else {
                toast.error('An unexpected error occurred');
                console.error('Package creation error:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const inputClassName =
        'w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 dark:bg-background';
    const labelClassName = 'block text-gray-700 dark:text-white text-sm font-semibold';
    const errorClassName = 'text-red-500 text-sm mt-1';

    return (
        <Section className="pt-10 pb-20">
            <Container className="w-full">
                <SectionHeading mainHeading="Create Package" subHeading="Fill in the details" />
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 px-3 flex flex-col gap-5">
                    {/* Theme Selection */}
                    <div className="space-y-4">
                        <label className={labelClassName}>
                            Select theme <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-5">
                            {categories.map((item) => {
                                const IconComponent = (LucideIcons as any)[item.icon] as LucideIcon;
                                return (
                                    <CategoryInput
                                        key={item.label}
                                        onClick={(theme) => setCustomValue('theme', theme)}
                                        selected={theme === item.label}
                                        label={item.label}
                                        icon={IconComponent}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClassName}>
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('title', { required: 'Title is required' })}
                                placeholder="Package title"
                                className={inputClassName}
                            />
                            {errors.title && <span className={errorClassName}>{errors.title.message as string}</span>}
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClassName}>
                                Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('location', { required: 'Location is required' })}
                                placeholder="Package location"
                                className={inputClassName}
                            />
                            {errors.location && (
                                <span className={errorClassName}>{errors.location.message as string}</span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClassName}>
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            placeholder="Package description"
                            className={inputClassName}
                        />
                        {errors.description && (
                            <span className={errorClassName}>{errors.description.message as string}</span>
                        )}
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClassName}>
                            Image URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={imageSrc}
                            onChange={(e) => setCustomValue('imageSrc', e.target.value)}
                            placeholder="Enter image URL"
                            className={inputClassName}
                        />
                        {previewImage && (
                            <div className="mt-2">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-w-[200px] h-auto rounded"
                                    onError={() => setPreviewImage('')}
                                />
                            </div>
                        )}
                    </div>

                    {/* Numeric Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Price */}
                        <div className="flex flex-col gap-2 relative">
                            <label className={labelClassName}>
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                {...register('price', {
                                    required: 'Price is required',
                                    min: { value: 1, message: 'Price must be greater than 0' },
                                })}
                                placeholder="Package price"
                                className={inputClassName}
                            />
                            {errors.price && <span className={errorClassName}>{errors.price.message as string}</span>}
                        </div>

                        {/* Days */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClassName}>
                                Days <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                {...register('days', {
                                    required: 'Days is required',
                                    min: { value: 1, message: 'Must be at least 1 day' },
                                })}
                                onChange={handleDaysChange}
                                placeholder="Number of days"
                                className={inputClassName}
                            />
                            {errors.days && <span className={errorClassName}>{errors.days.message as string}</span>}
                        </div>

                        {/* Nights (Calculated) */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClassName}>Nights</label>
                            <input type="number" {...register('nights')} readOnly className={inputClassName} />
                        </div>

                        {/* Rating */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClassName}>
                                Rating (0-5) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                {...register('rating', {
                                    required: 'Rating is required',
                                    min: { value: 0, message: 'Minimum rating is 0' },
                                    max: { value: 5, message: 'Maximum rating is 5' },
                                })}
                                placeholder="Package rating"
                                className={inputClassName}
                            />
                            {errors.rating && <span className={errorClassName}>{errors.rating.message as string}</span>}
                        </div>

                        {/* Discount */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClassName}>Discount (%)</label>
                            <input
                                type="number"
                                {...register('discount', {
                                    min: { value: 0, message: 'Minimum discount is 0%' },
                                    max: { value: 100, message: 'Maximum discount is 100%' },
                                })}
                                placeholder="Discount percentage"
                                className={inputClassName}
                            />
                            {errors.discount && (
                                <span className={errorClassName}>{errors.discount.message as string}</span>
                            )}
                        </div>
                    </div>

                    {/* Pickup and Drop Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Pickup */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClassName}>
                                Pickup Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('pickup', { required: 'Pickup location is required' })}
                                placeholder="Enter pickup location"
                                className={inputClassName}
                            />
                            {errors.pickup && <span className={errorClassName}>{errors.pickup.message as string}</span>}
                        </div>

                        {/* Drop */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClassName}>
                                Drop Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('drop', { required: 'Drop location is required' })}
                                placeholder="Enter drop location"
                                className={inputClassName}
                            />
                            {errors.drop && <span className={errorClassName}>{errors.drop.message as string}</span>}
                        </div>
                    </div>

                    {/* Other Info Section */}
                    <div className="border-b border-t py-5 my-5">
                        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>

                        {/* Info Sections */}
                        {infoSections.map((section, index) => (
                            <div key={index} className="mb-6 p-4 bg-gray-50 dark:bg-[#111111] rounded border">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-medium">Information Section {index + 1}</h4>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeInfoSection(index)}
                                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                                            aria-label="Remove section"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Section Title"
                                        value={section.title}
                                        onChange={(e) => handleInfoSectionChange(index, 'title', e.target.value)}
                                        className={inputClassName}
                                    />
                                    <textarea
                                        placeholder="Section Content"
                                        value={section.content}
                                        onChange={(e) => handleInfoSectionChange(index, 'content', e.target.value)}
                                        className={inputClassName}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Add Section Button */}
                        <button
                            type="button"
                            onClick={addInfoSection}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <Plus size={18} />
                            <span>Add Information Section</span>
                        </button>

                        {/* Disclaimer */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-2">Disclaimer</label>
                            <textarea
                                placeholder="Enter package disclaimer"
                                value={disclaimer}
                                onChange={(e) => {
                                    setDisclaimer(e.target.value);
                                    setValue('otherInfo', {
                                        ...watch('otherInfo'),
                                        disclaimer: e.target.value,
                                    });
                                }}
                                className={inputClassName}
                            />
                        </div>
                    </div>

                    {/* Itinerary Section */}
                    <div className="border-b border-t py-5 my-5">
                        <h3 className="text-lg font-semibold mb-4">Daily Itinerary</h3>

                        {Array.from({ length: days }).map((_, index) => (
                            <div key={index} className="mb-6 p-4 bg-gray-50 dark:bg-[#111111] rounded border">
                                <h4 className="text-md font-medium mb-3">Day {index + 1}</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className={labelClassName}>
                                            Brief <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Brief description of the day"
                                            value={currentItinerary[`day${index + 1}`]?.brief || ''}
                                            onChange={(e) => handleItineraryChange(index + 1, 'brief', e.target.value)}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClassName}>
                                            Detailed Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            placeholder="Detailed description of activities"
                                            value={currentItinerary[`day${index + 1}`]?.description || ''}
                                            onChange={(e) =>
                                                handleItineraryChange(index + 1, 'description', e.target.value)
                                            }
                                            className={inputClassName}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="py-5 px-10 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full text-center text-white hover:scale-105 transition-all duration-300"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Creating Package...</span>
                            </>
                        ) : (
                            <span>Create Package</span>
                        )}
                    </button>
                </form>
            </Container>
        </Section>
    );
};

export default PackageForm;
