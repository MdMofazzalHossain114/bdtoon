import { Loader2 } from "lucide-react";
import React from "react";

const FullScreenLoading = ({ label = "Loading" }) => {
  return (
    <div className="fixed top-0 left-0 z-50 text-xl gap-x-4 font-semibold w-full h-full flex items-center justify-center bg-foreground/30">
      <Loader2 className="animate-spin" />
      {label}
    </div>
  );
};

export default FullScreenLoading;
