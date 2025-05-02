"use client";
import IconButton from "@/components/shared/IconButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { A, H1, H2, H3, P } from "@/components/ui/typography";
import {
  Bell,
  ChevronDown,
  LogOut,
  Mail,
  Search,
  SearchIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Topbar = () => {
  const logout = async () => {
    await signOut();
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-center p-4 bg-card border-b-2 border-muted shadow-md z-18">
      <div className="w-full max-w-[1800px] flex items-center justify-between gap-x-4">
        {/* Left Section */}
        <div className="w-1/5 flex justify-center items-center">
          <H1>BDTOON</H1>
        </div>

        {/* Middle Section */}
        <div className="w-3/5 flex items-center justify-between gap-x-6">
          <H2>Feed</H2>

          {/* Search bar */}
          <form className="w-7/12 flex items-center shadow-lg rounded-md dark:shadow-foreground/10">
            <Input
              type="text"
              placeholder="Search..."
              className="rounded-r-none border border-muted-foreground/20"
            />
            <Button className="h-12 rounded-l-none w-1/12">
              <Search className="h-12 w-12" />
            </Button>
          </form>

          <div className="flex items-center gap-x-4 font-medium">
            <Link href="#">Recent</Link>
            <Link href="#">Popular</Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/5 flex items-center justify-center gap-x-4">
          <IconButton>
            <Mail />
          </IconButton>
          <IconButton>
            <Bell />
          </IconButton>
          <IconButton>
            <ChevronDown />
          </IconButton>
          <IconButton onClick={logout} className="text-red-500">
            <LogOut />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
