import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import AccountApproval from "@/models/account-approval";

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const approvalAccounts = await AccountApproval.find().populate(
      "userId",
      "username firstname lastname email status role"
    );

    return sendSuccessResponse("Got all approvals", 200, approvalAccounts);
  } catch (error) {
    console.log(error);

    return sendErrorResponse("Error while getting all approvals", 500);
  }
}
