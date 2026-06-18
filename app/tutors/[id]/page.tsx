"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { mockReviews, mockTutorProfiles, mockUsers } from "@/data/mock.data";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  DollarSign,
  MessageSquare,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface SelectedSlot {
  day: string;
  time: string;
}

export default function TutorProfilePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const tutorId = resolvedParams.id;

  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const tutorData = useMemo(() => {
    const profile = mockTutorProfiles.find((p) => p.id === tutorId);
    if (!profile) return null;

    const user = mockUsers.find((u) => u.id === profile.userId);
    const reviews = mockReviews.filter((r) => r.tutorProfileId === tutorId);

    const lowerBio = profile.bio.toLowerCase();
    const categories: string[] = [];
    if (lowerBio.includes("web") || lowerBio.includes("react"))
      categories.push("Web Development");
    if (lowerBio.includes("science") || lowerBio.includes("computer"))
      categories.push("Data Science");
    if (categories.length === 0) categories.push("General Education");

    return {
      profile,
      name: user ? user.name : "Expert SkillBridge Tutor",
      email: user?.email || "",
      reviews,
      categories,
    };
  }, [tutorId]);

  if (!tutorData) {
    notFound();
  }

  const { profile, name, reviews, categories } = tutorData;

  const handleSlotSelect = (day: string, time: string) => {
    setSelectedSlot({ day, time });
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    // Simulate API Network Delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setBookingSuccess(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset confirmation status only after transition delay
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedSlot(null);
    }, 2000);
  };

  return (
    <main className="bg-background text-foreground py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-6">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-hidden focus:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to all tutors
          </Link>
        </div>

        {/* Profile Grid Container */}
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {/* Main Biography & Information Blocks */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center font-black text-2xl">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h1 className="text-2xl font-extrabold tracking-tight">
                        {name}
                      </h1>
                      <ShieldCheck
                        className="w-5 h-5 text-primary"
                        aria-label="Verified Professional Badge"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categories.map((cat, i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0 bg-muted/50 p-3 rounded-xl sm:bg-transparent sm:p-0">
                  <span className="text-3xl font-black text-primary">
                    ${profile.pricePerHour}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / hour lesson
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold tracking-tight border-b border-border pb-2">
                  About the Instructor
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {profile.bio}
                </p>
              </div>

              {/* Aggregated Quick Metrics Row */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border">
                <div className="bg-secondary/40 border border-border rounded-xl p-4 text-center">
                  <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase block mb-1">
                    Rating Rating
                  </span>
                  <div className="flex items-center justify-center gap-1.5">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-extrabold">
                      {profile.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="bg-secondary/40 border border-border rounded-xl p-4 text-center">
                  <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase block mb-1">
                    Reviews Received
                  </span>
                  <div className="flex items-center justify-center gap-1.5">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="text-lg font-extrabold">
                      {reviews.length} total
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Structured Reviews Grid */}
            <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                Student Testimonials ({reviews.length})
              </h2>
              {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No historical text reviews recorded yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 bg-muted/40 border border-border rounded-xl"
                    >
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-foreground italic">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Interactive Booking & Slots Interface Block */}
          <div className="lg:col-span-1">
            <section className="bg-card border border-border rounded-xl p-6 shadow-xs sticky top-6">
              <h2 className="text-lg font-bold tracking-tight mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Select Live Session
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                Click an explicitly opened operational window below to
                initialize booking placement.
              </p>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {Object.entries(profile.availability).map(([day, slots]) => (
                  <div
                    key={day}
                    className="border border-border rounded-xl p-3.5 bg-muted/20"
                  >
                    <h3 className="text-xs font-black tracking-wider uppercase text-foreground mb-2.5 flex items-center justify-between">
                      <span>{day}</span>
                      <span className="text-[10px] font-medium text-muted-foreground bg-card border border-border px-1.5 py-0.5 rounded-sm">
                        {slots.length} available
                      </span>
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                      {slots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleSlotSelect(day, time)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-card border border-border text-foreground hover:border-primary hover:bg-secondary/80 transition-all focus:outline-hidden focus:ring-2 focus:ring-ring cursor-pointer"
                        >
                          <Clock className="w-3 h-3 text-primary" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>


      {isModalOpen && selectedSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-20"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-200 text-center">
   
            {!bookingSuccess && (
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Dismiss modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {!bookingSuccess ? (
    
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-extrabold tracking-tight mb-1">
                  Confirm Lesson Booking
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  You are scheduling a customized individual performance
                  consultation.
                </p>

                <div className="bg-muted/60 border border-border rounded-xl p-4 text-left space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm border-b border-border/60 pb-2">
                    <span className="text-muted-foreground font-medium">
                      Instructor:
                    </span>
                    <span className="font-bold text-foreground">{name}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-border/60 pb-2">
                    <span className="text-muted-foreground font-medium">
                      Target Schedule:
                    </span>
                    <span className="font-bold text-primary">
                      {selectedSlot.day} at {selectedSlot.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="text-muted-foreground font-medium">
                      Rate calculation:
                    </span>
                    <span className="font-extrabold text-foreground flex items-center text-base">
                      <DollarSign className="w-4 h-4 text-primary" />
                      {profile.pricePerHour}.00 USD
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="w-1/2 py-5 font-semibold text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting}
                    className="w-1/2 py-5 font-semibold text-sm"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-extrabold tracking-tight mb-2">
                  Reservation Secured!
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                  Your seat configuration with{" "}
                  <span className="font-bold text-foreground">{name}</span> on{" "}
                  <span className="font-bold text-primary">
                    {selectedSlot.day} at {selectedSlot.time}
                  </span>{" "}
                  is fully completed.
                </p>

                <Button
                  variant="outline"
                  type="button"
                  onClick={closeModal}
                  className="w-full py-5 text-sm font-bold"
                >
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
