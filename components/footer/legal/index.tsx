import React from 'react';
import ActiveLink from '@/components/ui/features/ActiveLink';
import { MdKeyboardArrowRight } from 'react-icons/md';

const LegalFooter = () => {
    return (
        <div className="">
            <h1 className="text-xl font-semibold">Legal</h1>
            <div className="mt-4 ml-5 flex flex-col gap-2 font-medium">
                <div className="flex gap-1">
                    <div className="mt-[2px]">
                        <MdKeyboardArrowRight size={20} />
                    </div>
                    <ActiveLink href="/privacy-policy" text="Privacy Policy" />
                </div>
                <div className="flex gap-1">
                    <div className="mt-[2px]">
                        <MdKeyboardArrowRight size={20} />
                    </div>
                    <ActiveLink href="/term-condition" text="Terms & Condition" />
                </div>
                <div className="flex gap-1">
                    <div className="mt-[2px]">
                        <MdKeyboardArrowRight size={20} />
                    </div>
                    <ActiveLink href="/refund-cancellation-policy" text="Refund & Cancellation Policy" />
                </div>
            </div>
        </div>
    );
};

export default LegalFooter;
