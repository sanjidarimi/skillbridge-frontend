"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, GraduationCap } from "lucide-react";
import { CustomTabs } from "./custom-tabs";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

type TabValue = "signin" | "signup";

export function AuthCard() {
  const [activeTab, setActiveTab] = useState<TabValue>("signin");

  return (
    <div className="w-full max-w-md border border-neutral-800 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden transition-all duration-300">
      
      {/* Redesigned Premium Header */}
      <div className="text-center relative pt-14 pb-8 px-6">
        <Link 
          href="/" 
          className="absolute left-6 top-6 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors group"
        >
          <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back home
        </Link>

        {/* Central Brand Asset */}
        <div className="flex flex-col items-center justify-center gap-3.5 mt-2">
          <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-2xl shadow-blue-500/30 ring-4 ring-blue-500/10">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="font-bold tracking-tight text-2xl text-white">
            Skill Bridge
          </h1>
        </div>
        
        <p className="text-neutral-400 text-xs max-w-[260px] mx-auto mt-3 leading-relaxed">
          Accelerate your potential across professional ecosystems
        </p>
      </div>

      {/* Core Body Container */}
      <div className="px-7 pb-4">
        {/* Customized Non-Shadcn Interactive Element */}
        <CustomTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Dynamic Panel Renderer with Micro-Fade Animations */}
        <div className="mt-6 min-h-[290px]">
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