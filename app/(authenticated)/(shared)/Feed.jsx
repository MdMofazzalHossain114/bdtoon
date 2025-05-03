import IconButton from "@/components/shared/IconButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FormSeperator from "@/components/ui/form-seperator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { H3, P } from "@/components/ui/typography";
import {
  Calendar,
  Copy,
  EllipsisVertical,
  Heart,
  MessageCircle,
  Share2,
  Star,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostCard = () => {
  return (
    <div className="w-full flex-col gap-y-4 px-4 pt-4 pb-2 rounded-lg bg-card max-w-[700px] border border-muted-foreground/30 text-foreground shadow-lg dark:shadow-foreground/10">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton className="bg-transparent">
              <EllipsisVertical />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Post Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>View Full Post</DropdownMenuItem>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Hide</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="py-4">
        <H3>Post Title</H3>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          earum! Dolores debitis recusandae velit saepe dolorem odit maiores
          possimus iste numquam alias non, quas at fugit vel,
        </P>
      </div>
      <Separator className="my-2" />
      <div className="w-full flex items-center justify-between">
        <Button variant="ghost" className="w-1/3">
          <Heart />
          Like
        </Button>
        <Button variant="ghost" className="w-1/3">
          <MessageCircle />
          Comment
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-1/3">
              <Share2 />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue="https://ui.shadcn.com/docs/installation"
                  readOnly
                />
              </div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
