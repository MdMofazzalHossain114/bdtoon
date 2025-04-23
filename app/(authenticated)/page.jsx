import React from "react";
import HomePage from "./HomePage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session?.user?.role !== "guest") {
    redirect("/setup-your-profile");
  }

  return (
    <div>
      <h1>Authenitcated HomePage</h1>
      <HomePage />
    </div>
  );
};

export default page;
