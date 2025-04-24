import { getAuthenticatedUser } from "@/lib/helpers/user";

const page = async () => {
  const user = await getAuthenticatedUser();

  console.log(user);

  return <div>Admin Dashboard</div>;
};

export default page;
