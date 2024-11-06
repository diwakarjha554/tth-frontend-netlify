'use client';

import React from 'react';

interface SignUpModalProps {
    onSwitchToLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onSwitchToLogin }) => {
    return (
        <div className="p-5 w-full flex flex-col gap-3">
            <span className="font-semibold text-lg">Welcome to Travel Trail Holidays</span>
            <form className="space-y-3">
                <div>
                    <input
                        type="text"
                        placeholder="Email Id"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full text-center text-white hover:scale-[1.01] transition-all duration-300"
                >
                    Sign Up
                </button>
            </form>
            <div className="font-semibold text-sm">
                Already have an account?{' '}
                <span onClick={onSwitchToLogin} className="cursor-pointer text-blue-600 hover:underline">
                    Login
                </span>
            </div>
        </div>
    );
};

export default SignUpModal;
