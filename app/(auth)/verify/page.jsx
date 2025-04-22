"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OTPVerificationPage() {
  const router = useRouter();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0 && !isResendActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsResendActive(true);
    }
  }, [timeLeft, isResendActive]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
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

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setTimeLeft(60);
    setIsResendActive(false);
    inputRefs.current[0]?.focus();
    // You would typically call an API here
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      console.log("Verifying OTP:", otpValue);
      // You would typically call an API here
    }
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
            <h2 className="mb-6 text-4xl font-bold">Verify Your Account</h2>
            <p className="mb-12 text-lg">
              We've sent a verification code to your email. Please enter it
              below.
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
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
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
              Verification Code
            </h2>
            <p className="mb-8 text-gray-400">
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
                    className="h-16 w-12 rounded-lg border border-gray-800 bg-gray-900 text-center text-xl text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 md:h-20 md:w-14"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-gray-400">
                Didn't receive the code?{" "}
                {isResendActive ? (
                  <button
                    onClick={handleResend}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span>Resend in {timeLeft}s</span>
                )}
              </p>
            </div>

            <Button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6}
              className="h-12 w-full bg-white text-black hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-300"
            >
              Verify
            </Button>

            <p className="mt-6 text-center text-sm text-gray-400">
              Wrong email address?{" "}
              <a href="/register" className="text-white hover:underline">
                Go back
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
