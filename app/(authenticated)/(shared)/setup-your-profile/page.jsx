import { auth } from "@/auth";
import ProfileSetupPage from "./ProfileSetupPage";
import UserModel from "@/models/user";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";

const page = async () => {
  const session = await auth();

  if (session.user.role !== "guest") {
    redirect("/");
  }

  return <ProfileSetupPage />;
};

export default page;
