import { cn } from "@/lib/utils";

const Label = ({ children, htmlFor = "", className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm text-gray-400 mb-2", className)}
    >
      {children}
    </label>
  );
};

export default Label;
