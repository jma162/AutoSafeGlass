import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "trustmuhammadimedical@gmail.com",
        pass: "fxjqiyaquedqyyjj",
      },
    });

    const userMailOptions = {
      from: `"Kapstone-Clinic" <${'trustmuhammadimedical@gmail.com'}>`,
      to: email,
      subject: "Thank you for contacting AutoSafeGlass",
      html: `
        <h2>Thank you for contacting AutoSafeGlass!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a summary of your submission:</p>
        <ul>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>If you have any urgent inquiries, please call us at 1-888-4-FIX-GLASS.</p>
        <p>Best regards,<br>The AutoSafeGlass Team</p>
      `,
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
