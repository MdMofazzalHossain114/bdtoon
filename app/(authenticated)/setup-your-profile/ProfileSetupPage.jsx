"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Image, Loader2, Upload } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { H1 } from "@/components/ui/typography";
import GradientCard from "@/app/(auth)/GradientCard";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/lib/schema/profileSetup";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function ProfileSetupPage() {
  const router = useRouter();
  const { data: session, update } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  console.log(session);

  const [profileImage, setProfileImage] = useState(null);
  const profileRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    console.log(session);

    const getUserById = async () => {
      try {
        const res = await axios.get(`/api/users/${session.user.id}`);
        console.log("getting user ", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (session) {
      getUserById();
    }
  }, [session]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerProfileInput = () => {
    profileRef.current?.click();
  };

  const triggerCoverInput = () => {
    coverRef.current?.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!profileRef.current?.files?.[0]) return;

    const file = profileRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `/api/users/${session.user.id}/setup-your-profile`,
        formData
      );
      console.log(res);

      if (!res.data.success) {
        console.log("Failed to upload profile picture");
        toast.error(res.data.message);
      } else {
        await update({
          ...session,
          profilePicture: res.data.url,
          role: "user",
        });

        console.log("Successfully uploaded profile picture");
        toast.success("Successfully set up your profile");

        router.push("/");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed setting up your profile");
    }

    setSubmitting(false);
  };

  const handleSkip = async () => {
    setSubmitting(true);

    console.log("Skipping profile setup");

    try {
      const res = await axios.get(
        `/api/users/${session.user.id}/setup-your-profile`
      );

      await update({
        ...session,
        role: "user",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed skipping profile setup");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left Section */}
      <GradientCard />

      {/* Right Section */}
      <div className="flex w-full items-center justify-center bg-black p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded-[40px] p-12">
          <div className="mx-auto max-w-sm">
            <h2 className="mb-2 text-3xl font-bold text-white">
              Profile Setup
            </h2>
            <p className="mb-8 text-gray-400">
              Complete your profile to get the most out of our platform.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center relative mb-[150px]">
                {/* Cover Photo */}
                {/* <div
                  onClick={triggerCoverInput}
                  className="w-full h-[100px] rounded-lg group relative mb-4 cursor-pointer overflow-hidden border-2 border-dashed border-gray-600 bg-gray-900 transition-all hover:border-purple-500 hover:bg-black flex items-center justify-center"
                >
                  <div className="absolute top-2/12 opacity-0 transition group-hover:opacity-100 text-white group-hover:scale-150">
                    <Upload />
                  </div>
                </div> */}

                {/* Profile Photo */}
                <div className="flex flex-col items-center absolute top-1/2">
                  <div
                    onClick={triggerProfileInput}
                    className="group relative mb-4 h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-gray-600 bg-gray-900 transition-all hover:border-purple-500"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400 group-hover:text-purple-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <input
                    disabled={isSubmitting}
                    type="file"
                    ref={profileRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-sm text-gray-400">
                    Upload profile picture
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="displayName"
                    className="text-sm text-gray-400"
                  >
                    Display Name
                  </label>
                  <Input
                    disabled={isSubmitting}
                    id="displayName"
                    className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                    placeholder="johndoe"
                    type="text"
                  />
                  {errors.displayName ? (
                    <ErrorMessage>{errors.displayName.message}</ErrorMessage>
                  ) : (
                    <p className="text-xs text-gray-500">
                      This will be visible to other users.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm text-gray-400">
                    Bio
                  </label>
                  <Textarea
                    disabled={isSubmitting}
                    id="bio"
                    className="min-h-[100px] border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <h3 className="text-lg font-medium text-white">Preferences</h3>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="emailNotifications"
                    className="text-sm text-gray-400"
                  >
                    Email Notifications
                  </label>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      disabled={isSubmitting}
                      type="checkbox"
                      id="emailNotifications"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="darkMode" className="text-sm text-gray-400">
                    Dark Mode
                  </label>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      disabled={isSubmitting}
                      type="checkbox"
                      id="darkMode"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full bg-white text-black hover:bg-gray-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                    Completing setup...
                  </>
                ) : (
                  "Complete Setup"
                )}
                Complete Setup
              </Button>
              <Button
                onClick={handleSkip}
                disabled={isSubmitting}
                variant="link"
                className="text-white w-full"
              >
                Skip for now
              </Button>

              <p className="text-center text-sm text-gray-400">
                You can update these details later in your account settings.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
