import Image from 'next/image';
import React from 'react';

interface ReviewsCardProps {
    name: string;
    img?: string;
    reviewText: string;
};

const ReviewsCard: React.FC<ReviewsCardProps> = ({ name, img, reviewText }) => {
  return (
    <div className='flex flex-col items-center sm:px-7 md:px-14 lg:px-20 transition'>
        <span className='text-center text-xl'>
            {reviewText}
        </span>
        <div className='border-b border-black dark:border-gray-500 w-[30%] mt-5'></div>
        <Image 
            src={img || '/testimonial/noProfile.webp'}
            alt=''
            width={1000}
            height={1000}
            className='object-cover rounded-full select-none mt-10 h-[65px] w-[65px]'
        />
        <span className='mt-3 text-lg font-medium'>
            {name}
        </span>
    </div>
  )
}

export default ReviewsCard;