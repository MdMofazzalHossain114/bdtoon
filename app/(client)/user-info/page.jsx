import { auth } from "@/auth";
import Image from "next/image";

export default async function UserInfo() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <h1>User Information</h1>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>

      <Image
        src={session.user.image}
        alt={session.user.name}
        height={100}
        width={100}
        className="rounded-full"
      />
    </div>
  );
}
