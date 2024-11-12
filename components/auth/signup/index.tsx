'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
}

interface ApiError {
    message: string;
}

const Signup = () => {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const inputClassName =
        'w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 sm:min-w-[350px]';
    const labelClassName = 'block text-gray-700 dark:text-white text-sm font-semibold mb-1';
    const errorClassName = 'text-red-500 text-sm mt-1';

    const startResendTimer = () => {
        setResendDisabled(true);
        setCountdown(30);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post<ApiResponse>('/api/auth/send-otp', { email });
            if (response.data.success) {
                setStep(2);
                startResendTimer();
            }
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            toast.error('Failed to send OTP')
            // setError(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/verify-otp', { email, otp });
            if (response.data.success) {
                setStep(3);
            }
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            setError(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data: SignupFormData = {
            name: formData.get('name') as string,
            email: email,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        };

        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/auth/signup', data);
            if (response.data.success) {
                window.location.href = '/dashboard';
            }
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            setError(error.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const renderStep1 = () => (
        <form onSubmit={handleSendOtp} className="mt-10 flex flex-col gap-5">
            <div>
                <label htmlFor="email" className={labelClassName}>
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className={inputClassName}
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </div>
            {error && <div className={errorClassName}>{error}</div>}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-5 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full text-center text-white hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send OTP'}
                </button>
            </div>
        </form>
    );

    const renderStep2 = () => (
        <form onSubmit={handleVerifyOtp} className="mt-10 flex flex-col gap-5">
            <div className="flex items-center gap-2 mb-4">
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft size={20} />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">OTP sent to: {email}</span>
            </div>
            <div>
                <label htmlFor="otp" className={labelClassName}>
                    Enter OTP <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP sent to your email"
                    className={inputClassName}
                    value={otp}
                    onChange={handleOtpChange}
                    required
                    maxLength={6}
                />
            </div>
            {error && <div className={errorClassName}>{error}</div>}
            <div className="flex flex-col gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-5 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full text-center text-white hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                    type="button"
                    disabled={resendDisabled}
                    onClick={(e) => handleSendOtp(e as unknown as FormEvent<HTMLFormElement>)}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                </button>
            </div>
        </form>
    );

    // Rest of the component remains the same...
    const renderStep3 = () => (
        <form onSubmit={handleSignup} className="mt-10 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="name" className={labelClassName}>
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" placeholder="enter your name" className={inputClassName} required />
                </div>

                <div>
                    <label htmlFor="email" className={labelClassName}>
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={email} disabled className={inputClassName} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="password" className={labelClassName}>
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="password"
                            className={inputClassName}
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className={labelClassName}>
                        Confirm password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="confirm password"
                            className={inputClassName}
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
            </div>
            {error && <div className={errorClassName}>{error}</div>}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-5 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full text-center text-white hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? 'Creating Account...' : 'Signup'}
                </button>
            </div>
        </form>
    );

    return (
        <Section className="py-10 md:py-20">
            <Container>
                <div className="border p-5 rounded dark:bg-border">
                    <span className="text-2xl font-semibold">Create an account</span>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}

                    <div className="my-5 border-b dark:border-gray-500"></div>
                    <div
                        onClick={() => signIn('google')}
                        className="dark:border-gray-500 flex items-center justify-center gap-3 border py-3 rounded cursor-pointer bg-background hover:bg-border"
                    >
                        <FcGoogle size={24} />
                        Continue with Google
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Signup;
