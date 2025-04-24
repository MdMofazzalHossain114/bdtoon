import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import UserModel from "@/models/user";

export async function GET(request) {
  await dbConnect();

  try {
    const users = await UserModel.find({});

    const totalUsers = users.length;

    return sendSuccessResponse("Analytics", 200, {
      totalUsers,
    });
  } catch (error) {
    console.log("API Error getting analytics", error);
    return sendErrorResponse("Error getting analytics", 500);
  }
}
