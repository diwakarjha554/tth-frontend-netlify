import React from 'react';
import SelectDestination from './select-destination';
import SelectDuration from './select-duration';
import SelectMonth from './select-month';

interface SearchProps {
    className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
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
            <div className="py-5 px-10 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full lg:w-fit text-center">
                Search
            </div>
        </div>
    );
};

export default Search;
