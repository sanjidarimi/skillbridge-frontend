/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  Briefcase,
  CalendarDays,
  Clock,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Sliders,
  UserCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export type UserRole = "STUDENT" | "TUTOR";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardSidebarProps {
  role: UserRole;
  userEmail?: string;
  userName?: string;
}

const STUDENT_LINKS: SidebarItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarDays },
  { label: "Reviews", href: "/dashboard/reviews", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Sliders },
];

const TUTOR_LINKS: SidebarItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Availability", href: "/dashboard/availability", icon: Clock },
  { label: "My Sessions", href: "/dashboard/sessions", icon: Briefcase },
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

export default function DashboardSidebar({
  role,
  userEmail = "user@skillbridge.com",
  userName = "User Account",
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const activeLinks = role === "TUTOR" ? TUTOR_LINKS : STUDENT_LINKS;

  const renderNavLinks = () => (
    <nav className="space-y-1" aria-label="Dashboard Primary Navigation">
      {activeLinks.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/10"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Icon
              className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
    
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border w-full sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm">
            SB
          </div>
          <span className="font-extrabold text-base tracking-tight">
            SkillBridge
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
            {role.toLowerCase()}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-secondary border border-border text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
          aria-expanded={isOpen}
          aria-label="Toggle Navigation Dashboard Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0 p-6 justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center font-black">
                SB
              </div>
              <span className="font-extrabold tracking-tight text-lg">
                SkillBridge
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border">
              {role}
            </span>
          </div>

          {renderNavLinks()}
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground border border-border font-bold flex items-center justify-center text-sm">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-foreground truncate">
                {userName}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {userEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/5 border border-transparent hover:border-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>


      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-200">
      
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

         
          <div className="relative flex flex-col w-64 bg-card p-6 h-full border-r border-border shadow-2xl animate-in slide-in-from-left duration-200 justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground w-7 h-7 rounded-md flex items-center justify-center font-black text-xs">
                    SB
                  </div>
                  <span className="font-extrabold tracking-tight text-sm">
                    SkillBridge
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                  aria-label="Close menu Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {renderNavLinks()}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-3 px-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center text-xs">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold truncate text-foreground">
                    {userName}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {userEmail}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
