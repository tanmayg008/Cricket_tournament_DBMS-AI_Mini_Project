import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs ${className}`}>
      {children}
    </span>
  );
}
