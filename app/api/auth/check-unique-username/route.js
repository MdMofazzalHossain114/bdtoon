import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { usernameValidation } from "@/schema/singUpSchema";
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

      return Response.json(
        {
          success: false,
          message: "Invalid username",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    console.log("success");
    return Response.json(
      {
        success: true,
        message: "Username available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Checking username error", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
