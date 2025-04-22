"use client";
import { Button } from "@/components/ui/button";
import FormSeperator from "@/components/ui/form-seperator";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label";

export default function SignUpPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [authError, setAuthError] = useState("");

  const onSubmit = async (data) => {
    setSubmitting(true);
    setAuthError("");

    const res = await signIn("credential", {
      redirect: false,
      ...data,
    });
    console.log("response", res);

    if (res?.error) {
      if (res.error.includes("Configuration")) {
        toast.error("Invalid Credentials", { position: "top-center" });
        setAuthError("Please check your credentials and try again");
      } else {
        setAuthError(res.error);
      }
    } else {
      router.push("/");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen bg-black flex-row-reverse">
      {/* Left Section */}
      <div className="relative hidden w-1/2 p-8 lg:block">
        <div className="h-full w-full overflow-hidden rounded-[40px] bg-gradient-to-b from-emerald-500 via-green-800 to-black">
          <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">BDTOON</h1>
            </div>
            <h2 className="mb-6 text-4xl font-bold">Get Started with Us</h2>
            <p className="mb-12 text-lg">
              Complete these easy steps to register your account.
            </p>

            <div className="w-full max-w-sm space-y-4">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
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
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
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
              Log In Account
            </h2>
            <p className="mb-8 text-gray-400">
              Enter your credentials to log into your account.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="identifier">Email Address or Username</Label>
                <Input
                  id="identifier"
                  className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                  placeholder="mofazzal@gmail.com"
                  type="text"
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <ErrorMessage>{errors.identifier.message}</ErrorMessage>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                  placeholder="*******"
                  type="password"
                  {...register("password")}
                />

                {errors.password ? (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                ) : (
                  <p className="text-sm text-gray-400">
                    Must be at least 6 characters.
                  </p>
                )}
              </div>

              {authError && (
                <p className="bg-red-800/50 text-red-200 text-center text-sm m-4 p-2 rounded-sm border-1 border-red-700">
                  {authError}
                </p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className={`h-12 w-full bg-white text-black hover:bg-gray-100 ${
                  submitting &&
                  "disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
                }`}
              >
                {submitting ? "Logging In..." : "Log In"}
              </Button>

              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <a href="/register" className="text-white hover:underline">
                  Create an account
                </a>
              </p>
            </form>

            <FormSeperator />

            <div className="mb-8 grid gap-4">
              <Button variant="outline" className="h-12">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-12">
                <Github className="mr-2 h-5 w-5" />
                Github
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
