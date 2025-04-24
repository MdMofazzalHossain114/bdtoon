import { auth } from "@/auth";
import ProfileSetupPage from "./ProfileSetupPage";
import UserModel from "@/models/user";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";

const page = async () => {
  const session = await auth();

  return <ProfileSetupPage />;
};

export default page;
