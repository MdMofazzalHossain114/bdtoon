import dbConnect from "@/lib/dbConnect";
import { sendEmail } from "@/lib/email/sendEmail";
import { VerificationEmail } from "@/lib/email/VerificationEmail";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import {
  deleteAllExpiredVerificationCodes,
  generateCodeAndExpiry,
} from "@/lib/helpers/verificationCode";
import UserModel from "@/models/user";
import { VerificationCodeModel } from "@/models/verification";
import { signUpSchema } from "@/lib/schema/signUpSchema";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { encrypt } from "@/lib/aes-algorithm";

export async function POST(request) {
  let encryptedUserId;

  await dbConnect();

  try {
    const {
      username: originalUsername,
      firstname: originalFirstname,
      lastname: originalLastname,
      email: originalEmail,
      password,
      confirmPassword,
    } = await request.json();

    const username = originalUsername.toLowerCase().trim();
    const email = originalEmail.toLowerCase().trim();
    const firstname = originalFirstname.trim();
    const lastname = originalLastname.trim();

    const result = await signUpSchema.safeParseAsync({
      username,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      console.log("Validation Error - ", result.error);
      return sendErrorResponse(result.error.message || "Validation Error", 400);
    }

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username: username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return sendErrorResponse("Username is already taken", 400, "username");
    }

    const existingUserByEmail = await UserModel.findOne({
      email: email,
    });
    const { code, expiryDate } = await generateCodeAndExpiry();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return sendErrorResponse(
          "User already exists by this email",
          400,
          "email"
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.password = hashedPassword;
        await existingUserByEmail.save();

        encryptedUserId = await encrypt(existingUserByEmail._id.toString());

        console.log(encryptedUserId);
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      await deleteAllExpiredVerificationCodes();

      const newCode = new VerificationCodeModel({
        userId: newUser._id,
        code,
        expires: expiryDate,
      });

      console.log(newUser._id.toString());
      encryptedUserId = await encrypt(newUser._id.toString());

      await newUser.save();
      await newCode.save();
      // console.log("Verification code created : ", newCode);
    }

    // send verification email
    const subject = "BDTOON Account Verification";
    const html = VerificationEmail({ username, code });

    const emailResponse = await sendEmail({ to: email, subject, html });

    if (!emailResponse.success) {
      return sendErrorResponse(emailResponse.message, 500);
    }

    const encryptedPassword = await encrypt(password);

    return sendSuccessResponse(
      "User registered successfully. Please verify your email",
      201,
      { userId: encryptedUserId, encryptedPassword }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation Error:", error.errors);
      return sendErrorResponse(error.errors[0].message, 400); // Optionally show the first error
    }

    console.error("Error registering user", error);
    return sendErrorResponse("Error registering user", 500);
  }
}
