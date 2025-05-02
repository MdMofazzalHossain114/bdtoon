import CardTitle from "@/components/shared/CardTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const Tag = ({ children, href }) => {
  return (
    <Badge variant="tag" className="rounded-sm">
      <Link href={href} className="flex items-center">
        #{children}
      </Link>
    </Badge>
  );
};

const TrendingTagsCard = () => {
  return (
    <div className="bg-card rounded-lg p-4 w-full flex flex-col text-foreground border border-foreground/20 shadow-lg dark:shadow-foreground/10">
      <CardTitle>
        <div className="flex items-center justify-between gap-x-2">
          <TrendingUp />
          Trending Tags
        </div>
        <Button variant="ghost">View All</Button>
      </CardTitle>

      {/* Trending Tags Lists */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <Tag href="#">Animation</Tag>
        <Tag href="#">Motion Graphics</Tag>
        <Tag href="#">Video Editing</Tag>
        <Tag href="#">Animation</Tag>
        <Tag href="#">Motion Graphics</Tag>
        <Tag href="#">Animation</Tag>
        <Tag href="#">Video Editing</Tag>
        <Tag href="#">Video Editing</Tag>
      </div>
    </div>
  );
};

export default TrendingTagsCard;
