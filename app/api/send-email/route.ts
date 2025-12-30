import { NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/browser';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, zipCode, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact me directly.' },
        { status: 500 }
      );
    }

    // Send email using EmailJS
    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        from_first_name: firstName,
        from_last_name: lastName,
        from_email: email,
        from_phone: phone || 'Not provided',
        from_zipcode: zipCode || 'Not provided',
        message: message,
      },
      publicKey
    );

    if (result.text === 'OK') {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or email me directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
