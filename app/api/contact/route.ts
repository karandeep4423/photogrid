import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "bachiwind3@gmail.com",
      pass: process.env.NEXT_PUBLIC_GMAIL || "", // Ensure you have this environment variable set
    },
  });

  const info = {
    from: '"Photo Grid" <bachiwind3@gmail.com>',
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(info);
  } catch (err) {
    return NextResponse.json({
      success: false,
      Error: "Internal Server Error",
    });  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { email, name, phone, message } = await req.json();
    const to = "karanhanju9696@gmail.com";
    const subject = "Message from Photo Grid";
    const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const html = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          h1 {
            color: #0066cc;
          }
          p {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1><strong>Name:</strong> ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      </body>
    </html>
  `;

    await sendMail(to, subject, text, html);
    return NextResponse.json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
