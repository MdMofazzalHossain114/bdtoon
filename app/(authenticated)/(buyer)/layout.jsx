import { getAuthenticatedUser } from "@/lib/helpers/user";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  const user = await getAuthenticatedUser();

  if (user.role !== "buyer") {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default layout;
