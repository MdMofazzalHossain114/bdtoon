import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import UserModel from "@/models/user";

export async function GET(req, { params }) {
  const { userId } = await params;

  await dbConnect();

  try {
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return sendSuccessResponse("User not found", 404);
    }

    console.log(user);

    return Response.json(
      { success: true, message: "User information retrieved", user },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching user", error);
    return sendErrorResponse("Error fetching user", 500);
  }
}
