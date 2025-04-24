import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["guest", "user", "creator", "client", "admin"],
      default: "guest",
    },
    accountType: {
      type: String,
      enum: ["viewer", "seller", "buyer"],
      default: "viewer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned", "suspended"],
      default: "active",
    },
    bio: {
      type: String,
      default: "",
    },
    themePreference: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models?.User || mongoose.model("User", userSchema);

export default UserModel;
