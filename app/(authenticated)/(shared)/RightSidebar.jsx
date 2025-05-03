"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  HelpCircle,
  LogOut,
  Rss,
  Settings,
  User,
} from "lucide-react";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import BecomeCreator from "./BecomeCreator";

const RightSidebar = () => {
  const { data, status } = useSession();

  console.log(data, status);
  const session = null;

  if (status === "loading") return <div>Loading</div>;

  if (data && status === "authenticated")
    return (
      <nav className="hidden lg:flex w-full  flex-col justify-between lg:w-1/5 p-4">
        {data.user.role === "user" && <BecomeCreator userId={data.user.id} />}
        <div className="flex flex-col items-center justify-center">
          <div>
            <Avatar className="h-[150px] w-[150px]">
              <AvatarImage
                src={data.user.profilePicture}
                alt={data.user.firstname + " " + data.user.lastname}
              />
              <AvatarFallback>
                {data.user && data.user.firstname.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-semibold pt-2">
              {data.user.firstname + " " + data.user.lastname}
            </h1>
            <p className="text-muted-foreground text-center">
              {data.user.username}
            </p>
          </div>
          <Button className="w-full h-14 text-lg font-semibold" variant="ghost">
            <Link
              href={`/${data.user.username}`}
              className="flex items-center gap-x-2"
            >
              <User />
              Profile
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg font-semibold" variant="ghost">
            <Link href={"/"} className="flex items-center gap-x-2">
              <Rss />
              Feeds
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg font-semibold" variant="ghost">
            <Link
              href={`/${data.user.username}/saved-gigs`}
              className="flex items-center gap-x-2"
            >
              <Bookmark />
              Saved
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg font-semibold" variant="ghost">
            <Link href={`/help`} className="flex items-center gap-x-2">
              <HelpCircle />
              Help
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg font-semibold" variant="ghost">
            <Link
              href={`/${data.user.username}/settings`}
              className="flex items-center gap-x-2"
            >
              <Settings />
              Settings
            </Link>
          </Button>
          <Button
            className="w-full h-14 text-lg font-semibold text-red-500"
            variant="ghost"
            onClick={() => signOut()}
          >
            <LogOut />
            Log Out
          </Button>
        </div>
        <div></div>
      </nav>
    );
};

export default RightSidebar;
