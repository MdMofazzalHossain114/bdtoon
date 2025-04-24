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
      Session Update Page
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Page;
