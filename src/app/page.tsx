import Hero from "@/components/Hero";
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
      <div className="section-divider" />
      <Services />
      <div className="section-divider" />
      <Portfolio />
      <div className="section-divider" />
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
