import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import AnalyticsCard from "./AnalyticsCard";

const page = async () => {
  await dbConnect();

  const usersCount = await UserModel.countDocuments();

  console.log(usersCount);

  return <div className="w-full h-full bg-red-500">Hello world</div>;
};

export default page;
