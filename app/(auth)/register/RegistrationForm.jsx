"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/schema/signUpSchema";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import FormSeperator from "@/components/ui/form-seperator";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Label from "../Label";

const RegistrationForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError("");

    console.log("Axios Response", data);
    try {
      const response = await axios.post("/api/auth/sign-up", data);
      toast.success("Account created successfully");

      router.push(
        `/verify?q=${response.data.userId}&p=${response.data.encryptedPassword}`
      );
      console.log(response);
    } catch (error) {
      const responseData = error.response?.data;
      if (responseData?.field && responseData?.message) {
        setError(responseData.field, {
          type: "manual",
          message: responseData.message,
        });
      }

      console.log("Error Registering - ", error.response?.data);
      toast.error("Something went wrong");
      setIsSubmitting(false);
      setAuthError("Something went wrong");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstname">Firstname</Label>
            <Input
              disabled={isSubmitting}
              id="firstname"
              placeholder="i.e. Mohammad"
              type="text"
              {...register("firstname")}
            />
            {errors.firstname && (
              <ErrorMessage>{errors.firstname.message}</ErrorMessage>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Lastname</Label>
            <Input
              disabled={isSubmitting}
              id="lastname"
              placeholder="i.e. Hossain"
              type="text"
              {...register("lastname")}
            />
            {errors.lastname && (
              <ErrorMessage>{errors.lastname.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            disabled={isSubmitting}
            id="username"
            placeholder="i.e. mohammad"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={isSubmitting}
            id="email"
            placeholder="i.e. mohammad@gmail.com"
            type="email"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              disabled={isSubmitting}
              id="password"
              placeholder="******"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              tabIndex="-1"
              onClick={() => setShowPassword(!showPassword)}
              className={cn("absolute right-2 top-1 text-foreground")}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div>
          {errors.password ? (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          ) : (
            <p className="text-sm text-muted-foreground">
              Must be at least 8 characters.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              disabled={isSubmitting}
              id="confirmPassword"
              placeholder="******"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              tabIndex="-1"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={cn("absolute right-2 top-1 text-foreground")}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div>
          {errors.confirmPassword ? (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          ) : (
            <p className="text-sm text-muted-foreground">
              Should match the password above.
            </p>
          )}
        </div>

        <Button disabled={isSubmitting} className="h-12 w-full">
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-foreground">
          Already have an account?{" "}
          <Link
            className="mx-2 font-medium hover:underline text-foreground"
            href="/login"
          >
            Log in
          </Link>
        </p>
      </form>
      {/* 
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
      </div> */}
    </>
  );
};

export default RegistrationForm;
