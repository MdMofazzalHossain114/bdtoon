"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  MessageCircle,
  Share2,
  ImageIcon,
  Video,
  MoreHorizontal,
  Plus,
  TrendingUp,
} from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export default function FeedPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Anika Rahman",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Animator", "Character Designer"],
        verified: true,
      },
      content:
        "Just finished this character animation for a client's game. What do you think?",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: "2 hours ago",
      likes: 42,
      comments: [
        {
          id: 1,
          user: {
            name: "Farhan Ahmed",
            avatar: "/placeholder.svg?height=30&width=30",
          },
          content: "This is amazing! Love the fluid motion.",
          timestamp: "1 hour ago",
          likes: 5,
        },
        {
          id: 2,
          user: {
            name: "Nusrat Jahan",
            avatar: "/placeholder.svg?height=30&width=30",
          },
          content:
            "The character design is so unique! Would love to collaborate sometime.",
          timestamp: "45 minutes ago",
          likes: 3,
        },
      ],
      liked: false,
    },
    {
      id: 2,
      user: {
        name: "Kamal Hossain",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Storyboard Artist", "Illustrator"],
        verified: false,
      },
      content:
        "Working on a new storyboard for an upcoming animation series based on Bengali folklore. Here's a sneak peek!",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: "5 hours ago",
      likes: 28,
      comments: [
        {
          id: 1,
          user: {
            name: "Sadia Islam",
            avatar: "/placeholder.svg?height=30&width=30",
          },
          content:
            "The art style reminds me of traditional patachitra! Beautiful adaptation.",
          timestamp: "4 hours ago",
          likes: 7,
        },
      ],
      liked: true,
    },
    {
      id: 3,
      user: {
        name: "Rafiq Islam",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["3D Modeler", "Rigger"],
        verified: true,
      },
      content:
        "I'm offering a special discount on character rigging services this month. Perfect for indie game developers! DM for details.",
      timestamp: "Yesterday",
      likes: 15,
      comments: [],
      liked: false,
    },
  ]);

  const [postContent, setPostContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  const suggestedCreators = [
    {
      name: "Tasnim Akter",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Motion Designer"],
      following: false,
    },
    {
      name: "Rahim Khan",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Background Artist"],
      following: false,
    },
    {
      name: "Maliha Chowdhury",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Voice Actor"],
      following: true,
    },
  ];

  const trendingTags = [
    "BanglaAnimation",
    "CharacterDesign",
    "2DAnimation",
    "MotionGraphics",
    "StopMotion",
    "AnimationServices",
  ];

  const handlePostSubmit = () => {
    if (!postContent.trim() && !selectedFile) return;

    const newPost = {
      id: posts.length + 1,
      user: {
        name: "Your Name",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Digital Artist"],
        verified: true,
      },
      content: postContent,
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
    setSelectedFile(null);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const liked = !post.liked;
          return {
            ...post,
            liked,
            likes: liked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const handleCommentSubmit = (postId) => {
    if (!commentInputs[postId]?.trim()) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: post.comments.length + 1,
            user: {
              name: "Your Name",
              avatar: "/placeholder.svg?height=30&width=30",
            },
            content: commentInputs[postId],
            timestamp: "Just now",
            likes: 0,
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );

    setCommentInputs({
      ...commentInputs,
      [postId]: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Main Content */}
      <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Post Composer */}
          <Card className="mb-6 overflow-hidden rounded-[24px] border-gray-800 bg-gray-900 p-4 shadow-md">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 border border-purple-500">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Your avatar"
                />
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share an update, portfolio, or animation preview…"
                  className="mb-3 min-h-[100px] border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                />

                {selectedFile && (
                  <div className="mb-3 rounded-lg bg-gray-800 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        {selectedFile.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                        className="h-6 w-6 rounded-full p-0 text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <label htmlFor="image-upload">
                      <div className="flex h-9 cursor-pointer items-center gap-2 rounded-md px-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-purple-400">
                        <ImageIcon size={18} />
                        <span className="text-sm">Image</span>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                    <label htmlFor="video-upload">
                      <div className="flex h-9 cursor-pointer items-center gap-2 rounded-md px-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-purple-400">
                        <Video size={18} />
                        <span className="text-sm">Video</span>
                      </div>
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>
                  <Button
                    onClick={handlePostSubmit}
                    disabled={!postContent.trim() && !selectedFile}
                    className="bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Feed Items */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden rounded-[24px] border-gray-800 bg-gray-900 shadow-md"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 border border-purple-500">
                      <img
                        src={post.user.avatar || "/placeholder.svg"}
                        alt={post.user.name}
                      />
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium text-white">
                          {post.user.name}
                        </h3>
                        {post.user.verified && (
                          <span className="text-purple-500">✓</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.user.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-gray-700 bg-gray-800 text-xs text-gray-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                        <span className="text-xs text-gray-500">
                          • {post.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <MoreHorizontal size={16} />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3 text-white">
                  <p className="mb-3">{post.content}</p>
                  {post.image && (
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post content"
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Interaction Bar */}
                <div className="border-t border-gray-800 px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 text-sm ${
                          post.liked
                            ? "text-purple-500"
                            : "text-gray-400 hover:text-purple-400"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={post.liked ? "currentColor" : "none"}
                        />
                        <span>{post.likes}</span>
                      </button>

                      {/* <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400">
                            <MessageCircle size={18} />
                            <span>{post.comments.length}</span>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 border-gray-800 bg-gray-900 p-0 text-white shadow-md">
                          <div className="p-4">
                            <h4 className="mb-2 font-medium">Comments</h4>
                            <ScrollArea className="h-60 pr-4">
                              {post.comments.length > 0 ? (
                                <div className="space-y-4">
                                  {post.comments.map((comment) => (
                                    <div
                                      key={comment.id}
                                      className="flex gap-2"
                                    >
                                      <Avatar className="h-7 w-7">
                                        <img
                                          src={
                                            comment.user.avatar ||
                                            "/placeholder.svg"
                                          }
                                          alt={comment.user.name}
                                        />
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="rounded-lg bg-gray-800 p-2">
                                          <div className="mb-1 flex items-center gap-1">
                                            <span className="text-xs font-medium">
                                              {comment.user.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                              • {comment.timestamp}
                                            </span>
                                          </div>
                                          <p className="text-sm">
                                            {comment.content}
                                          </p>
                                        </div>
                                        <div className="mt-1 flex gap-3 pl-2">
                                          <button className="text-xs text-gray-400 hover:text-purple-400">
                                            Like ({comment.likes})
                                          </button>
                                          <button className="text-xs text-gray-400 hover:text-purple-400">
                                            Reply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-center text-sm text-gray-500">
                                  No comments yet
                                </p>
                              )}
                            </ScrollArea>
                          </div>
                          <div className="border-t border-gray-800 p-3">
                            <div className="flex gap-2">
                              <Avatar className="h-7 w-7">
                                <img
                                  src="/placeholder.svg?height=30&width=30"
                                  alt="Your avatar"
                                />
                              </Avatar>
                              <div className="flex-1">
                                <Input
                                  value={commentInputs[post.id] || ""}
                                  onChange={(e) =>
                                    setCommentInputs({
                                      ...commentInputs,
                                      [post.id]: e.target.value,
                                    })
                                  }
                                  placeholder="Write a comment..."
                                  className="mb-2 border-gray-800 bg-gray-800 text-sm text-white placeholder:text-gray-500"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleCommentSubmit(post.id)}
                                  disabled={!commentInputs[post.id]?.trim()}
                                  className="ml-auto bg-purple-600 text-white hover:bg-purple-700"
                                >
                                  Post
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover> */}

                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400">
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Inline Comments (Alternative to Popover) */}
                {post.comments.length > 0 && (
                  <div className="border-t border-gray-800 px-4 py-3">
                    <button className="mb-3 text-sm text-purple-400 hover:text-purple-300">
                      View all {post.comments.length} comments
                    </button>
                    <div className="space-y-3">
                      {post.comments.slice(0, 2).map((comment) => (
                        <div key={comment.id} className="flex gap-2">
                          <Avatar className="h-7 w-7">
                            <img
                              src={comment.user.avatar || "/placeholder.svg"}
                              alt={comment.user.name}
                            />
                          </Avatar>
                          <div className="flex-1">
                            <div className="rounded-lg bg-gray-800 p-2">
                              <div className="mb-1 flex items-center gap-1">
                                <span className="text-xs font-medium text-white">
                                  {comment.user.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  • {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-white">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Avatar className="h-7 w-7">
                        <img
                          src="/placeholder.svg?height=30&width=30"
                          alt="Your avatar"
                        />
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({
                              ...commentInputs,
                              [post.id]: e.target.value,
                            })
                          }
                          placeholder="Write a comment..."
                          className="border-gray-800 bg-gray-800 text-sm text-white placeholder:text-gray-500"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleCommentSubmit(post.id);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar (Desktop Only) */}
      <div className="hidden w-80 shrink-0 p-6 lg:block">
        <div className="sticky top-6 space-y-6">
          {/* Suggested Creators */}
          <Card className="rounded-[24px] border-gray-800 bg-gray-900 p-4 shadow-md">
            <h3 className="mb-4 text-lg font-medium text-white">
              Suggested Creators
            </h3>
            <div className="space-y-4">
              {suggestedCreators.map((creator, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-purple-500">
                      <img
                        src={creator.avatar || "/placeholder.svg"}
                        alt={creator.name}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white">{creator.name}</h4>
                      <div className="flex gap-1">
                        {creator.skills.map((skill, idx) => (
                          <span key={idx} className="text-xs text-gray-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={creator.following ? "outline" : "default"}
                    size="sm"
                    className={
                      creator.following
                        ? "border-purple-500 text-purple-500 hover:bg-purple-500/10"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }
                  >
                    {creator.following ? (
                      "Following"
                    ) : (
                      <span className="flex items-center gap-1">
                        <Plus size={14} />
                        Follow
                      </span>
                    )}
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="mt-3 w-full text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
            >
              View More
            </Button>
          </Card>

          {/* Trending Tags */}
          <Card className="rounded-[24px] border-gray-800 bg-gray-900 p-4 shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-purple-500" />
              <h3 className="text-lg font-medium text-white">Trending Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag, index) => (
                <Badge
                  key={index}
                  className="cursor-pointer bg-gray-800 text-gray-300 hover:bg-purple-500/20 hover:text-purple-300"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Services Showcase */}
          <Card className="rounded-[24px] border-gray-800 bg-gray-900 p-4 shadow-md">
            <h3 className="mb-4 text-lg font-medium text-white">
              Popular Services
            </h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-800 p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">
                    Character Animation
                  </h4>
                  <Badge className="bg-purple-500/20 text-purple-300">
                    From $50
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Professional 2D character animation for games and videos
                </p>
              </div>
              <div className="rounded-lg bg-gray-800 p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">Storyboarding</h4>
                  <Badge className="bg-purple-500/20 text-purple-300">
                    From $35
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Detailed storyboards for animation and film projects
                </p>
              </div>
              <div className="rounded-lg bg-gray-800 p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">Voice Acting</h4>
                  <Badge className="bg-purple-500/20 text-purple-300">
                    From $25
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Professional voice acting in Bengali and English
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="mt-3 w-full text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
            >
              Browse Marketplace
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
