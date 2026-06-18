import AboutPlatform from "@/components/landing/about-platform";
import BestCourses from "@/components/landing/best-courses";
import FAQSection from "@/components/landing/faq-section";
import HeroSection from "@/components/landing/hero-section";
import StatsSection from "@/components/landing/stats";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BestCourses />
      <AboutPlatform />
      <StatsSection />
      <FAQSection />
    </>
  );
}
