// lib/email/templates.js

import { VerificationEmail } from "@/components/templates/verificationEmail";
import { ForgotPasswordEmail } from "@/components/templates/forgotPasswordEmail";
import { NotificationEmail } from "@/components/templates/notificationEmail";

export function getEmailTemplate(type, data) {
  switch (type) {
    case "verification":
      return {
        subject: "BDTOON Account Verification",
        html: VerificationEmail(data.username, data.code),
      };
    case "forgotPassword":
      return {
        subject: "Reset Your BDTOON Password",
        html: ForgotPasswordEmail(data.username, data.resetLink),
      };
    case "notification":
      return {
        subject: "BDTOON Notification",
        html: NotificationEmail(data.title, data.message),
      };
    default:
      throw new Error("Unknown email type");
  }
}
