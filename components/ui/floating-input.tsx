"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; 

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  rightElement?: React.ReactNode;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, id, label, icon: Icon, rightElement, type, ...props }, ref) => {
    return (
      <div className="relative group w-full">
  
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200 z-10">
          <Icon className="h-4 w-4 shrink-0" />
        </div>
        
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border border-input bg-background/50 pl-10 pr-11 pt-4 pb-1 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent peer placeholder-transparent backdrop-blur-sm text-foreground",
            className
          )}
          placeholder={label}
          {...props}
        />

        <label
          htmlFor={id}
          className="absolute left-10 top-4 origin-left -translate-y-3.5 scale-75 transform text-xs font-medium text-muted-foreground duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-primary cursor-text pointer-events-none z-10"
        >
          {label}
        </label>

      
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center z-10">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";