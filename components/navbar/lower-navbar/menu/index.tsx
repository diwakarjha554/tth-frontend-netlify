'use client';

import React, { useEffect, useState } from 'react';
import Avatar from '@/components/ui/features/Avatar';
import MenuItems from '@/components/navbar/lower-navbar/menu/menu-items';
import DarkModeBtn from '@/components/navbar/lower-navbar/menu/dark-mode-btn';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { RiHeartFill, RiLogoutCircleRLine } from 'react-icons/ri';
import getCurrentUser from '@/actions/auth/get-current-user-actions';
import { signOut } from 'next-auth/react';
import SideBar from './sidebar';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const currentUser = getCurrentUser();

    const onClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && !(event.target instanceof HTMLElement && event.target.closest('.modal'))) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full lg:border-2 dark:border-gray-500/50 py-2 lg:p-2 flex items-center gap-2 cursor-pointer"
            >
                <HiOutlineMenuAlt3 className="h-6 w-6 lg:h-auto lg:w-auto" />
                <Avatar src={currentUser?.image} className="w-[30px] h-[30px] hidden lg:block" />
            </div>
            {isOpen && (
                <div className="modal hidden lg:block absolute bg-background border top-10 lg:top-[55px] right-0 rounded-xl w-64 p-1">
                    {currentUser ? (
                        <>
                            <div className="flex items-center gap-3 px-3 h-16 bg-background rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500/40 cursor-pointer">
                                <Avatar src={currentUser?.image} className="w-9 h-9" />
                                <h1 className="font-medium">{currentUser.name}</h1>
                            </div>
                            <MenuItems
                                href="/wishlist"
                                title="Wishlist"
                                icon={RiHeartFill}
                                className="bg-background rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500/40"
                            />
                            <DarkModeBtn />
                            <MenuItems
                                onClick={() => signOut()}
                                href=""
                                title="Logout"
                                icon={RiLogoutCircleRLine}
                                className="bg-background rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500/40"
                            />
                        </>
                    ) : (
                        <>
                            <MenuItems
                                href="/auth/login"
                                title="Login"
                                icon={AiOutlineUser}
                                className="bg-background rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500/40"
                            />
                            <DarkModeBtn />
                        </>
                    )}
                </div>
            )}
            {isOpen && (
                <div className='modal lg:hidden'>
                    <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
                </div>
            )}
        </div>
    );
};

export default Menu;
