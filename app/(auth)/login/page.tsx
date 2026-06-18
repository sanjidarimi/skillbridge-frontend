import { AuthCard } from "@/components/auth/auth-card";

export const metadata = {
  title: "Authentication | Skill Bridge",
  description: "Sign in or register your Skill Bridge account.",
};

export default function AuthPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-Linear-to-br from-background via-muted/30 to-background p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <AuthCard />
      </div>
    </main>
  );
}
