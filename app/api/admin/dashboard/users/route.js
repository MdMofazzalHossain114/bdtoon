import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import UserModel from "@/models/user";

export async function GET(request) {
  await dbConnect();

  try {
    const users = await UserModel.find({}).select("-password");

    return sendSuccessResponse("Users", 200, {
      users,
    });
  } catch (error) {
    console.log("API Error getting users", error);
    return sendErrorResponse("Error getting users", 500);
  }
}
