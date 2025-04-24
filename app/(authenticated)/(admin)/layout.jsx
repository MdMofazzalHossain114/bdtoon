import { getAuthenticatedUser } from "@/lib/helpers/user";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  const user = await getAuthenticatedUser();

  if (user.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
};

export default layout;
