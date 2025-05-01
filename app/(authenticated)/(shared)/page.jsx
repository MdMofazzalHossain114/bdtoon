import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Feed from "./Feed";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/helpers/user";

const page = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  if (user && user.role === "guest") {
    redirect("/setup-your-profile");
  }

  return (
    <div className="w-full h-full flex pt-[76px] bg-background">
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
};

export default page;
