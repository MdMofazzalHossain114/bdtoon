import { model, models, Schema } from "mongoose";

// Schemas for verification and password reset

const verificationCodeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const passwordResetTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Models for verification and password reset

const VerificationCodeModel =
  models?.VerificationCode || model("VerificationCode", verificationCodeSchema);

const PasswordResetTokenModel =
  models?.PasswordResetToken ||
  model("PasswordResetToken", passwordResetTokenSchema);

// Exporting the models

export { PasswordResetTokenModel, VerificationCodeModel };
