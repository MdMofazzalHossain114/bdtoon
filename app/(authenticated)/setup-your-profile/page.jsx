import { auth } from "@/auth";
import ProfileSetupPage from "./ProfileSetupPage";

const page = async () => {
  const session = await auth();

  return <ProfileSetupPage />;
};

export default page;
