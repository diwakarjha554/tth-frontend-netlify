'use client';

import React from 'react';
import IconLink from './icon-link';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { RiAccountCircleFill, RiAccountCircleLine } from 'react-icons/ri';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

const FooterBar = () => {
    return (
        <div className="fixed bg-background bottom-0 w-full z-30 px-3 py-2 border-t lg:hidden flex justify-around">
            <IconLink activeIcon={GoHomeFill} icon={GoHome} href="/" text="Home" />
            <IconLink activeIcon={IoIosHeart} icon={IoIosHeartEmpty} href="/wishlist" text="Wishlist" />
            <IconLink activeIcon={RiAccountCircleFill} icon={RiAccountCircleLine} href="/auth/login" text="Account" />
        </div>
    );
};

export default FooterBar;
