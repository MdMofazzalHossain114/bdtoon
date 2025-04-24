import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Feed from "./Feed";

const page = () => {
  return (
    <div className="w-full h-full flex pt-[76px]">
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
};

export default page;
