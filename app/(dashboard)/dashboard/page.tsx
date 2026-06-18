"use client";

import React, { useState, useMemo, useId } from "react";

import { 
  GraduationCap, 
  Clock, 
  CreditCard, 
  CalendarDays, 
  XSquare, 

  BookOpen, 
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { mockBookings, mockTutorProfiles, mockUsers } from "@/data/mock.data";

interface HydratedBooking {
  id: string;
  tutorName: string;
  tutorCategory: string;
  slot: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED" | string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  variant: "primary" | "success" | "info";
}

export default function StudentDashboardPage() {
  const selectFilterId = useId();
  
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [bookingsList, setBookingsList] = useState<HydratedBooking[]>(() => {
   
    return mockBookings.map((booking) => {
      const tutorProfile = mockTutorProfiles.find((p) => p.id === booking.tutorProfileId);
      const userMatch = tutorProfile ? mockUsers.find((u) => u.id === tutorProfile.userId) : null;
      
     
      const lowerBio = tutorProfile?.bio.toLowerCase() || "";
      let matchedCat = "General Study";
      if (lowerBio.includes("web") || lowerBio.includes("react")) matchedCat = "Web Development";
      else if (lowerBio.includes("science") || lowerBio.includes("computer")) matchedCat = "Data Science";

      return {
        id: booking.id,
        tutorName: userMatch ? userMatch.name : "SkillBridge Educator",
        tutorCategory: matchedCat,
        slot: booking.slot,
        status: booking.status,
      };
    });
  });

  const metrics = useMemo(() => {
    const totalSessions = bookingsList.length;
    const completedOrActive = bookingsList.filter(b => b.status !== "CANCELLED").length;
    
    const functionalSpent = mockBookings.reduce((sum, current) => {
      const match = mockTutorProfiles.find(p => p.id === current.tutorProfileId);
      return sum + (match ? match.pricePerHour : 0);
    }, 0);

    return {
      totalSessions,
      hoursLearnt: completedOrActive * 2, 
      totalSpent: functionalSpent
    };
  }, [bookingsList]);

  const filteredBookings = useMemo(() => {
    if (statusFilter === "ALL") return bookingsList;
    return bookingsList.filter(b => b.status.toUpperCase() === statusFilter.toUpperCase());
  }, [bookingsList, statusFilter]);

  const handleCancelSession = (id: string) => {
    setBookingsList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, status: "CANCELLED" } : item
      )
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 p-6">
      
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Welcome Back, Rahat!</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor tracking logs, live lessons calendars, and resource structural investments here.
          </p>
        </div>
        <div className="bg-card px-4 py-2.5 rounded-xl border border-border flex items-center gap-2 self-start sm:self-auto shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Account Status: Active Student</span>
        </div>
      </header>

      {/* Modern High-End Metrics Card Section */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Operational KPI Summary Counters">
        <MetricSummaryCard 
          title="Total Scheduled Sessions"
          value={metrics.totalSessions}
          icon={<GraduationCap className="w-5 h-5" />}
          trend="+1 scheduled this cycle"
          variant="primary"
        />
        <MetricSummaryCard 
          title="Accumulated Hours"
          value={`${metrics.hoursLearnt} hrs`}
          icon={<Clock className="w-5 h-5" />}
          trend="92% active attendance target"
          variant="success"
        />
        <MetricSummaryCard 
          title="Total Financial Investment"
          value={`$${metrics.totalSpent}.00`}
          icon={<CreditCard className="w-5 h-5" />}
          trend="Calculated standard base cost"
          variant="info"
        />
      </section>

      {/* Upcoming Operational Sessions Logs Section */}
      <section className="bg-card border border-border rounded-2xl shadow-xs overflow-hidden">
        
        {/* Table Management Filter Control Sub-Header */}
        <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-b from-card to-muted/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-foreground tracking-tight">Your Learning Schedule</h2>
              <p className="text-xs text-muted-foreground">Comprehensive tracking system for academic requests.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label htmlFor={selectFilterId} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Filter Status:
            </label>
            <select
              id={selectFilterId}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold bg-background border border-border text-foreground px-3 py-1.5 rounded-lg outline-hidden focus:ring-2 focus:ring-ring transition-all cursor-pointer"
            >
              <option value="ALL">All Sessions</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Core Layout Data Table Container Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground text-xs font-bold uppercase tracking-wider border-b border-border select-none">
                <th className="py-3.5 px-6">Tutor Info</th>
                <th className="py-3.5 px-6">Domain Track</th>
                <th className="py-3.5 px-6">Target Date & Time Slot</th>
                <th className="py-3.5 px-6">State Badge</th>
                <th className="py-3.5 px-6 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <div className="max-w-xs mx-auto space-y-2">
                      <AlertCircle className="w-6 h-6 text-muted-foreground mx-auto opacity-60" />
                      <p className="font-medium text-sm">No synchronized logs found</p>
                      <p className="text-xs text-muted-foreground">There are currently no session requests matching the selected status configuration criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/15 transition-colors group">
                    {/* Column 1: Tutor Profile Info */}
                    <td className="py-4 px-6 font-bold text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary border border-border text-secondary-foreground text-xs font-black flex items-center justify-center">
                          {booking.tutorName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="group-hover:text-primary transition-colors">{booking.tutorName}</span>
                      </div>
                    </td>

                    {/* Column 2: Domain Category Target */}
                    <td className="py-4 px-6 text-muted-foreground">
                      <div className="flex items-center gap-1.5 text-xs font-medium bg-muted/60 px-2 py-1 rounded-md border border-border/40 w-fit">
                        <BookOpen className="w-3 h-3 text-primary" />
                        {booking.tutorCategory}
                      </div>
                    </td>

                    {/* Column 3: Scheduled Date and Execution Time Stamp */}
                    <td className="py-4 px-6 text-foreground font-medium whitespace-nowrap">
                      {booking.slot}
                    </td>

                    {/* Column 4: Context State Pill */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <StatusIndicatorPill status={booking.status} />
                    </td>

                    {/* Column 5: Mutating Conditional Administrative Control buttons */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      {booking.status === "CONFIRMED" ? (
                        <button
                          type="button"
                          onClick={() => handleCancelSession(booking.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-destructive/20 text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                        >
                          <XSquare className="w-3.5 h-3.5" /> Cancel Session
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground/60 font-medium select-none italic pr-4">Logs Locked</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// --- Architectural Isolated Helper Components to guarantee decoupling optimization ---

function MetricSummaryCard({ title, value, icon, trend, variant }: MetricCardProps) {
  const variantStyles = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    info: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  };

  return (
    <article className="bg-card border border-border rounded-2xl p-5 flex items-start justify-between shadow-2xs relative overflow-hidden group hover:border-border/80 transition-colors">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">{title}</span>
        <span className="text-3xl font-black tracking-tight text-foreground block">{value}</span>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-1 font-medium">
          <TrendingUp className="w-3 h-3 text-muted-foreground/60" />
          <span>{trend}</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl border ${variantStyles[variant]} transition-transform duration-300 group-hover:scale-105 shadow-2xs`}>
        {icon}
      </div>
    </article>
  );
}

function StatusIndicatorPill({ status }: { status: string }) {
  const cleanState = status.toUpperCase();

  if (cleanState === "CONFIRMED") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 select-none">
        Confirmed
      </span>
    );
  }
  if (cleanState === "COMPLETED") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 select-none">
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-destructive/10 text-destructive border border-destructive/20 select-none">
      Cancelled
    </span>
  );
}