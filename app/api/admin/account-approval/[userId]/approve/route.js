import dbConnect from "@/lib/dbConnect";
import { sendErrorResponse } from "@/lib/helpers/responseHelpers";
import AccountApproval from "@/models/account-approval";
import UserModel from "@/models/user";

export async function POST({ params }) {
  const { userId } = await params;
  await dbConnect();

  try {
    const user = await UserModel.findById(userId);

    if (!user) return sendErrorResponse("User not found", 404);

    const approveAccount = await AccountApproval.findOne({ userId });

    if (!approveAccount)
      return sendErrorResponse("No approal request found", 404);
  } catch (error) {
    console.log(error);

    return sendErrorResponse("Error approving account", 500);
  }
}
