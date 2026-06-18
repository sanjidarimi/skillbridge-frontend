"use client";
import { handleSignUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useActionState, useState } from "react";
import { UserRole } from "../../types/auth";
import { RoleSelector } from "./role-section";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("student");
  const [state, formAction, isPending] = useActionState(handleSignUp, null);

  return (
    <form action={formAction} className="space-y-4">
      {state && (
        <div
          className={`p-3 rounded-xl text-xs font-medium text-center ${state.success ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}
        >
          {state.message}
        </div>
      )}
      <div className="space-y-2 pt-1">
        <label className="text-xs font-medium text-muted-foreground">
          Select your account profile
        </label>
        <RoleSelector value={role} onChange={setRole} />
      </div>
      <FloatingInput
        id="signup-name"
        name="name"
        type="text"
        label="Full Name"
        icon={User}
        required
        disabled={isPending}
      />
      <FloatingInput
        id="signup-email"
        name="email"
        type="email"
        label="Email address"
        icon={Mail}
        required
        disabled={isPending}
      />
      <FloatingInput
        id="signup-password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Create Secure Password"
        icon={Lock}
        required
        disabled={isPending}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground focus:outline-none p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
      />

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 rounded-xl font-medium shadow-lg shadow-primary/10 transition-all active:scale-[0.99] mt-2"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Registering...
          </span>
        ) : (
          "Register Account"
        )}
      </Button>
    </form>
  );
}
