'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import SectionHeading from '@/components/ui/section-heading';
import { createTheme } from '@/actions/theme-select.actions';

const CreateTheme = () => {
    const [label, setLabel] = useState('');
    const [iconName, setIconName] = useState('');
    const [description, setDescription] = useState('');
    const [touched, setTouched] = useState({ label: false, iconName: false, description: false });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await createTheme({ label, iconName, description });
            if (result.success) {
                toast.success('Theme created successfully!');
                router.push('/');
            } else {
                toast.error(result.error || 'Failed to create theme');
            }
        } catch (err) {
            toast.error('Failed to create theme. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    return (
        <Section className="pt-10 pb-20">
            <Container className="w-full flex flex-col gap-10">
                <SectionHeading mainHeading="Create Theme" subHeading="Create new theme" />
                <form onSubmit={handleSubmit} className="space-y-6 pt-8 pb-10">
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="label"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Label <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="label"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                onBlur={() => handleBlur('label')}
                                required
                                disabled={isLoading}
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.label && !label ? 'border-red-500' : 'border-gray-300'
                                } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                placeholder="Enter label"
                            />
                            {touched.label && !label && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="iconName"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Icon Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="iconName"
                                value={iconName}
                                onChange={(e) => setIconName(e.target.value)}
                                onBlur={() => handleBlur('iconName')}
                                required
                                disabled={isLoading}
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.iconName && !iconName ? 'border-red-500' : 'border-gray-300'
                                } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                placeholder="Enter icon name"
                            />
                            {touched.iconName && !iconName && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
                            >
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onBlur={() => handleBlur('description')}
                                required
                                disabled={isLoading}
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
                                    touched.description && !description ? 'border-red-500' : 'border-gray-300'
                                } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                rows={4}
                                placeholder="Enter description"
                            ></textarea>
                            {touched.description && !description && (
                                <p className="text-red-500 text-xs mt-1">Please fill out this field.</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`py-5 px-10 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full lg:w-fit text-center text-white hover:scale-105 transition-all duration-300 ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                'Create Theme'
                            )}
                        </button>
                    </div>
                </form>
            </Container>
        </Section>
    );
};

export default CreateTheme;
