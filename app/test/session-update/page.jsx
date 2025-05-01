"use client";

import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, update } = useSession();

  const handleUpdate = async () => {
    const updatedSession = await update({
      ...session,
      role: "user",
      profilePicture: "/placeholder.svg",
    });

    console.log("Updated Session:", updatedSession);
  };

  console.log("Current Session:", session);

  return (
    <div>
      <div className="p-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <div className="rounded-lg bg-background text-foreground p-6">
          <p className="text-sm font-medium">Gradient Border Box</p>
          <p>This uses a 2px gradient border</p>
        </div>
      </div>
      Session Update Page
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Page;
