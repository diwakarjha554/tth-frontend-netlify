'use client';

import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/actions/auth/get-current-user-actions';

const Login = () => {
    const router = useRouter();
    const currentUser = getCurrentUser();
    useEffect(()=>{
        if (currentUser!=null) {
            router.push('/');
        }
    },[currentUser]);
    const inputClassName =
        'w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 sm:min-w-[350px]';
    const labelClassName = 'block text-gray-700 dark:text-white text-sm font-semibold mb-1';
    const handleSendOtp = () => {
        toast.error('temporarily unavailable!! Please continue with Google');
    };
    const handleSignIn = async () => {
        try {
            const result = await signIn('google', { redirect: false, callbackUrl: '/' });

            if (result && !result.error) {
                router.push('/');
            } else {
                console.error('Sign in error:', result?.error ?? 'Unknown error');
            }
        } catch (error) {
            console.error('Sign in error:', error);
        }
    };
    return (
        <Section className="py-10 md:py-20">
            <Container>
                <div className="border p-5 rounded dark:bg-border">
                    <span className="text-2xl font-semibold">Login</span>
                    <form className="mt-5 flex flex-col gap-5">
                        <div>
                            <label htmlFor="email" className={labelClassName}>
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                className={inputClassName}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <div
                                onClick={handleSendOtp}
                                className="py-2 px-5 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full text-center text-white hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
                            >
                                send OTP
                            </div>
                        </div>
                    </form>

                    <div className="my-5 border-b dark:border-gray-500"></div>
                    <div
                        onClick={handleSignIn}
                        className="dark:border-gray-500 flex items-center justify-center gap-3 border py-3 rounded cursor-pointer bg-background hover:bg-border px-5"
                    >
                        <FcGoogle size={24} />
                        Continue with Google
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Login;
