import { ArrowRight, CalendarDays, ShieldCheck, Zap } from "lucide-react";

interface PlatformFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: 1,
    title: "100% Vetted Expert Tutors",
    description:
      "Every tutor undergoes real-world performance tests and credentials verification.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Instant Booking Sync",
    description:
      "No back-and-forth emails. Pick a confirmed open calendar window and secure it instantly.",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "High-Velocity Feedback Loop",
    description:
      "Track milestones post-session and execute structured programmatic reviews.",
    icon: Zap,
  },
];

export default function AboutPlatform() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-background transition-colors duration-300 border-t border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <div className="lg:col-span-5 relative h-120 sm:h-135 w-full max-w-md mx-auto lg:max-w-none">
          
          <div className="absolute top-0 left-0 w-[70%] h-[65%] rounded-2xl overflow-hidden shadow-md border border-border bg-secondary flex flex-col justify-between p-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              01
            </div>
            <p className="text-xs font-mono tracking-tight text-muted-foreground uppercase">
            Structured Mastery
            </p>
          </div>

          <div className="absolute bottom-4 right-0 w-[65%] h-[55%] rounded-2xl overflow-hidden shadow-xl border border-primary/20 bg-card z-10 flex flex-col justify-between p-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                Live Stats
              </span>
              <p className="text-2xl font-black text-foreground">98.4%</p>
              <p className="text-xs text-muted-foreground">
                Successful project delivery rate after tutoring sessions.
              </p>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[94%] bg-primary" />
            </div>
          </div>

   
          <div className="absolute bottom-0 left-[10%] w-[40%] h-[25%] rounded-xl shadow-lg bg-primary text-primary-foreground p-4 z-20 flex flex-col justify-center gap-1">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              Network Size
            </p>
            <p className="text-xl font-bold">4.8k+ Mentors</p>
          </div>

         
          <div className="absolute -inset-4 bg-radial from-primary/5 to-transparent rounded-full blur-2xl -z-10" />
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
               Why SkillBridge Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Over 10 Years in Distant learning for Skill Development
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
             The core mission of an <span className="text-primary">SkillBridge</span> is to empower individuals with both technical and linguistic skills to enhance their career opportunities. Many tech professionals struggle with effectively articulating their ideas in global work environments
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            {PLATFORM_FEATURES.map((feat) => {
              const IconComponent = feat.icon;
              return (
                <div
                  key={feat.id}
                  className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card/60 hover:bg-card transition-all"
                >
                  <div className="p-2.5 h-fit rounded-lg bg-secondary text-primary border border-border">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-foreground">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button className="group inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground hover:opacity-90 font-medium text-sm rounded-lg transition-all shadow-sm">
              Discover More About Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
