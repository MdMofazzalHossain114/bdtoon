"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const HomePage = () => {
  const session = useSession();
  console.log("Homepage -", session);

  if (session.status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div>
      <h1>Home Page</h1>

      <Button variant="destructive" onClick={() => signOut()}>
        Log Out
      </Button>
    </div>
  );
};

export default HomePage;
