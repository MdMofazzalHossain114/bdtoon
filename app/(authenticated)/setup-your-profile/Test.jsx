"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/schema/profileSetup";

const Test = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    console.log(errors);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-black/60 p-8 shadow-xl ring-1 ring-white/10 backdrop-blur">
        <h1 className="text-center text-3xl font-bold text-white">
          Complete Your Profile
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="file"
              accept="image/*"
              id="profilePicture"
              placeholder="johndoe"
              className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
              {...register("profilePicture")}
            />
            {errors.profilePicture && (
              <p className="text-sm text-red-500 mt-1">
                {errors.profilePicture.message}
              </p>
            )}
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-300"
            >
              Display Name
            </label>
            <Input
              id="displayName"
              placeholder="johndoe"
              className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
              {...register("displayName")}
            />
            {errors.displayName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-300"
            >
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us a bit about yourself..."
              className="min-h-[100px] border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
            )}
          </div>

          <Button
            disabled={isSubmitting || !isValid}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Proceed
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Test;
