import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RightSidebar = async () => {
  const session = await auth();

  return (
    <nav className="w-1/5 bg-gray-900">
      <Avatar className="w-30 h-30">
        {session.user.profilePicture ? (
          <AvatarImage
            src={session?.user.profilePicture}
            alt={session?.user.username}
          />
        ) : (
          <AvatarFallback className=" bg-gray-500">
            {session.user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
    </nav>
  );
};

export default RightSidebar;
