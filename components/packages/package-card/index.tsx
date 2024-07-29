import Image from 'next/image';
import React from 'react'

const PackageCard = () => {
  return (
    <div className='shadow dark:shadow-gray-500/50 group rounded max-w-[362px] w-full cursor-pointer relative'>
      <div className='relative overflow-hidden h-[230px]'>
        <Image
          fill
          src='/packageImage.webp'
          alt='package'
          className='rounded-t  object-cover group-hover:scale-110 transition'
        />
      </div>
      <div className='py-3 px-2 bg-gray-50 dark:bg-[#111111]'>
        hello
      </div>
    </div>
  )
}

export default PackageCard;