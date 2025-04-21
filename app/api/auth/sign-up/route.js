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
import { encryptUserId } from "@/lib/aes-algorithm";

export async function POST(request) {
  await dbConnect();

  try {
    const { username, firstname, lastname, email, password } =
      await request.json();

    const result = await signUpSchema.safeParseAsync({
      username,
      firstname,
      lastname,
      email,
      password,
    });

    if (!result.success) {
      console.log("Validation Error - ", result.error);
      return sendErrorResponse(result.error.message || "Validation Error", 400);
    }

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return sendErrorResponse("Username is already taken", 400);
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const { code, expiryDate } = await generateCodeAndExpiry();
    let encryptedUserId;
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return sendErrorResponse("User already by this email", 400);
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.password = hashedPassword;
        await existingUserByEmail.save();
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

      console.log(newUser);
      encryptedUserId = await encryptUserId(newUser._id);

      await newUser.save();
      await newCode.save();
      console.log("Verification code created : ", newCode);
    }
    // send verification email
    const subject = "BDTOON Account Verification";
    const html = VerificationEmail({ username, code });
    /*
    const emailResponse = await sendEmail({ to: email, subject, html });

    if (!emailResponse.success) {
      return sendErrorResponse(emailResponse.message, 500);
    }
*/

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
        userId: encryptedUserId,
      },
      { status: 201 }
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
