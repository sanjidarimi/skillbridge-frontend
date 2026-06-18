// components/ui/floating-input.tsx
"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // Standard shadcn utility

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  rightElement?: React.ReactNode;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, id, label, icon: Icon, rightElement, type, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        {/* Left Status Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
          <Icon className="h-4 w-4" />
        </div>
        
        {/* Core Input Element */}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border border-input bg-background/50 pl-10 pr-10 pt-4 pb-1 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent peer placeholder-transparent backdrop-blur-sm",
            className
          )}
          placeholder={label}
          {...props}
        />

        {/* Floating Label Engine */}
        <label
          htmlFor={id}
          className="absolute left-10 top-3.5 origin-[0] -translate-y-3 scale-75 transform text-xs font-medium text-muted-foreground duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary cursor-text pointer-events-none"
        >
          {label}
        </label>

        {/* Action Elements (Eye toggles, etc.) */}
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";