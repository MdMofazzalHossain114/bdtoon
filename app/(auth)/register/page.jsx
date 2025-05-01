import { Button } from "@/components/ui/button";
import FormSeperator from "@/components/ui/form-seperator";
import RegistrationForm from "./RegistrationForm";
import { H1 } from "@/components/ui/typography";
import GradientCard from "../GradientCard";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <GradientCard />
      {/* Right Section */}
      <div className="flex w-full items-center justify-center bg-background p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded-[40px] p-12">
          <div className="mx-auto max-w-sm">
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Sign Up Account
            </h2>
            <p className="mb-8 text-muted-foreground">
              Enter your personal data to create your account.
            </p>

            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
