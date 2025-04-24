import { auth } from "@/auth";
import { getAuthenticatedUser } from "@/lib/helpers/user";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  const user = await getAuthenticatedUser();

  return <>{children}</>;
};

export default layout;
