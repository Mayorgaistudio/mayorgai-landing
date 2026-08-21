import Hero from "@/components/Hero";
import KineticMarquee from "@/components/KineticMarquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import WhyMayorgai from "@/components/WhyMayorgai";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-white dark:bg-deep-space transition-colors duration-300">
      <Hero />
      <KineticMarquee />
      <Services />
      <div className="section-divider" />
      <Portfolio />
      <KineticMarquee reverse={true} />
      <Process />
      <div className="section-divider" />
      <WhyMayorgai />
      <div className="section-divider" />
      <FAQ />
      <div className="section-divider" />
      <Contact />
    </main>
  );
}
