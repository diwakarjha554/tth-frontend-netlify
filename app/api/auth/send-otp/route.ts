import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter once, outside the handler
const transporter = nodemailer.createTransport({
    host: 'live.smtp.mailtrap.io',
    port: 587,
    auth: {
        user: 'api',
        pass: 'bdd265e2cd7569087d15e23683fd8b38',
    },
});

export async function POST(request: Request) {
    try {
        if (request.method !== 'POST') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const data = await request.json();
        const { email } = data;

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        // Save OTP to database
        await prisma.oTP.create({
            data: {
                email,
                otp,
                expiresAt,
            },
        });

        console.log(email, otp);
        // Send email
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `testing`,
            text: `
                New quote request received
            `,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Email Verification</h2>
                <p>Your OTP for account verification is:</p>
                <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                <p>This OTP will expire in 5 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
                </div>
            `,
        };

        // Send email with a timeout promise
        const emailPromise = transporter.sendMail(mailOptions);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Email sending timeout')), 25000); // 25 seconds timeout
        });

        await Promise.race([emailPromise, timeoutPromise]);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json({ success: false, message: 'Failed to send OTP' }, { status: 500 });
    }
}
