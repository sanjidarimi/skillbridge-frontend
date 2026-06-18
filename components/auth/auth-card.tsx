"use client";
import { ChevronLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CustomTabs } from "./custom-tabs";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

type TabValue = "signin" | "signup";

export function AuthCard() {
  const [activeTab, setActiveTab] = useState<TabValue>("signin");

  return (
    <div className="w-full max-w-md border border-border bg-card text-foreground shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
      
      <div className="text-center relative pt-14 pb-8 px-6">
        <Link
          href="/"
          className="absolute left-6 top-6 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back home
        </Link>


        <div className="flex flex-col items-center justify-center gap-3.5 mt-2">
          <div className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg ring-4 ring-primary/10">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="font-bold tracking-tight text-2xl">
            Skill Bridge
          </h1>
        </div>

        <p className="text-muted-foreground text-xs max-w-65 mx-auto mt-3 leading-relaxed">
          Accelerate your potential across professional ecosystems
        </p>
      </div>

      <div className="px-7 pb-4">
        <CustomTabs activeTab={activeTab} onTabChange={setActiveTab} />


        <div className="mt-6 min-h-72">
          {activeTab === "signin" ? (
            <div className="animate-in fade-in duration-200">
              <SignInForm />
            </div>
          ) : (
            <div className="animate-in fade-in duration-200">
              <SignUpForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}