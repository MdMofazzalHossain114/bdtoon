import Card from "@/components/shared/Card";
import CardTitle from "@/components/shared/CardTitle";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import React from "react";

const GigCard = () => {
  return (
    <div className="border border-foreground/20 p-2 rounded-md px-4 hover:bg-foreground/5 cursor-pointer">
      <div className="w-full flex items-center">
        <h1 className="font-semibold w-full">
          I will create professional 2D Animation
        </h1>
        <div className="font-semibold dark:text-emerald-500 text-emerald-800 bg-green-500/20 p-1 rounded-md px-2 min-w-fit">
          From $100
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, deserunt,
        obcaecati, aliquam voluptates quis cupiditate reiciendis sequi maxime
        animi exercitationem quidem minus. Accusamus tempora laboriosam totam
        praesentium dolor fugiat modi.
      </p>
    </div>
  );
};

const PopularGigs = () => {
  return (
    <Card>
      <CardTitle>
        <h1 className="flex items-center gap-x-2">
          <Star />
          Popular Gigs
        </h1>
        <Button variant="ghost">Browse All</Button>
      </CardTitle>
      {/* Popular Gigs Lists */}
      <div className="flex flex-col gap-y-2 overflow-auto max-h-[250px]">
        <GigCard />
        <GigCard />
        <GigCard />
        <GigCard />
      </div>
    </Card>
  );
};

export default PopularGigs;
