import { getAuthenticatedUser } from "@/lib/helpers/user";
import { redirect } from "next/navigation";
import LeftSidebar from "./LeftSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

const layout = async ({ children }) => {
  const user = await getAuthenticatedUser();

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="w-full h-full bg-background flex">
      <div className="h-full w-3/12">
        <LeftSidebar />
      </div>
      <div className="w-9/12">{children}</div>
    </div>
  );
};

export default layout;
