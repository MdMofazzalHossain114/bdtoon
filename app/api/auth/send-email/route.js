import { VerificationEmail } from "@/components/templates/verificationEmail";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, username } = await req.json();

    // Setup the transporter (Gmail in this case)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email, // or multiple recipients []
      subject: "BDTOON Account Verification",
      html: VerificationEmail(username, 123),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to send verification email",
      }),
      {
        status: 500,
      }
    );
  }
}
