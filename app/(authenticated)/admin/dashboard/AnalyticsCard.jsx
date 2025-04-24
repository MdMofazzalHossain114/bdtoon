import { H1, H2, H3 } from "@/components/ui/typography";
import React from "react";

const AnalyticsCard = ({ title, count, description, comment }) => {
  return (
    <div className="px-6 py-4 border-[1px] border-white/30 rounded-md w-fit">
      <div>
        <p className="text-sm opacity-70">{title}</p>
        <H2>{count}</H2>
      </div>

      <div>
        <div className="flex items-center gap-x-2">
          <p>{comment}</p>
        </div>
        <p className="opacity-70">{description}</p>
      </div>
    </div>
  );
};

export default AnalyticsCard;
