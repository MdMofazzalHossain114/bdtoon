import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Feed from "./Feed";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session.user.role === "guest") {
    redirect("/setup-your-profile");
  }

  return (
    <div className="w-full h-full flex pt-[76px]">
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
};

export default page;
