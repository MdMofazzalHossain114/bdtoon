"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { verifySchema } from "@/lib/schema/verifySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { H1 } from "@/components/ui/typography";
import GradientCard from "../GradientCard";

export default function OTPVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0 && !isResendActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 10);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsResendActive(true);
    }
  }, [timeLeft, isResendActive]);

  const handleChange = (index, value) => {
    setError("");

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    setError("");
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    setError("");

    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    const lastFilledIndex = Math.min(digits.length - 1, 5);
    if (lastFilledIndex < 5) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleResend = async () => {
    setError("");

    setOtp(Array(6).fill(""));
    setTimeLeft(60);
    setIsResendActive(false);
    inputRefs.current[0]?.focus();

    const userId = searchParams.get("q");

    console.log(userId);

    try {
      const response = await axios.post("/api/auth/resend-verification-code", {
        encryptedUserId: userId,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      const resData = error.response?.data;

      if (resData?.message) {
        toast.error(resData.message);
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      console.log("Verifying OTP:", otpValue);
      try {
        const res = await axios.post(`/api/auth/verify`, {
          code: otpValue,
          encryptedUserId: searchParams.get("q"),
          encryptedPassword: searchParams.get("p"),
        });
        toast.success("Account created successfully");

        console.log("Response from verify API", res.data);
        setError("");
        router.push(`/login?v=1&u=${res.data.username}&p=${res.data.password}`);
      } catch (error) {
        console.log("Error verifying OTP", error);
        const resData = error.response?.data;
        if (resData?.message) {
          toast.error(resData.message, { position: "top-center" });
        } else {
          toast.error("Error verifying OTP");
        }

        setError("Invalid OTP");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Section */}
      <GradientCard step={2} />

      {/* Right Section */}
      <div className="flex w-full items-center justify-center bg-background p-6 lg:w-1/2">
        <div className="max-w-[500px] w-full rounded-[40px] p-12">
          <div className="mx-auto w-full">
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Verification Code
            </h2>
            <p className="mb-8 text-muted-foreground">
              Enter the 6-digit code sent to your email address.
            </p>

            {/* OTP Input Fields */}
            <div className="mb-8">
              <div className="flex justify-between gap-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={cn(
                      "h-16 w-12 rounded-lg border border-muted bg-secondary text-center text-xl text-foreground focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 md:h-20 md:w-14 font-medium",
                      error && "border-destructive"
                    )}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                {isResendActive ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-foreground cursor-pointer"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span>Resend in {timeLeft}s</span>
                )}
              </p>
            </div>

            <Button
              type="submit"
              onClick={handleVerify}
              disabled={otp.join("").length !== 6 || isSubmitting}
              className="h-12 w-full"
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Wrong email address?{" "}
              <a
                href="/register"
                className="text-foreground hover:underline font-medium"
              >
                Go back
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
