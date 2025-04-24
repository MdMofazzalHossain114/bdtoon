import IconButton from "@/components/shared/IconButton";
import { A, H1, H2, H3, P } from "@/components/ui/typography";
import { Bell, ChevronDown, SearchIcon } from "lucide-react";
import Link from "next/link";

const Topbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-center p-4 bg-gray-900 shadow-md shadow-white/5">
      <div className="w-full max-w-[1800px] flex items-center justify-between gap-x-4">
        {/* Left Section */}
        <div className="w-1/5 flex justify-center items-center">
          <H1>BDTOON</H1>
        </div>

        {/* Middle Section */}
        <div className="w-3/5 flex items-center justify-between gap-x-4">
          <H2>Feed</H2>
          <div className="flex items-center gap-x-4">
            <Link href="#">Recent</Link>
            <Link href="#">Popular</Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/5 flex items-center justify-center gap-x-4">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <Bell />
          </IconButton>
          <IconButton>
            <ChevronDown />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
