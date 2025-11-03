import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-md transition-colors inline-flex items-center justify-center gap-2";
  const variantStyles = {
    primary: "bg-blue-700 text-white hover:bg-blue-800",
    outline: "border border-blue-300 bg-white text-blue-700 hover:bg-blue-50",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
