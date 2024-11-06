'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, [setIsBrowser]);

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeydown);
            document.body.style.overflow = 'hidden'; // Restrict background activities
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
            }, 300);
        } else {
            document.removeEventListener('keydown', handleKeydown);
            document.body.style.overflow = 'auto'; // Restore background activities
        }

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            document.body.style.overflow = 'auto'; // Ensure background activities are restored
        };
    }, [isOpen, onClose]);

    if (!isBrowser) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-white bg-opacity-50 transition-opacity dark:bg-opacity-10 dark:transition-opacity ${
                isOpen ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
            onClick={handleClose}
        >
            <div
                className={`bg-background rounded shadow-lg w-full max-w-md transform transition-all duration-300 ${
                    isAnimating ? 'scale-100' : 'scale-95'
                }`}
            >
                <div className="border-b relative text-center w-full p-3">
                    <span className="text-lg font-semibold">{title}</span>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <IoMdClose size={20} onClick={onClose} className="cursor-pointer" />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
