import AboutPlatform from "./home/_components/about-platform";
import BestCourses from "./home/_components/best-courses";
import FAQSection from "./home/_components/faq-section";
import HeroSection from "./home/_components/hero-section";
import StatsSection from "./home/_components/stats";

export default function Home() {
  return <>
  <HeroSection/>
  <BestCourses/>
  <AboutPlatform/>
  <StatsSection/>
  <FAQSection/>
  </>;
}
