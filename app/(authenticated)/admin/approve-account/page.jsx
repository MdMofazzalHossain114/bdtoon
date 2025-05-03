import React from "react";
import UserTable from "./ApproveTable";
import dbConnect from "@/lib/dbConnect";
import AccountApproval from "@/models/account-approval";

const page = async () => {
  await dbConnect();

  try {
    const rawApprovals = await AccountApproval.find()
      .populate("userId", "username email")
      .lean(); // Get plain JS objects

    const approvalAccounts = rawApprovals.map((item) => ({
      ...item,
      _id: item._id.toString(),
      userId: {
        ...item.userId,
        _id: item.userId._id.toString(),
      },
    }));

    return <UserTable data={approvalAccounts} />;
  } catch (error) {
    console.log(error);
    return <div>No data found</div>;
  }
};

export default page;
