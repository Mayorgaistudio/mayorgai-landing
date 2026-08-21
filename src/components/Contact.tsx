"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const serviceOptions = [
  "Branding & Identidad",
  "Diseño Web & Next.js",
  "Automatización con IA",
  "Agentes de Voz 24/7",
  "Software a Medida",
  "Producción Audiovisual",
];

const budgetOptions = [
  "Menos de $1,500 USD",
  "$1,500 – $3,500 USD",
  "$3,500 – $7,000 USD",
  "+$7,000 USD (Empresarial)",
];

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Diseño Web & Next.js",
  ]);
  const [selectedBudget, setSelectedBudget] = useState<string>(
    "$1,500 – $3,500 USD"
  );

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.length > 1
          ? prev.filter((s) => s !== service)
          : prev
        : [...prev, service]
    );
  };

  // Build customized WhatsApp URL with prefilled scope
  const getWhatsAppUrl = () => {
    const servicesText = selectedServices.join(", ");
    const message = `Hola MayorgAI Studio! Me gustaría cotizar un proyecto.\n\n✦ Servicios de interés: ${servicesText}\n✦ Rango de presupuesto: ${selectedBudget}\n\n¿Podemos agendar una llamada breve?`;
    return `https://wa.me/593979139647?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Volumetric Glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-[#6D5DFB]/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="w-[500px] h-[500px] bg-[#00D4FF]/5 rounded-full blur-[160px] translate-x-32 -translate-y-20 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 35, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            INICIEMOS UN PROYECTO
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cabinet text-slate-900 dark:text-white leading-[1.1] tracking-tight mt-4">
            Construyamos Algo <br className="hidden sm:inline" />
            <span className="text-gradient-aurora">Extraordinario.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-silver/70 mt-4 max-w-xl font-normal leading-relaxed">
            Selecciona las soluciones que tu negocio necesita y hablemos directamente de tu estrategia.
          </p>
        </motion.div>

        {/* ── Interactive Project Scope Estimator Card ── */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] as any }}
          className="relative rounded-3xl p-7 sm:p-10 md:p-12 bg-white/90 dark:bg-[#0c0f18]/90 border border-slate-200/90 dark:border-white/[0.09] shadow-xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          {/* Step 1: Services Selector */}
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#6D5DFB] dark:text-[#8A63FF] block mb-4">
              1. ¿Qué soluciones necesitas? (Selecciona una o más)
            </span>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {serviceOptions.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "gradient-aurora text-white shadow-md shadow-purple/20 scale-[1.02]"
                        : "bg-slate-100/80 dark:bg-white/[0.04] text-slate-700 dark:text-silver/70 hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200/60 dark:border-white/[0.06]"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Budget Range */}
          <div className="mb-10 pt-6 border-t border-slate-200/60 dark:border-white/[0.06]">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#00D4FF] block mb-4">
              2. Rango de inversión estimado
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {budgetOptions.map((budget) => {
                const isSelected = selectedBudget === budget;
                return (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setSelectedBudget(budget)}
                    className={`p-3 rounded-2xl text-xs sm:text-sm font-medium text-center transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? "bg-purple/10 border-purple text-purple-dark dark:text-white dark:bg-purple/20 dark:border-purple/50 shadow-sm"
                        : "bg-slate-50/50 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/[0.04] text-slate-600 dark:text-silver/60 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    {budget}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200/60 dark:border-white/[0.06]">
            <div className="text-center sm:text-left">
              <span className="text-xs text-slate-500 dark:text-silver/50 block">
                Atención directa con nuestro equipo técnico
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                Respuesta en menos de 2 horas hábiles
              </span>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold text-white gradient-aurora hover:shadow-[0_0_35px_rgba(109,93,251,0.45)] transition-all duration-300 btn-glow text-center flex items-center justify-center gap-3 hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.706 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Cotizar por WhatsApp →</span>
            </a>
          </div>
        </motion.div>

        {/* Alternate email link */}
        <p className="mt-8 text-center text-slate-400 dark:text-silver/40 text-sm font-normal">
          ¿Prefieres correo electrónico? Escríbenos a{" "}
          <a
            href="mailto:ceomayorgaistudio@gmail.com"
            className="text-slate-800 dark:text-silver hover:text-purple dark:hover:text-white transition-colors duration-300 font-medium underline underline-offset-4"
          >
            ceomayorgaistudio@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
