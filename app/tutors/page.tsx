"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { mockCategories, mockTutorProfiles, mockUsers } from "@/data/mock.data";
import {
  BookOpen,
  DollarSign,
  GraduationCap,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

interface ExtendedTutorCardProps {
  id: string;
  name: string;
  bio: string;
  pricePerHour: number;
  rating: number;
  categories: string[];
}

export default function TutorsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(50);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const priceSliderId = useId();

  const structuralTutors: ExtendedTutorCardProps[] = useMemo(() => {
    return mockTutorProfiles.map((profile) => {
      const userMatch = mockUsers.find((u) => u.id === profile.userId);

      const assignedCategories: string[] = [];
      const lowerBio = profile.bio.toLowerCase();

      if (
        lowerBio.includes("web") ||
        lowerBio.includes("react") ||
        lowerBio.includes("stack")
      ) {
        assignedCategories.push("cat-1");
      }
      if (lowerBio.includes("science") || lowerBio.includes("computer")) {
        assignedCategories.push("cat-2");
      }
      if (assignedCategories.length === 0) {
        assignedCategories.push("cat-1");
      }

      return {
        id: profile.id,
        name: userMatch ? userMatch.name : "Professional Tutor",
        bio: profile.bio,
        pricePerHour: profile.pricePerHour,
        rating: profile.rating,
        categories: assignedCategories,
      };
    });
  }, []);

  const filteredTutors = useMemo(() => {
    return structuralTutors.filter((tutor) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        tutor.categories.some((catId) => selectedCategories.includes(catId));
      const matchesPrice = tutor.pricePerHour <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [structuralTutors, selectedCategories, maxPrice]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(50);
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 transition-colors duration-200">
      <div className="container mx-auto">
        <header className="mb-10 text-center md:text-left border-b border-border pb-6">
          <span className="text-primary tracking-wide font-bold text-sm">
            Empower Your Mind
          </span>
          <h1 className="text-4xl font-bold tracking-tight mt-1 sm:text-5xl">
            Find Your Perfect Tutor at SkillBridge
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Excellence-driven interactive sessions with top-tier verified
            industry educators.
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
          <div className="flex items-center justify-between lg:hidden mb-6 bg-card p-4 border border-border shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredTutors.length}
              </span>{" "}
              tutors
            </p>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring"
              aria-expanded={isMobileFilterOpen}
              aria-controls="mobile-filter-drawer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter Options
            </button>
          </div>

          <aside className="hidden lg:block lg:col-span-1 bg-card p-6 rounded-xl border border-border shadow-sm sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                Filter Tutors
              </h2>
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors focus:underline"
              >
                Clear All
              </button>
            </div>
            <SidebarContent
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              priceSliderId={priceSliderId}
            />
          </aside>

          {isMobileFilterOpen && (
            <div
              id="mobile-filter-drawer"
              className="fixed inset-0 z-50 lg:hidden flex"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-card p-6 shadow-xl border-l border-border animate-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold tracking-tight">
                    Filter Tutors
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 rounded-md text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <SidebarContent
                  selectedCategories={selectedCategories}
                  handleCategoryChange={handleCategoryChange}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  priceSliderId={priceSliderId}
                />
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="mt-6 w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-sm shadow-md transition-transform active:scale-[0.98]"
                >
                  Apply Filters ({filteredTutors.length})
                </button>
              </div>
            </div>
          )}

          {/* Main Grid View */}
          <section className="lg:col-span-3">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                We found{" "}
                <span className="font-semibold text-foreground">
                  {filteredTutors.length}
                </span>{" "}
                premium tutors matching your criteria.
              </p>
            </div>

            {filteredTutors.length === 0 ? (
              <div className="text-center py-16 bg-card border border-dashed border-border rounded-xl p-8">
                <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">
                  No tutors match your selection
                </h3>
                <p className="text-muted-foreground text-sm mt-1 max-w-md mx-auto">
                  Try adjusting your pricing sliders or clearing out your filter
                  category checks to explore more teaching profiles.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg transition-transform active:scale-95"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredTutors.map((tutor) => (
                  <article
                    key={tutor.id}
                    className="group relative flex flex-col justify-between bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Card Header Info */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm border border-border">
                            {tutor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="font-bold text-base tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                              {tutor.name}
                            </h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-semibold text-foreground">
                                {tutor.rating.toFixed(1)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                (Verified)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <span className="text-lg font-black text-primary">
                            ${tutor.pricePerHour}
                          </span>
                          <span className="text-xs text-muted-foreground block">
                            / hour
                          </span>
                        </div>
                      </div>

                      {/* Bio Snippet */}
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                        {tutor.bio}
                      </p>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-4 border-t border-border mt-auto flex items-center justify-between gap-2">
                      <div className="flex gap-1 overflow-x-hidden">
                        {tutor.categories.map((catId) => {
                          const catName =
                            mockCategories.find((c) => c.id === catId)?.name ||
                            "Tech";
                          return (
                            <span
                              key={catId}
                              className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border whitespace-nowrap"
                            >
                              {catName}
                            </span>
                          );
                        })}
                      </div>

                      <Link
                        href={`/tutors/${tutor.id}`}
                        className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-all hover:opacity-95 focus:ring-2 focus:ring-ring focus:outline-none whitespace-nowrap shadow-xs"
                      >
                        View Profile
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

// Reusable Sub-Component for Sidebar Content to keep code modular and performant
interface SidebarContentProps {
  selectedCategories: string[];
  handleCategoryChange: (id: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  priceSliderId: string;
}

function SidebarContent({
  selectedCategories,
  handleCategoryChange,
  maxPrice,
  setMaxPrice,
  priceSliderId,
}: SidebarContentProps) {
  return (
    <div className="space-y-6">
      {/* Categories Filter Block */}
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-3 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Categories
        </h3>
        <div className="space-y-2.5">
          {mockCategories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 text-sm font-medium cursor-pointer select-none group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="w-4 h-4 rounded border-input text-primary focus:ring-ring accent-[oklch(0.685_0.169_237.323)]"
              />
              <span className="text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Pricing Range Filter Block */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3
            id={priceSliderId}
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5" /> Max Hourly Rate
          </h3>
          <span className="text-sm font-bold text-primary px-2 py-0.5 rounded bg-secondary border border-border">
            ${maxPrice}/hr
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            aria-labelledby={priceSliderId}
            min="10"
            max="50"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[oklch(0.685_0.169_237.323)] focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex justify-between text-xs text-muted-foreground px-0.5">
            <span>$10</span>
            <span>$30</span>
            <span>$50</span>
          </div>
        </div>
      </div>
    </div>
  );
}
