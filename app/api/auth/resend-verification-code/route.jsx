import { decrypt } from "@/lib/aes-algorithm";
import dbConnect from "@/lib/dbConnect";
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

export async function POST(request) {
  await dbConnect();

  try {
    const { encryptedUserId } = await request.json();

    const decryptedUserId = await decrypt(encryptedUserId);

    console.log(decryptedUserId);

    // Get the user by id
    const user = await UserModel.findById(decryptedUserId);

    // delete all the verification codes that is expired
    await deleteAllExpiredVerificationCodes();

    if (!user) {
      return sendErrorResponse("User not found", 404);
    }

    if (user.isVerified) {
      return sendErrorResponse("User already verified", 400);
    }

    // Generate a new verification code
    const { code, expiryDate } = await generateCodeAndExpiry();

    // Save the verification code
    console.log("Verification code generated : ", code);

    const existingVerificationCode = await VerificationCodeModel.findOne({
      userId: user._id,
    });

    if (existingVerificationCode) {
      if (
        existingVerificationCode.attempts >= 3 &&
        existingVerificationCode.expires > new Date()
      ) {
        console.log("Too many attempts");
        return sendErrorResponse("Too many attempts", 400);
      }

      // Update Code, Expiry Date and Attempts
      existingVerificationCode.code = code;
      existingVerificationCode.expires = expiryDate;
      existingVerificationCode.attempts += 1;
      await existingVerificationCode.save();
    } else {
      // New Verification Code
      const newVerificationCode = new VerificationCodeModel({
        userId: user._id,
        code,
        expires: expiryDate,
      });

      await newVerificationCode.save();
    }

    return sendSuccessResponse("Verification code sent successfully");
  } catch (error) {
    console.log("Error resending verification code", error);
    return sendErrorResponse("Error resending verification code", 500);
  }
}
