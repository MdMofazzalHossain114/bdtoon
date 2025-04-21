"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/schema/loginSchema";
import { signIn } from "next-auth/react";

export function LoginForm({ className, ...props }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      try {
        // 🔐 Call your login action here
        const res = await signIn("credentials", {
          redirect: false,
          callbackUrl: "/",
          email: formData.email,
          password: formData.password,
        });

        console.log(res);
      } catch (error) {
        console.log("Error while logging in", error);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="m@example.com"
              value={formData.identifier}
              onChange={handleChange}
              required
              className={cn(
                errors.identifier &&
                  "text-red-600 font-bold border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.identifier && (
              <p className="text-red-500 text-md font-semibold mb-2">
                {errors.identifier}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={cn(
                errors.password &&
                  "text-red-600 font-bold border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-md font-semibold mb-2">
                {errors.password}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full hover:cursor-pointer"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="w-full flex justify-around">
          <Button variant="outline" onClick={() => login("google")}>
            {/* Google SVG */}
            Google
          </Button>
          <Button variant="outline" onClick={() => login("facebook")}>
            {/* Facebook SVG */}
            Facebook
          </Button>
          <Button variant="outline" onClick={() => login("github")}>
            {/* GitHub SVG */}
            GitHub
          </Button>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/sign-up" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </div>
  );
}
