import { cn } from "@/lib/utils";
import React from "react";

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-card p-4 rounded-md shadow-lg dark:shadow-foreground/10 border border-foreground/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
