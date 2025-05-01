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
    <SidebarProvider>
      <AppSidebar>
        <SidebarTrigger />
        {children}
      </AppSidebar>
    </SidebarProvider>
  );
};

export default layout;
