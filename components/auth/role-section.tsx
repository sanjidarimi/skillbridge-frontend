"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Presentation } from "lucide-react";
import { UserRole } from "../../types/auth";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full mt-3">
      <input type="hidden" name="role" value={value} />

      <button
        type="button"
        onClick={() => onChange("student")}
        className={cn(
          "flex items-center cursor-pointer p-3 justify-center rounded-xl border text-center transition-all gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20",
          value === "student"
            ? "border-primary bg-primary/5 text-primary shadow-sm"
            : "border-border/60 bg-background/40 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        )}
      >
        <BookOpen className="h-4 w-4" />
        <span className="text-xs font-semibold">Join as Student</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("tutor")}
        className={cn(
          "flex cursor-pointer items-center justify-center p-3 rounded-xl border text-center transition-all gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20",
          value === "tutor"
            ? "border-primary bg-primary/5 text-primary shadow-sm"
            : "border-border/60 bg-background/40 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        )}
      >
        <Presentation className="h-4 w-4" />
        <span className="text-xs font-semibold">Join as Tutor</span>
      </button>
    </div>
  );
}
