import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "hover";
}

export function Card({
  className,
  variant = "default",
  ...props
}: CardProps) {
  const variants = {
    default: "bg-black border-2 border-white rounded-lg",
    bordered: "bg-black border-4 border-white rounded-lg",
    hover:
      "bg-black border-2 border-white rounded-lg transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 cursor-pointer",
  };

  return <div className={cn(variants[variant], className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 border-b-2 border-white", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 border-t-2 border-white flex gap-2", className)} {...props} />;
}
