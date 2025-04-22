import { decrypt } from "@/lib/aes-algorithm";
import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import UserModel from "@/models/user";
import { VerificationCodeModel } from "@/models/verification";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  // Example - localhost:3000/verify?q=ENCRYPTED_USERNAME
  const { searchParams } = new URL(request.url);
  const encryptedUsername = searchParams.get("q");

  // username decrypted using AES algorithm
  const decryptedUserId = await decrypt(encryptedUsername);
  console.log("Decrypted username - ", decryptedUserId);

  try {
    // Delete all the verification codes that is expired
    await VerificationCodeModel.deleteMany({
      expires: { $lt: new Date() },
    });

    // Get the verification code and username from the request body
    const { code, userId } = await request.json();

    if (!code || !userId) {
      return sendErrorResponse("Missing required fields", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendErrorResponse("Invalid user ID", 400);
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return sendErrorResponse("User not found", 404);
    }

    if (user._id.toString() !== decryptedUserId) {
      return sendErrorResponse("Only owner can verify his account", 400);
    }

    if (user.isVerified) {
      return sendErrorResponse("User already verified", 400);
    }

    const verificationCode = await VerificationCodeModel.findOne({
      userId: user._id,
      code,
    });

    if (!verificationCode) {
      console.log(verificationCode, code);
      return sendErrorResponse("Invalid verification code", 400);
    }

    if (verificationCode.expires < new Date()) {
      return sendErrorResponse("Verification code expired", 400);
    }

    if (verificationCode.code !== code) {
      return sendErrorResponse("Verification code is invalid", 400);
    }

    user.isVerified = true;
    await user.save();
    await verificationCode.deleteOne();

    // ✅ Delete all other unverified accounts with same username or email
    await UserModel.deleteMany({
      _id: { $ne: user._id }, // Not the verified user
      isVerified: false,
      $or: [{ email: user.email }, { username: user.username }],
    });

    return sendSuccessResponse("User verified successfully", 200);
  } catch (error) {
    console.log("Error verifying user", error);
    return sendErrorResponse("Error verifying user", 500);
  }
}
