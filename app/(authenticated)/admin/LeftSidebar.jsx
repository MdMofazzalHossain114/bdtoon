import { H1, H3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  MessageSquareWarning,
  SquareKanban,
  StickyNote,
  UserCog,
} from "lucide-react";
import Link from "next/link";

const IconButton = ({ children, className, ...rest }) => {
  return (
    <Link
      {...rest}
      className={cn(
        "flex w-full items-center gap-x-4 p-4 bg-transparent hover:bg-white/10 rounded-md",
        className
      )}
    >
      {children}
    </Link>
  );
};

const LeftSidebar = () => {
  return (
    <div className="w-full max-w-[350px] flex flex-col gap-y-4 bg-gray-900">
      <div className="p-4 flex items-end justify-center">
        <H1>BDTOON</H1>
        <H3>/Admin Panel</H3>
      </div>
      <div className="flex flex-col gap-y-4 p-4">
        <IconButton href="/admin/dashboard">
          <SquareKanban />
          <p className="text-lg font-semibold">Dashboard Overview</p>
        </IconButton>
        <IconButton href="/admin/manage-users">
          <UserCog />
          <p className="text-lg font-semibold">Manage Users</p>
        </IconButton>
        <IconButton href="/admin/manage-posts">
          <StickyNote />
          <p className="text-lg font-semibold">Manage Posts</p>
        </IconButton>
        <IconButton href="/admin/resolve-ticket">
          <MessageSquareWarning />
          <p className="text-lg font-semibold">Resolve Ticket</p>
        </IconButton>
      </div>
    </div>
  );
};

export default LeftSidebar;
