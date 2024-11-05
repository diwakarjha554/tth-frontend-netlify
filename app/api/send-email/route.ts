import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter once, outside the handler
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    // Add timeout settings
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000, // 10 seconds
    socketTimeout: 30000, // 30 seconds
});

interface QuoteRequest {
    destination: string;
    date: string;
    days: string;
    name: string;
    email: string;
    phone: string;
}

export async function POST(request: Request) {
    try {
        if (request.method !== 'POST') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const data: QuoteRequest = await request.json();
        const { destination, date, days, name, email, phone } = data;

        // Validate required fields
        if (!destination || !date || !days || !name || !email || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `${destination} Quote Request - ${phone}`,
            text: `
                New quote request received:
                
                Destination: ${destination}
                Date: ${date}
                Number of Days: ${days}
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f4f4f4; border-radius: 5px;">
                    <h2 style="color: #333;">New Quote Request Received:</h2>
                    <p><strong style="color: #555;">Destination:</strong> <span style="color: #333;">${destination}</span></p>
                    <p><strong style="color: #555;">Date:</strong> <span style="color: #333;">${date}</span></p>
                    <p><strong style="color: #555;">Number of Days:</strong> <span style="color: #333;">${days}</span></p>
                    <p><strong style="color: #555;">Name:</strong> <span style="color: #333;">${name}</span></p>
                    <p><strong style="color: #555;">Email:</strong> <span style="color: #333;">${email}</span></p>
                    <p><strong style="color: #555;">Phone:</strong> <span style="color: #333;">${phone}</span></p>
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
        console.error('Error sending email:', error);

        // Determine the appropriate error response
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        const statusCode = error instanceof Error && error.message === 'Email sending timeout' ? 504 : 500;

        return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }
}
