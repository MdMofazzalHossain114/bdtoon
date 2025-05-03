"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BecomeCreator = ({ userId }) => {
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting portfolio", link);

    try {
      const res = await axios.post(`/api/users/${userId}/send-portfolio`, {
        userId,
        link,
      });

      console.log("Portfolio response - ", res);
      toast.success("Portfolio submitted successfully");
    } catch (error) {
      console.log("Error submitting portfolio", error);
      toast.error("Something went wrong");
    }
    setIsSubmitting(false);
  };
  return (
    <div className="p-4 rounded-md border border-muted-foreground/20">
      <h1 className="text-2xl font-bold py-2 text-center">
        Want to become a CREATOR at BDTOON?
      </h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full h-16 text-lg font-semibold">
            Click Here
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submit Portfolio</DialogTitle>
            <DialogDescription>
              To become a creator at BDTOON, paste your portfolio link and
              submit.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Link
                </Label>
                <Input
                  id="pt-link"
                  placeholder="behance.net/muzaheed"
                  className="col-span-3"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full h-12"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-4">
                    <Loader2 className="animate-spin" />
                    Submitting
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BecomeCreator;
