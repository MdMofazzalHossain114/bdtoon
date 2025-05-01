import { cn } from "@/lib/utils";

const Label = ({ children, htmlFor = "", className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-sm font-medium text-foreground mb-2",
        className
      )}
    >
      {children}
    </label>
  );
};

export default Label;
