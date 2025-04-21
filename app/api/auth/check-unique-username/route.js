import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import UserModel from "@/models/user";
import { usernameValidation } from "@/lib/schema/signUpSchema";
import { z } from "zod";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request) {
  await dbConnect();

  try {
    // localhost:3000/api/cuu?username=USERNAME
    const { searchParams } = new URL(request.url);

    const queryParam = { username: searchParams.get("username") };

    //validate with zod
    const result = usernameQuerySchema.safeParse(queryParam);

    console.log(result);

    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];

      return sendErrorResponse("Invalid username", 400);
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return sendErrorResponse("Username is already taken", 400);
    }

    return sendSuccessResponse("Username available", 200);
  } catch (error) {
    console.log("Checking username error", error);
    return sendErrorResponse("Error checking username", 500);
  }
}
