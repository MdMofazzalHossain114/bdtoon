import { model, models, Schema } from "mongoose";

const accountApprovalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    portfolioLink: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminComment: {
      type: String,
      default: "",
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const AccountApproval =
  models?.AccountApproval || model("AccountApproval", accountApprovalSchema);

export default AccountApproval;
