'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { RiHeartFill, RiLogoutCircleRLine, RiHome4Line } from 'react-icons/ri';
import { BsInfoCircle } from 'react-icons/bs';
import { FaRegCreditCard } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import Avatar from '@/components/ui/features/Avatar';
import DarkModeBtn from '../dark-mode-btn';
import getCurrentUser from '@/actions/auth/get-current-user-actions';

interface SideBarProps {
    onClose: () => void;
    isOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ onClose, isOpen }) => {
    const pathname = usePathname();
    const currentUser = getCurrentUser();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { href: '/', text: 'Home', icon: RiHome4Line },
        { href: '/packages', text: 'Packages', icon: RiHome4Line },
        { href: '/about-us', text: 'About Us', icon: BsInfoCircle },
        { href: '/payments', text: 'Payments', icon: FaRegCreditCard },
    ];

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.sidebar-content')) {
            onClose();
        }
    };

    const NavLink = ({
        href,
        text,
        icon: Icon,
    }: {
        href: string;
        text: string;
        icon: React.ComponentType<{ size: number }>;
    }) => {
        const isActive = pathname === href;

        return (
            <motion.div
                variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: 20 },
                }}
            >
                <Link
                    href={href}
                    onClick={() => onClose()}
                    className={`
                        group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 
                        ${
                            isActive
                                ? 'bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }
                        hover:scale-[0.98]
                    `}
                >
                    <div
                        className={`
                        p-2 rounded-lg transition-colors
                        ${
                            isActive
                                ? 'bg-violet-200 dark:bg-violet-800/30 text-violet-600 dark:text-violet-400'
                                : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600 dark:group-hover:text-violet-400'
                        }
                    `}
                    >
                        <Icon size={20} />
                    </div>
                    <span className="font-medium">{text}</span>
                </Link>
            </motion.div>
        );
    };

    const ActionButton = ({
        icon: Icon,
        text,
        onClick,
    }: {
        icon: React.ComponentType<{ size: number }>;
        text: string;
        onClick: () => void;
    }) => (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-[0.98] group"
        >
            <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg group-hover:bg-violet-100 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                <Icon size={20} />
            </div>
            <span className="font-medium">{text}</span>
        </button>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            className="fixed top-0 right-0 h-full w-[300px] bg-background z-50 shadow-2xl sidebar-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-200 hover:rotate-90 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <IoMdClose size={24} />
                            </motion.button>

                            {currentUser && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="p-6 mt-14 border-b dark:border-gray-800 bg-background"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <Avatar
                                                src={currentUser?.image}
                                                className="w-12 h-12 ring-2 ring-primary/20"
                                            />
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                                        </div>
                                        <div>
                                            <h2 className="font-semibold text-lg">{currentUser.name}</h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back!</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <nav className="p-6 bg-gray-50 dark:bg-gray-900 h-full">
                                <motion.div
                                    className="flex flex-col gap-2"
                                    initial="closed"
                                    animate="open"
                                    variants={{
                                        open: {
                                            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                                        },
                                        closed: {
                                            transition: { staggerChildren: 0.05, staggerDirection: -1 },
                                        },
                                    }}
                                >
                                    {navLinks.map((link) => (
                                        <NavLink key={link.href} {...link} />
                                    ))}
                                </motion.div>
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-0 w-full p-6 border-t dark:border-gray-800 bg-background"
                            >
                                {currentUser ? (
                                    <>
                                        <ActionButton
                                            icon={RiHeartFill}
                                            text="Wishlist"
                                            onClick={() => {
                                                onClose();
                                                window.location.href = '/wishlist';
                                            }}
                                        />
                                        <div className="my-4">
                                            <DarkModeBtn />
                                        </div>
                                        <ActionButton
                                            icon={RiLogoutCircleRLine}
                                            text="Logout"
                                            onClick={() => {
                                                onClose();
                                                signOut();
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <ActionButton
                                            icon={AiOutlineUser}
                                            text="Login"
                                            onClick={() => {
                                                onClose();
                                                window.location.href = '/auth/login';
                                            }}
                                        />
                                        <div className="my-4">
                                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <DarkModeBtn />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SideBar;
