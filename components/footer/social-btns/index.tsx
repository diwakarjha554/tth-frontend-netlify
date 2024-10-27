'use client';

import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";

interface SocialBtnsProps {
    className?: string;
};

const SocialBtns: React.FC<SocialBtnsProps> = ({ className }) => {
    return (
        <div className={`${className} flex gap-5 flex-wrap`}>
            <Link
                href="https://www.facebook.com/profile.php?id=61563380759807"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-100 dark:bg-neutral-800 hover:text-white rounded-full w-10 h-10 items-center justify-center flex hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:via-purple-500 dark:hover:to-pink-500"
            >
                <TiSocialFacebook size={28}/>
            </Link>
            <Link
                href="https://www.linkedin.com/company/102316821/admin/feed/posts/?feedType=following"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-100 dark:bg-neutral-800 hover:text-white rounded-full w-10 h-10 items-center justify-center flex hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:via-purple-500 dark:hover:to-pink-500"
            >
                <TiSocialLinkedin size={28}/>
            </Link>
            <Link
                href="https://twitter.com/TTrailHolidays"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-100 dark:bg-neutral-800 hover:text-white rounded-full w-10 h-10 items-center justify-center flex hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:via-purple-500 dark:hover:to-pink-500"
            >
                <FaXTwitter size={20}/>
            </Link>
            <Link
                href="https://www.instagram.com/traveltrailholidays/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-100 dark:bg-neutral-800 hover:text-white rounded-full w-10 h-10 items-center justify-center flex hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:via-purple-500 dark:hover:to-pink-500"
            >
                <FaInstagram size={20}/>
            </Link>
        </div>
    )
}

export default SocialBtns;