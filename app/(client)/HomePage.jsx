"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={() => logout()} variant="destructive">
        Log Out
      </Button>
    </div>
  );
}
