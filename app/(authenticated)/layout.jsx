import { auth } from "@/auth";

const layout = async ({ children }) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  console.log(session);

  return <>{children}</>;
};

export default layout;
