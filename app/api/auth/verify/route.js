import { decryptUsername } from "@/lib/aes-algorithm";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { VerificationCodeModel } from "@/models/verification";

export async function POST(request) {
  await dbConnect();

  // Example - localhost:3000/verify?q=ENCRYPTED_USERNAME
  const { searchParams } = new URL(request.url);
  const encryptedUsername = searchParams.get("q");
  const username = decryptUsername(encryptedUsername);
  console.log("Decrypted username - ", username);

  try {
    const { code, username } = await request.json();

    if (!code || !username) {
      return Response.json(
        {
          success: false,
          message: "Code and username are required",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.username !== username) {
      return Response.json(
        {
          success: false,
          message: "Only owner can verify his account",
        },
        { status: 400 }
      );
    }

    if (user.isVerified) {
      return Response.json(
        {
          success: false,
          message: "User already verified",
        },
        { status: 400 }
      );
    }

    const verificationCode = await VerificationCodeModel.findOne({
      userId: user._id,
      code,
    });

    if (verificationCode.expires < new Date()) {
      return Response.json(
        {
          success: false,
          message: "Verification code expired",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    await user.save();
    await verificationCode.deleteOne();

    return Response.json(
      {
        success: true,
        message: "User verified successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 }
    );
  }
}
