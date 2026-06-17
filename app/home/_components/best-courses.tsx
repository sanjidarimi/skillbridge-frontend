"use client"
import { useState } from "react";
import { 
  BookOpen, 
  Users, 
  ArrowUpRight, 
  GraduationCap, 
  Code, 
  Layers, 
  LineChart,
  Star
} from "lucide-react";

type CourseCategory = "all" | "tech" | "design" | "business";

interface CourseItem {
  id: string;
  category: CourseCategory;
  title: string;
  tutorName: string;
  coursesCount: number;
  studentsCount: number;
  icon: React.ComponentType<{ className?: string }>;
  rating: string;
}

const COURSES_DATA: CourseItem[] = [
  {
    id: "c1",
    category: "tech",
    title: "Advanced Full-Stack Web Development",
    tutorName: "Alex Rivers",
    coursesCount: 12,
    studentsCount: 1420,
    icon: Code,
    rating: "4.9",
  },
  {
    id: "c2",
    category: "design",
    title: "Next-Gen UI/UX & Design Systems",
    tutorName: "Elena Rostova",
    coursesCount: 8,
    studentsCount: 930,
    icon: Layers,
    rating: "4.8",
  },
  {
    id: "c3",
    category: "business",
    title: "Growth Marketing & Data Analytics",
    tutorName: "Marcus Vance",
    coursesCount: 15,
    studentsCount: 2150,
    icon: LineChart,
    rating: "4.9",
  },
  {
    id: "c4",
    category: "tech",
    title: "Software Architecture & Scalability",
    tutorName: "Dr. Aris Thorne",
    coursesCount: 6,
    studentsCount: 740,
    icon: GraduationCap,
    rating: "5.0",
  },
];

export default function BestCourses() {
  const [activeFilter, setActiveFilter] = useState<CourseCategory>("all");

  const filteredCourses = COURSES_DATA.filter(
    (course) => activeFilter === "all" || course.category === activeFilter
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-background transition-colors duration-300">
      
      
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
           Popular Classes
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Our Best Tutoring Programs
        </h2>
        
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Learn directly from experienced mentors who work in the field. Pick a track, set your schedule, and gain practical skills that help you land jobs.
        </p>

  
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {(["all", "tech", "design", "business"] as CourseCategory[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {tab === "all" ? "All Subjects" : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {filteredCourses.map((course) => {
          const IconComponent = course.icon;
          return (
            <div
              key={course.id}
              className="group relative bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-60"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-secondary text-primary border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium bg-muted text-foreground px-2 py-1 rounded">
                    <Star className="w-3 h-3 fill-current text-primary" /> {course.rating}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {course.title}
                </h3>
                
                <p className="text-xs text-muted-foreground">
                  Taught by <span className="text-foreground font-medium">{course.tutorName}</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    <strong className="text-foreground font-semibold">{course.coursesCount}</strong> lessons
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <strong className="text-foreground font-semibold">{(course.studentsCount / 1000).toFixed(1)}k</strong> students
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all transform group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}