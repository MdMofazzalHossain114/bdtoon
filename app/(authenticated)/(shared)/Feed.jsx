import IconButton from "@/components/shared/IconButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { H3, P } from "@/components/ui/typography";
import { Calendar, EllipsisVertical, Star, StarIcon } from "lucide-react";
import Link from "next/link";

const PostCard = () => {
  return (
    <div className="w-full flex-col gap-y-4 p-4 rounded-lg bg-card max-w-[700px] border-2 border-muted text-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="w-12 h-12 cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit p-4">
              <div className="flex items-center gap-x-6">
                <Avatar className="w-28 h-28">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Md</AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="text-xl font-semibold">Md Mofazzal Hossain</h1>
                  <Badge
                    variant="outline"
                    className="rounded-sm text-muted-foreground"
                  >
                    Motion Graphics
                  </Badge>
                  <div className="flex items-center gap-x-2 text-muted-foreground mt-4">
                    <Calendar className="w-4 h-4" />
                    Joined on 24 April 2023
                  </div>
                </div>
                <div className="w-[1px] h-18 bg-muted rounded-full"></div>
                <div className="flex flex-col gap-y-2 items-center">
                  <P>Ratings</P>

                  <div className="flex gap-x-2">
                    <Star className="w-4 h-4" />
                    <Star className="w-4 h-4" />
                    <Star className="w-4 h-4" />
                    <Star className="w-4 h-4" />
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <div>
            <Link
              href="#"
              className="font-semibold cursor-pointer text-md hover:underline block"
            >
              Md Mofazzal Hossain
            </Link>
            <Link href="#" className="hover:underline">
              <Badge
                variant="outline"
                className="rounded-md text-muted-foreground hover:text-foreground"
              >
                Motion Graphics
              </Badge>
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
