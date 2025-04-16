import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully", info };
  } catch (error) {
    console.log("Error sending email", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
