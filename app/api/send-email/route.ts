import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create nodemailer transporter
    // For Gmail, you need to use an App Password, not your regular password
    // Go to: Google Account > Security > 2-Step Verification > App passwords
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'hotmail', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your app password
      },
    });

    // Alternative configuration for custom SMTP (like Outlook, custom domain, etc.)
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com' or 'smtp-mail.outlook.com'
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    // Email to yourself (receiving the contact form submission)
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email where you want to receive messages
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #00d8ff; border-bottom: 2px solid #00d8ff; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong></p>
            <p style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">${name}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong></p>
            <p style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #00d8ff; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #333;">Message:</strong></p>
            <p style="margin: 10px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Received on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Received on: ${new Date().toLocaleString()}
      `,
    };

    // Auto-reply email to the sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #00d8ff; border-bottom: 2px solid #00d8ff; padding-bottom: 10px;">Thank You for Reaching Out!</h2>
          
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            Hi <strong>${name}</strong>,
          </p>
          
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #00d8ff; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #333; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            I typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out to me directly at 
            <a href="mailto:${process.env.EMAIL_USER}" style="color: #00d8ff; text-decoration: none;">${process.env.EMAIL_USER}</a>.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            Best regards,<br>
            <strong>Rajeevan Sharan</strong>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px; text-align: center;">
            <p style="margin: 5px 0;">This is an automated response from my portfolio website.</p>
            <p style="margin: 5px 0;">Please do not reply to this email.</p>
          </div>
        </div>
      `,
      text: `
Hi ${name},

Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.

Your message:
${message}

I typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out to me directly at ${process.env.EMAIL_USER}.

Best regards,
Rajeevan Sharan
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToSender);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully! I will get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again later.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
