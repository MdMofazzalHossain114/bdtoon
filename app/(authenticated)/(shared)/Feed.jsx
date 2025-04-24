import IconButton from "@/components/shared/IconButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { H3, P } from "@/components/ui/typography";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

const PostCard = () => {
  return (
    <div className="w-full flex-col gap-y-4 p-4 rounded-lg bg-gray-900 max-w-[700px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <Link href="#" className="hover:underline">
              <h1 className="font-semibold">Md Mofazzal Hossain</h1>
            </Link>
            <Link href="#" className="hover:underline">
              <p className="text-sm opacity-70">Motion Graphics</p>
            </Link>
          </div>
        </div>
        <IconButton className="bg-transparent">
          <EllipsisVertical />
        </IconButton>
      </div>
      <div className="py-4">
        <H3>Post Title</H3>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          earum! Dolores debitis recusandae velit saepe dolorem odit maiores
          possimus iste numquam alias non, quas at fugit vel, nulla corporis.
          Earum. Esse iure similique architecto ullam qui laboriosam sit earum
          velit nemo at dolores expedita error adipisci amet inventore ex magni
          nesciunt beatae quo animi, atque blanditiis saepe. Rerum, harum quam.
        </P>
      </div>

      <div className="w-full flex items-center justify-between">
        <Button variant="ghost" className="w-1/3">
          Like
        </Button>
        <Button variant="ghost" className="w-1/3">
          Comment
        </Button>
        <Button variant="ghost" className="w-1/3">
          Share
        </Button>
      </div>
    </div>
  );
};

const Feed = () => {
  return (
    <div className="w-3/5 h-full overflow-auto flex flex-col gap-y-4 p-4 items-center">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default Feed;
