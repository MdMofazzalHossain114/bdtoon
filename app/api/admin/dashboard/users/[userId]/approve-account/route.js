import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import AccountApproval from "@/models/account-approval";
import UserModel from "@/models/user";

export async function POST(request, { params }) {
  const { userId } = await params;
  await dbConnect();
  try {
    const user = await UserModel.findById(userId);

    if (!user) return sendErrorResponse("User not found", 404);

    const accountApproval = await AccountApproval.findOne({ userId });

    if (!accountApproval) return sendErrorResponse("Approval not found", 404);

    accountApproval.adminComment = "Welcome to our creator's panel";
    accountApproval.reviewedAt = new Date();
    user.role = "creator";

    await accountApproval.save();
    await user.save();
  } catch (error) {
    console.log(error);
    return sendErrorResponse("Error approving account", 500);
  }
}
