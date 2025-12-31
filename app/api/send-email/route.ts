import { NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/nodejs';

export async function POST(request: NextRequest) {
  console.log('📧 Email API called at:', new Date().toISOString());
  
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log('📨 Request received:', {
      name,
      email,
      subject,
      messageLength: message?.length || 0
    });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    console.log('🔑 Environment variables check:', {
      serviceId: serviceId ? '✓' : '✗',
      templateId: templateId ? '✓' : '✗',
      publicKey: publicKey ? '✓' : '✗',
      privateKey: privateKey ? '✓' : '✗'
    });

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error('❌ EmailJS credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact me directly.' },
        { status: 500 }
      );
    }

    console.log('📤 Sending email via EmailJS...');
    
    // Send email using EmailJS Node.js SDK
    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        user_name: name,
        user_email: email,
        subject: subject,
        message: message,
      },
      {
        publicKey: publicKey,
        privateKey: privateKey,
      }
    );

    console.log('✅ EmailJS response:', {
      status: result.status,
      text: result.text
    });

    if (result.text === 'OK') {
      console.log('✅ Email sent successfully');
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    } else {
      console.log('⚠️ Unexpected response:', result);
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('❌ Email sending error:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or email me directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
