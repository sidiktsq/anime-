import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-4 py-3 bg-black border-2 border-white rounded-lg",
        "text-white placeholder:text-white/50",
        "focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  );
}
