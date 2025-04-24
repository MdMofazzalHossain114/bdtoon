import { cn } from "@/lib/utils";
import React from "react";

const IconButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        "bg-white/10 p-2 rounded-full border-1 border-white/0 transition-colors hover:bg-white/10 hover:border-white/40 active:bg-white/30 active:border-white/100 hover:cursor-pointer text-white/60 hover:text-white group",
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
