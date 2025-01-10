import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "screen";
  className?: string;
}

export default function Loading({ size = "md", className }: LoadingProps = {}) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center h-full", {
        "min-h-screen": size === "screen",
      })}
    >
      <div
        className={cn(
          "inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
          {
            "h-4 w-4 border-2": size === "sm",
            "h-8 w-8 border-4": size === "md",
            "h-12 w-12 border-4": size === "lg",
            "h-24 w-24 border-4": size === "screen",
          },
          "text-primary",
          className
        )}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
