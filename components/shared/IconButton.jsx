import { cn } from "@/lib/utils";
import React from "react";

const IconButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        "p-2 rounded-full border-1 border-white/0 transition-colors hover:cursor-pointer group text-muted-foreground bg-muted",
        className
      )}
      {...rest}
    >
      <div className="group-active:scale-110 transition duration-[50] ">
        {children}
      </div>
    </button>
  );
};

export default IconButton;
