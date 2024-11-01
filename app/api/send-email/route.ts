import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { destination, date, days, name, email, phone } = await request.json();

  // Create a Nodemailer transporter for Gmail
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Ensure this is set to 'smtp.gmail.com'
    port: parseInt(process.env.EMAIL_PORT || '587'), // Ensure this is set to '587'
    secure: process.env.EMAIL_SECURE === 'true', // Should be false for port 587
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'New Quote Request',
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

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
