import { auth } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  const session = await auth();

  console.log(session);

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default layout;
