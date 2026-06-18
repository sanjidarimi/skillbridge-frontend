"use client"
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../landing/mode-toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const navigate = useNavigate();
  const handleAuthButton = () => {
    // navigate("/auth/sign-up");
  };
  // Navigation links data
  const navLinks = [
    { href: "#", label: "Features" },
    { href: "#", label: "Pricing" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ];

  return (
    <header className="bg-background backdrop-blur-sm sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="shrink-0">
            <Link href="/" className="font-bold text-2xl">
              <span className="text-primary">Skill </span>Bridge
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
              href={link.href}
                className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button size="lg" onClick={handleAuthButton}>Get Started</Button>

            {/* Theme Toggle Button */}
            <ModeToggle />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Sheet) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="w-full mt-2 text-center items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 block transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
