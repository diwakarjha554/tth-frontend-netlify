import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { destination, date, days, name, email, phone } = await request.json();

  // Create a Nodemailer transporter for Zoho Mail
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '465'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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
      <h2>New quote request received:</h2>
      <p><strong>Destination:</strong> ${destination}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Number of Days:</strong> ${days}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
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
