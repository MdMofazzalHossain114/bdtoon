import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getAuthenticatedUser = async () => {
  const session = await auth();

  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return session.user;
};
