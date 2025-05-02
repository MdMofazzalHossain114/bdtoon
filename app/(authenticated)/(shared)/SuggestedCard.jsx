import AvatarItem from "@/components/shared/AvatarItem";
import CardTitle from "@/components/shared/CardTitle";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const SuggestedCard = () => {
  return (
    <div className="bg-card rounded-lg p-4 w-full shadow-lg border border-foreground/20 dark:shadow-foreground/10">
      <CardTitle>
        <div className="flex items-center justify-between gap-x-2">
          <Lightbulb />
          Suggested
        </div>
        <Button variant="ghost">View All</Button>
      </CardTitle>

      <div className="flex flex-col max-h-[170px] overflow-auto gap-y-1">
        <AvatarItem />
        <AvatarItem />
        <AvatarItem />
        <AvatarItem />
        <AvatarItem />
      </div>
    </div>
  );
};

export default SuggestedCard;
