import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import SingleProfilePage from "./SingleProfilePage";

const page = async ({ params }) => {
  const { username } = await params;

  await dbConnect();

  try {
    const user = await UserModel.findOne({ username }).select("-password");

    if (!user)
      return (
        <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
          404 User not found
        </div>
      );

    return <SingleProfilePage user={user} />;
  } catch (error) {
    console.log("Error getting user profile", error);
    return (
      <div className="pt-[76px]">Error while getting the user profile</div>
    );
  }
};

export default page;
