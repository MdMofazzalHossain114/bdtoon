import { encrypt } from "@/lib/aes-algorithm";
import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import UserModel from "@/models/user";
import { compare } from "bcryptjs";

export async function POST(request) {
  await dbConnect();
  const { identifier, password } = await request.json();

  try {
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return sendErrorResponse(
        "Account not found. Provide a valid email or username",
        400,
        "identifier"
      );
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return sendErrorResponse("Incorrect password", 400, "password");
    }

    if (!user.isVerified) {
      const encryptedPassword = await encrypt(password);
      const encryptedUserId = await encrypt(user._id.toString());

      return Response.json(
        {
          success: true,
          message: "User is not verified",
          field: "identifier",
          toVerify: true,
          encryptedUserId,
          encryptedPassword,
        },
        { status: 200 }
      );
    }

    return sendSuccessResponse("User exists and is verified", 200);
  } catch (error) {
    console.log("Error checking if user exists", error);
    return sendErrorResponse("Error checking if user exists", 500);
  }
}
