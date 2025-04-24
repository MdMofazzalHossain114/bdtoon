import AvatarItem from "@/components/shared/AvatarItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1, H3, P } from "@/components/ui/typography";
import { ChartSpline } from "lucide-react";

const TrendigTags = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 w-full gap-y-4">
      <H3>Trending Tags</H3>
      <div className="flex items-center">
        <p className="text-sm opacity-80 bg-white/20 p-2 py-1 rounded-md">
          Motion Graphics
        </p>
      </div>
    </div>
  );
};
const SuggestedCard = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 w-full">
      <H3>Suggested</H3>
      <div className="flex flex-col gap-y-4 py-4">
        <AvatarItem />
        <AvatarItem />
        <AvatarItem />
      </div>
    </div>
  );
};

const LeftSidebar = () => {
  return (
    <nav className="w-0 p-4 h-full hidden lg:w-1/5 lg:flex lg:flex-col gap-y-4">
      {/* Suggested Card */}
      <SuggestedCard />
      <TrendigTags />
    </nav>
  );
};

export default LeftSidebar;
