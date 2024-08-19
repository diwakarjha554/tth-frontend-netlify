<<<<<<< HEAD
import Image from 'next/image';
import React from 'react';

const PackageCard = () => {
    return (
        <div className="group rounded-xl w-full cursor-pointer relative">
            <div className="relative overflow-hidden h-[230px] rounded-t">
                <Image
                    fill
                    src="/packageImage.webp"
                    alt="package"
                    className="object-cover group-hover:scale-110 transition-all ease-in-out duration-300 select-none"
                />
            </div>
            <div className="py-3 px-2 bg-gray-50 dark:bg-[#111111]">hello</div>
        </div>
    );
};

export default PackageCard;
=======
import Image from 'next/image';
import React from 'react';

const PackageCard = () => {
    return (
        <div className="shadow dark:shadow-gray-500/50 group rounded-xl w-full cursor-pointer relative">
            <div className="relative overflow-hidden h-[230px] rounded-t">
                <Image
                    fill
                    src="/packageImage.webp"
                    alt="package"
                    className="object-cover group-hover:scale-110 transition-all ease-in-out duration-300 select-none"
                />
            </div>
            <div className="py-3 px-2 bg-gray-50 dark:bg-[#111111]">hello</div>
        </div>
    );
};

export default PackageCard;
>>>>>>> 2aa6a9046d4f547693f75125295e3b64f240be2a
