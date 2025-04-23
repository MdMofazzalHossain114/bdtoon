"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload } from "lucide-react";

export default function ProfileSetupPage() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left Section */}
      <div className="relative hidden w-1/2 p-8 lg:block">
        <div className="h-full w-full overflow-hidden rounded-[40px] bg-gradient-to-b from-purple-400 via-purple-600 to-black">
          <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Flowers&Saints</h1>
            </div>
            <h2 className="mb-6 text-4xl font-bold">Complete Your Profile</h2>
            <p className="mb-12 text-lg">
              Tell us a bit about yourself to personalize your experience.
            </p>

            <div className="w-full max-w-sm space-y-4">
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                    1
                  </span>
                  <span className="text-lg">Sign up your account</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                    2
                  </span>
                  <span className="text-lg">Verify your email</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                    3
                  </span>
                  <span className="text-lg">Set up your profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

            <form className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <div
                  onClick={triggerFileInput}
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
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-sm text-gray-400">Upload profile picture</p>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm text-gray-400"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                      placeholder="John"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm text-gray-400">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                      placeholder="Doe"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="displayName"
                    className="text-sm text-gray-400"
                  >
                    Display Name
                  </label>
                  <Input
                    id="displayName"
                    className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                    placeholder="johndoe"
                    type="text"
                  />
                  <p className="text-xs text-gray-500">
                    This will be visible to other users.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="jobTitle" className="text-sm text-gray-400">
                    Job Title
                  </label>
                  <Input
                    id="jobTitle"
                    className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                    placeholder="Product Designer"
                    type="text"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm text-gray-400">
                    Company/Organization
                  </label>
                  <Input
                    id="company"
                    className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                    placeholder="Flowers&Saints"
                    type="text"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm text-gray-400">
                    Bio
                  </label>
                  <Textarea
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
                      type="checkbox"
                      id="darkMode"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
              </div>

              <Button className="h-12 w-full bg-white text-black hover:bg-gray-100">
                Complete Setup
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
