"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

const page = () => {
  useEffect(() => {
    const logout = async () => {
      await signOut();
    };
    logout();
  }, []);

  return <div>page</div>;
};

export default page;
