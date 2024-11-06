'use client';

import React, { useCallback } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas/login.schema';

const SignUpModal = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const handleLogin = useCallback(()=>{
        
    }, [])
    return (
        <div className="p-5 w-full flex flex-col gap-3">
            <span className="font-semibold text-lg">Welcome to Travel Trail Holidays</span>
            <form onSubmit={form.handleSubmit(() => {})} className="space-y-3">
                <div className="">
                    <input
                        type="text"
                        placeholder="Email Id"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />
                </div>
                <div className="">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-5 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full text-center text-white hover:scale-[1.01] transition-all duration-300"
                >
                    Login
                </button>
            </form>
            <div className='font-semibold text-sm'>
                Dont have an account? <span onClick={handleLogin} className='cursor-pointer text-blue-600 hover:underline'>Sign Up</span>
            </div>
        </div>
    );
};

export default SignUpModal;
