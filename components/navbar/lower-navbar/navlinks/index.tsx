import ActiveLink from '@/components/ui/features/ActiveLink';
import React from 'react';

const Navlinks = () => {
    return (
        <div className="flex gap-4 font-semibold">
            <ActiveLink href="/" text="Home" />
            <ActiveLink href="/packages" text="Packages" />
            <ActiveLink href="/about-us" text="About Us" />
            <ActiveLink href="/payments" text="Payments" />
        </div>
    );
};

export default Navlinks;
