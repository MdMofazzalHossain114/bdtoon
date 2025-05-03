import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import AccountApproval from "@/models/account-approval";
import UserModel from "@/models/user";

export async function POST(request) {
  const { userId, link } = await request.json();

  console.log("Sending Portfolio", userId, link);
  await dbConnect();

  try {
    const user = await UserModel.findById(userId);

    if (!user) return sendErrorResponse("User not found", 404);

    if (user.role === "creator")
      return sendErrorResponse("Already a creator", 400);

    const accountApproval = await AccountApproval.findOne({ userId });

    if (accountApproval) return sendErrorResponse("Already sent an approval.");

    const newAccountApproval = new AccountApproval({
      userId,
      portfolioLink: link,
    });

    await newAccountApproval.save();

    return sendSuccessResponse("Portfolio sent successfully");
  } catch (error) {
    console.log(error);

    return sendErrorResponse("Error sending portfolio", 500);
  }
}
