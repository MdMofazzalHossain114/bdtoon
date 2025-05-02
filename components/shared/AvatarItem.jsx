import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { P } from "../ui/typography";

const AvatarItem = () => {
  return (
    <div className="w-full flex items-center justify-between gap-4 hover:bg-foreground/10 px-2 py-1 rounded-md cursor-pointer">
      <div className="flex gap-x-2">
        <div className="lg:block hidden">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <P className="font-medium">Username</P>
          <p className="text-xs">Motion Graphics</p>
        </div>
      </div>
      <div>
        <Button className="relative z-10 cursor-pointer peer">
          <Plus />
          <p>Follow</p>
        </Button>
      </div>
    </div>
  );
};

export default AvatarItem;
