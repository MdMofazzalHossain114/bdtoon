import { decryptUserId } from "@/lib/aes-algorithm";
import dbConnect from "@/lib/dbConnect";
import { sendErrorResponse } from "@/lib/helpers/responseHelpers";
import { deleteAllExpiredVerificationCodes } from "@/lib/helpers/verificationCode";
import { VerificationCodeModel } from "@/models/verification";

export async function POST(request) {
  await dbConnect();

  try {
    const { encryptedUserId } = await request.json();

    const decryptedUserId = decryptUserId(encryptedUserId);

    // Get the user by id
    const user = await db.user.findById(decryptedUserId);

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

    const newVerificationCode = new VerificationCodeModel({
      userId: user._id,
      code,
      expires: expiryDate,
    });

    await newVerificationCode.save();
  } catch (error) {
    console.log("Error resending verification code", error);
    return sendErrorResponse("Error resending verification code", 500);
  }
}
