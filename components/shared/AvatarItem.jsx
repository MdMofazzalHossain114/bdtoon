import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { P } from "../ui/typography";

const AvatarItem = () => {
  return (
    <div className="w-full flex items-center justify-between gap-4 hover:bg-white/10 p-2 rounded-md cursor-pointer">
      <div className="flex gap-x-2">
        <div className="lg:block hidden">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <P>Username</P>
          <p className="text-[12px] text-gray-300">Motion Graphics</p>
        </div>
      </div>
      <div>
        <Button className="cursor-pointer">
          <Plus />
          <p>Follow</p>
        </Button>
      </div>
    </div>
  );
};

export default AvatarItem;
