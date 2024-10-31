'use client';

import React from 'react';
import ActiveLink from '@/components/ui/features/ActiveLink';
import { MdKeyboardArrowRight } from 'react-icons/md';

const QuickLinksFooter = () => {
    return (
        <div className="">
            <h1 className="text-xl font-semibold">Quick Links</h1>
            <div className="mt-4 ml-5 flex flex-col gap-2 font-medium">
                <div className="flex gap-1">
                    <div className="mt-[2px]">
                        <MdKeyboardArrowRight size={20} />
                    </div>
                    <ActiveLink href="/" text="Home" />
                </div>
                <div className="flex gap-1">
                    <div className="mt-[2px]">
                        <MdKeyboardArrowRight size={20} />
                    </div>
                    <ActiveLink href="/packages" text="Packages" />
                </div>
                <div className="flex gap-1">
                    <div className="mt-[2px]">
                        <MdKeyboardArrowRight size={20} />
                    </div>
                    <ActiveLink href="/about-us" text="About Us" />
                </div>
                <div className="flex gap-1">
                    <div className="mt-[2px]">
                        <MdKeyboardArrowRight size={20} />
                    </div>
                    <ActiveLink href="/payments" text="Payments" />
                </div>
            </div>
        </div>
    );
};

export default QuickLinksFooter;
