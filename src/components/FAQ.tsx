"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Load Elfsight platform script dynamically
    const scriptId = "elfsight-platform-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const faqs = [
    {
      q: "¿Qué servicios ofrece MayorgAI Studio?",
      a: "Nos especializamos en branding, diseño web premium, automatización con IA, agentes de voz, chatbots, creación de contenido y desarrollo de software a medida. Cada proyecto se adapta a tus necesidades específicas.",
    },
    {
      q: "¿Cuánto tiempo toma un proyecto típico?",
      a: "Los tiempos varían según el alcance. Una identidad de marca toma de 2 a 3 semanas, un sitio web completo de 4 a 8 semanas, y los sistemas de automatización con IA de 3 a 6 semanas. Siempre entregamos un cronograma detallado antes de comenzar.",
    },
    {
      q: "¿Trabajan con startups o solo con empresas establecidas?",
      a: "Trabajamos con ambas. Ya sea que estés lanzando un nuevo proyecto o escalando un negocio existente, aportamos el mismo nivel de calidad y dedicación.",
    },
    {
      q: "¿Qué hace a MayorgAI diferente de otras agencias?",
      a: "Combinamos la creatividad con la inteligencia artificial y la automatización. Esto significa que obtienes un diseño hermoso Y sistemas inteligentes que realmente impulsan el crecimiento, no solo un sitio web bonito.",
    },
    {
      q: "¿Cuánto cuesta un proyecto?",
      a: "Cada proyecto es único. Ofrecemos propuestas personalizadas basadas en tus objetivos y alcance. Agenda una llamada con nosotros para conversar sobre tus necesidades y obtener una cotización clara.",
    },
    {
      q: "¿Ofrecen soporte continuo después del lanzamiento?",
      a: "Por supuesto. Ofrecemos planes de mantenimiento, monitoreo de rendimiento y optimización continua para garantizar que tus sistemas sigan ofreciendo resultados.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#6D5DFB]/[0.02] rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#00D4FF]/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col text-center items-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            FAQ & COMUNIDAD
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-4 tracking-tight text-center">
            Habla con nosotros
          </h2>
        </div>

        {/* 2-Column Grid (50/50 split on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: FAQ ACCORDION */}
          <div className="w-full flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#6D5DFB]">
              PREGUNTAS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cabinet text-slate-900 dark:text-white mt-2 mb-6 tracking-tight">
              Resolviendo tus Dudas
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-4 w-full"
            >
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-[#6D5DFB]/30 bg-[#6D5DFB]/[0.02] dark:bg-white/[0.03]"
                        : "border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] hover:border-slate-300 dark:hover:border-white/[0.12] hover:bg-slate-100/50 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Trigger Button */}
                    <button
                      onClick={() => handleToggle(index)}
                      className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                    >
                      <span className="text-lg font-medium text-slate-900 dark:text-white tracking-tight">
                        {faq.q}
                      </span>
                      
                      {/* Plus / Minus Icon */}
                      <div className="w-6 h-6 shrink-0 flex items-center justify-center relative">
                        <span className={`w-4 h-[2px] bg-slate-400 dark:bg-silver rounded-full absolute transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        <span className={`w-[2px] h-4 bg-slate-400 dark:bg-silver rounded-full absolute transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : ""}`} />
                      </div>
                    </button>

                    {/* Collapsible Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-650 dark:text-silver/60 text-sm leading-relaxed font-normal px-6 pb-6 pt-0">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: SOCIAL */}
          <div className="flex flex-col items-start w-full">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#6D5DFB]">
              SOCIAL
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cabinet text-slate-900 dark:text-white mt-2 mb-6 tracking-tight">
              Nuestras Redes
            </h3>

            {/* Elfsight Live Instagram Feed */}
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] p-1 min-h-[380px] self-stretch">
              <div 
                className="elfsight-app-970a04eb-7116-4d85-8df5-9e9e3e89425f" 
                data-elfsight-app-lazy="" 
              />
            </div>

            <p className="text-sm text-slate-500 dark:text-silver/50 mt-4 leading-relaxed">
              Síguenos en Instagram{" "}
              <a
                href="https://www.instagram.com/mayorgaistudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D5DFB] hover:text-[#8A63FF] font-medium transition-colors"
              >
                @mayorgaistudio
              </a>{" "}
              para ver nuestro proceso creativo diario, proyectos recientes y actualizaciones tecnológicas.
            </p>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 mt-6 pt-5 border-t border-slate-200 dark:border-white/[0.06] w-full">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-silver/40 mr-1 font-medium">
                Síguenos:
              </span>
              
              {/* Facebook */}
              <a
                href="https://www.facebook.com/mayorgaistudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/20 flex items-center justify-center text-slate-500 dark:text-silver/60 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mayorgaistudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/20 flex items-center justify-center text-slate-500 dark:text-silver/60 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/20 flex items-center justify-center text-slate-500 dark:text-silver/60 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="X (Twitter)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/20 flex items-center justify-center text-slate-500 dark:text-silver/60 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
