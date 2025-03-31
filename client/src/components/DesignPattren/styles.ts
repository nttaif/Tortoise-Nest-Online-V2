export type ButtonVariant = "primary" | "secondary" | "danger" | "media" | "warning"|"banned";
export type ButtonSize = "small" | "medium" | "large";

export const baseClass = "rounded text-white w-full font-bold transition-all";

export const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 hover:bg-blue-700",
  secondary: "bg-green-500 hover:bg-green-700",
  danger: "bg-red-500 hover:bg-red-700",
  media: "bg-yellow-500 hover:bg-yellow-700",
  warning: "bg-orange-500 hover:bg-orange-700",
  banned:"bg-red-500 hover:bg-red-700",
};

export const sizeStyles: Record<ButtonSize, string> = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};
