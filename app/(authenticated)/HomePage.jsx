"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, P } from "@/components/ui/typography";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const HomePage = () => {
  const session = useSession();
  console.log("Homepage -", session);

  if (session.status === "unauthenticated") {
    redirect("/login");
  }

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  return <div>Home Page</div>;
};

export default HomePage;
