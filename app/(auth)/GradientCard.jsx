import { H1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import React from "react";

const Step = ({ step, count, title }) => {
  const isActive = count === step;

  return (
    <div
      className={cn(
        "rounded-lg p-4 backdrop-blur-sm",
        isActive && "bg-white/10"
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            isActive ? "bg-white text-black" : "text-white"
          )}
        >
          {count}
        </span>
        <span className="text-lg">{title}</span>
      </div>
    </div>
  );
};

const GradientCard = ({ step = 1 }) => {
  return (
    <div className="relative hidden w-1/2 p-8 lg:block">
      <div className="h-full w-full overflow-hidden rounded-[40px] bg-gradient-to-b from-emerald-500 to-emerald-700 dark:via-green-800 dark:to-emerald-950 shadow-2xl shadow-emerald-500">
        <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
          <div className="mb-8">
            <H1 className="text-white">BDTOON</H1>
          </div>
          <h2 className="mb-6 text-4xl font-bold">Get Started with Us</h2>
          <p className="mb-12 text-lg">
            Complete these easy steps to register your account.
          </p>
          <div className="w-full max-w-sm space-y-4">
            <Step step={step} count={1} title="Sign up your account" />
            <Step step={step} count={2} title="Verify your email" />
            <Step step={step} count={3} title="Set up your profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientCard;
