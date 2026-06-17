import { GraduationCap } from "lucide-react";
import Link from "next/link";
import FooterNewsletters from "./footer-newsletter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-border/60">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
            >
              <div className="p-1.5 bg-primary text-primary-foreground rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>SkillBridge</span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Connecting eager learners with real-world experts for structured,
              live 1-on-1 tutoring sessions across coding, business, and design.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Platform
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="/tutors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Tutors
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Join as Student
                </a>
              </li>
              <li>
                <a
                  href="/register?role=tutor"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Apply to Teach
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Subjects Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Subjects
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Data Science
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Updates */}
          <FooterNewsletters/>
        </div>

        <div className="pt-8 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} SkillBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
