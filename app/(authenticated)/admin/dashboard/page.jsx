import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import AnalyticsCard from "./AnalyticsCard";
import TotalCount from "./TotalCount";
import { RoleDist } from "./RoleDistribution";
import { ActiveUsers } from "./ActiveUsers";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
const page = async () => {
  await dbConnect();

  const usersCount = await UserModel.countDocuments();

  console.log(usersCount);

  return (
    <div className="w-full h-full p-4">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
