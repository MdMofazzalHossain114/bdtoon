import { getAuthenticatedUser } from "@/lib/helpers/user";
import { redirect } from "next/navigation";
import LeftSidebar from "./LeftSidebar";

const layout = async ({ children }) => {
  const user = await getAuthenticatedUser();

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="w-full h-full flex">
      <LeftSidebar />
      {children}
    </div>
  );
};

export default layout;
