"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

const page = () => {
  useEffect(() => {
    signOut();
  }, []);

  return <div>page</div>;
};

export default page;
