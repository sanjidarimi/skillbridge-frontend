"use client"
import {
  ArrowRight,
  Binary,
  Briefcase,
  CheckCircle2,
  Code2,
  Languages,
  Palette,
  Search,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

type CategoryId =
  | "development"
  | "design"
  | "languages"
  | "science"
  | "business";

interface Category {
  id: CategoryId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  popularTutors: string;
  tagline: string;
}

const CATEGORIES: Category[] = [
  {
    id: "development",
    name: "Development",
    icon: Code2,
    popularTutors: "1,240+ Tutors",
    tagline: "Learn React, Python, Systems Architecture, and Data Science.",
  },
  {
    id: "design",
    name: "Design & UI/UX",
    icon: Palette,
    popularTutors: "850+ Tutors",
    tagline: "Master Figma, Product Design, and Visual Storytelling.",
  },
  {
    id: "languages",
    name: "Languages",
    icon: Languages,
    popularTutors: "2,100+ Tutors",
    tagline: "Become fluent in English, Spanish, Japanese, or Mandarin.",
  },
  {
    id: "science",
    name: "Math & Science",
    icon: Binary,
    popularTutors: "980+ Tutors",
    tagline: "Crack Physics, Advanced Calculus, and Linear Algebra.",
  },
  {
    id: "business",
    name: "Business & Marketing",
    icon: Briefcase,
    popularTutors: "640+ Tutors",
    tagline: "Deep dive into SEO, Venture Capital, and Product Management.",
  },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<CategoryId>("development");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const activeCategoryInfo =
    CATEGORIES.find((cat) => cat.id === activeTab) || CATEGORIES[0];

  return (
    <section className="relative min-h-[90vh] bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div
          className={`lg:col-span-7 space-y-6 text-center lg:text-left transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            SkillBridge Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
            Connect with Expert Tutors, <br className="hidden sm:inline" />
            <span className="text-primary">Learn Anything instantly.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Ditch the guesswork. Browse vetted profiles, lock in flexible
            availability slots, and learn 1-on-1 from real-world masters across
            tech, design, and business.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto lg:mx-0 bg-card p-2 rounded-xl border border-border shadow-sm focus-within:ring-1 focus-within:ring-primary transition-all"
          >
            <div className="flex items-center flex-1 w-full pl-3 gap-2">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search subjects or tutors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-foreground text-sm py-2 placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:opacity-90 text-primary-foreground rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              Find Tutors
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

     
          <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">
                15,000+
              </span>{" "}
              Students
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-foreground">4.9/5</span>{" "}
              Rating
            </div>
          </div>
        </div>

        
        <div
          className={`lg:col-span-5 relative transition-all duration-1000 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-2 blur-md -z-10" />

          <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-4">
              Explore Disciplines
            </h3>

            <div className="flex flex-wrap gap-2 mb-6" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    activeTab === cat.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="bg-muted/50 rounded-xl p-5 border border-border min-h-35 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-foreground">
                    {activeCategoryInfo.name}
                  </h4>
                  <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    {activeCategoryInfo.popularTutors}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeCategoryInfo.tagline}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Instant
                  Book
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Vetted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
