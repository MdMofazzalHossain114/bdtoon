import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import AnalyticsCard from "./AnalyticsCard";

const page = async () => {
  await dbConnect();

  const usersCount = await UserModel.countDocuments();

  console.log(usersCount);

  return (
    <div className="w-full h-full">
      <div className="p-10 flex flex-wrap gap-x-10 gap-y-4">
        <AnalyticsCard
          title="Total Users"
          count={usersCount}
          description="Accounts created till now"
          comment="Has a positive growth"
        />
        <AnalyticsCard
          title="Total Users"
          count={usersCount}
          description="Accounts created till now"
          comment="Has a positive growth"
        />
        <AnalyticsCard
          title="Total Users"
          count={usersCount}
          description="Accounts created till now"
          comment="Has a positive growth"
        />
        <AnalyticsCard
          title="Total Users"
          count={usersCount}
          description="Accounts created till now"
          comment="Has a positive growth"
        />
      </div>
    </div>
  );
};

export default page;
