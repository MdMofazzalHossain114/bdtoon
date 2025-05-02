import { cn } from "@/lib/utils";

const CardTitle = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "font-semibold uppercase flex items-center gap-x-2 pb-4 justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CardTitle;
