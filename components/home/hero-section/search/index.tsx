'use client';

import React, { useCallback, useState } from 'react';
import SelectDestination from './select-destination';
import SelectDuration from './select-duration';
import SelectMonth from './select-month';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

interface SearchProps {
    className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedDuration, setSelectedDuration] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');

    const router = useRouter();
    const params = useSearchParams();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLocation(e.target.value);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDuration(e.target.value);
    };

    const handleMonthSelect = (selectedMonth: string) => {
        setSelectedMonth(selectedMonth);
    };

    const isFormValid = selectedLocation !== '';

    const onSubmit = useCallback(async () => {
        if (!isFormValid) {
            return;
        }

        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());

            const updatedQuery = {
                ...currentQuery,
                ...(selectedLocation && { dest: selectedLocation }),
                ...(selectedDuration && { duration: selectedDuration }),
                ...(selectedMonth && { month: selectedMonth }),
            };

            const url = qs.stringifyUrl(
                {
                    url: '/packages',
                    query: updatedQuery,
                },
                { skipNull: true }
            );

            router.push(url);
        }
    }, [selectedLocation, selectedDuration, selectedMonth, params, router, isFormValid]);
    return (
        <div
            className={`
                ${className} 
                md:p-5 lg:p-1 xl:p-3 text-start w-full md:w-[90%] md:backdrop-filter md:backdrop-blur-md md:bg-opacity-30 md:bg-gray-500 rounded text-white flex flex-col lg:flex-row gap-5 lg:gap-1 mt-10
            `}
        >
            <SelectDestination />
            <SelectDuration />
            <SelectMonth />
            <div
                onClick={onSubmit}
                className="py-5 px-10 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full lg:w-fit text-center"
            >
                Search
            </div>
        </div>
    );
};

export default Search;
