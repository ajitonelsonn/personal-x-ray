// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your X-ray Portal Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; text-align: center;">X-ray Portal Verification</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin-bottom: 20px;">Your verification code is:</p>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px;">
            ${otp}
          </div>
          <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
            This code will expire in 10 minutes.
          </p>
        </div>
        <p style="color: #6b7280; font-size: 12px; text-align: center;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}
