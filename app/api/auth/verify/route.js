import { signIn } from "@/auth";
import { decrypt } from "@/lib/aes-algorithm";
import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import { deleteAllExpiredVerificationCodes } from "@/lib/helpers/verificationCode";
import UserModel from "@/models/user";
import { VerificationCodeModel } from "@/models/verification";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    // Delete all the verification codes that is expired
    await deleteAllExpiredVerificationCodes();

    // Get the verification code and username from the request body
    const { code, encryptedUserId, encryptedPassword } = await request.json();
    console.log(
      "Verify API Request - ",
      code,
      encryptedUserId,
      encryptedPassword
    );

    const userId = await decrypt(encryptedUserId);
    const password = await decrypt(encryptedPassword);

    console.log("User ID and Password - ", userId, password);

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

    if (user.isVerified) {
      return sendErrorResponse("User already verified", 400);
    }

    const verificationCode = await VerificationCodeModel.findOne({
      userId: user._id,
      code,
    });

    if (!verificationCode) {
      console.log("Invalid Verification Code", verificationCode, code);
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

    return sendSuccessResponse("User verified successfully", 200, {
      username: user.username,
      password,
    });
  } catch (error) {
    console.log("Error verifying user", error);
    return sendErrorResponse("Error verifying user", 500);
  }
}
