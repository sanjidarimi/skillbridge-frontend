"use client";
import { useEffect, useState } from "react";

interface StatItem {
  id: string;
  value: string;
  label: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: "stat-1",
    value: "3,192+",
    label: "Successfully Trained",
  },
  {
    id: "stat-2",
    value: "15,485+",
    label: "Classes Completed",
  },
  {
    id: "stat-3",
    value: "99.2%",
    label: "Satisfaction Rate",
  },
  {
    id: "stat-4",
    value: "24/7",
    label: "Mentor Support",
  },
];

export default function StatsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full bg-primary text-primary-foreground py-16 sm:py-20 overflow-hidden select-none">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-2 text-center transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {STATS_DATA.map((stat, index) => (
            <div
              key={stat.id}
              className={`relative flex flex-col justify-center items-center px-4 group ${
                index !== STATS_DATA.length - 1
                  ? "md:border-r md:border-primary-foreground/15"
                  : ""
              }`}
            >
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight block transform transition-transform duration-300 group-hover:scale-105">
                {stat.value}
              </span>

              <span className="mt-3 text-xs lg:text-sm font-bold uppercase tracking-widest text-primary-foreground/85 max-w-50 mx-auto leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
