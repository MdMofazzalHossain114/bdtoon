import { auth, signOut } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/lib/helpers/responseHelpers";
import UserModel from "@/models/user";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req, { params }) {
  const { userId } = await params;
  console.log(userId);

  await dbConnect();

  const session = await auth();

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return sendErrorResponse("No file uploaded", 400);
    }

    if (session.user.id !== userId) {
      return sendErrorResponse("Unauthorized access", 401);
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return sendErrorResponse("User not found", 404);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(
      process.cwd(),
      "public/storage/users/images/profile-picture",
      filename
    );

    await writeFile(filePath, buffer);

    const fileUrl = `/storage/users/images/profile-picture/${filename}`;

    // Update profile picture
    user.profilePicture = fileUrl;
    user.role = "user";
    await user.save();

    return sendSuccessResponse("Upload successful", 200, { url: fileUrl });
  } catch (error) {
    console.log("Error updating user profile picture:", error);
    return sendErrorResponse("Failed to update user profile picture", 500);
  }
}

export async function GET(req, { params }) {
  const { userId } = await params;
  console.log(userId);

  try {
    // Check if user is authenticated
    const session = await auth();

    if (!session.user.id === userId) {
      return sendErrorResponse("Unauthorized access", 401);
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return sendErrorResponse("User not found", 404);
    }

    // Skip profile setup
    user.displayName = user.firstname;
    user.role = "user";
    await user.save();

    return sendSuccessResponse("Profile setup skipped successful", 200);
  } catch (error) {
    console.log("API Error while skipping profile setup:", error);
    return sendErrorResponse("Error while skipping profile setup", 500);
  }
}
