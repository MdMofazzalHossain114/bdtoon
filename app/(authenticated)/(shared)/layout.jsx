import { getAuthenticatedUser } from "@/lib/helpers/user";
import Topbar from "./Topbar";

const layout = async ({ children }) => {
  const user = await getAuthenticatedUser();

  return (
    <>
      <Topbar />
      {children}
    </>
  );
};

export default layout;
