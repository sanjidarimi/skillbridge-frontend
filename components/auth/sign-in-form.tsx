"use client";

import { handleSignIn } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useActionState, useState } from "react";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(handleSignIn, null);

  return (
    <form action={formAction} className="space-y-4">
      {state && (
        <div
          className={`p-3 rounded-xl text-xs font-medium text-center ${state.success ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}
        >
          {state.message}
        </div>
      )}

      <FloatingInput
        id="signin-email"
        name="email"
        type="email"
        label="Email address"
        icon={Mail}
        required
        disabled={isPending}
      />

      <div className="space-y-1.5">
        <FloatingInput
          id="signin-password"
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
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
        <div className="text-right">
          <a
            href="#"
            className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 rounded-xl font-medium shadow-lg shadow-primary/10 transition-all active:scale-[0.99]"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Accessing...
          </span>
        ) : (
          "Access Dashboard"
        )}
      </Button>
    </form>
  );
}
