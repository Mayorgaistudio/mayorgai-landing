"use client";

import { motion } from "framer-motion";

export default function WhyMayorgai() {
  const valueProps = [
    {
      title: "Creatividad",
      description: "Enfoque centrado en el diseño que hace que tu marca sea inolvidable.",
      icon: (
        <svg className="w-7 h-7 stroke-[#6D5DFB]" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096a.405.405 0 00-.29-.29L2.8 14.813a.405.405 0 000-.576l5.096-.813a.405.405 0 00.29-.29l.813-5.096a.405.405 0 00.75 0l.813 5.096a.405.405 0 00.29.29l5.096.813a.405.405 0 000 .576l-5.096.813a.405.405 0 00-.29.29zM19.006 5.005l-.5-3.003-.5 3.003-3.003.5 3.003.5.5 3.003.5-3.003 3.003-.5-3.003-.5z" />
        </svg>
      ),
    },
    {
      title: "Tecnología",
      description: "Desarrollado con herramientas de última generación para velocidad, seguridad y escala.",
      icon: (
        <svg className="w-7 h-7 stroke-[#6D5DFB]" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M6.75 6.75h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V9a2.25 2.25 0 012.25-2.25z" />
        </svg>
      ),
    },
    {
      title: "Automatización",
      description: "Sistemas impulsados por IA que trabajan para ti las 24 horas del día.",
      icon: (
        <svg className="w-7 h-7 stroke-[#6D5DFB]" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      title: "Resultados",
      description: "Todo lo que construimos está diseñado para impulsar un crecimiento medible.",
      icon: (
        <svg className="w-7 h-7 stroke-[#6D5DFB]" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-[#6D5DFB]/5 rounded-full blur-[180px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            POR QUÉ MAYORGA ISTUDIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-4 tracking-tight">
            Diferentes por Diseño
          </h2>
          <p className="text-lg text-slate-600 dark:text-silver/70 mt-4 max-w-2xl font-normal leading-relaxed">
            No solo construimos: diseñamos experiencias digitales premium que impulsan a los negocios.
          </p>
        </div>

        {/* Value Props Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-20"
        >
          {valueProps.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#6D5DFB]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#6D5DFB]/20">
                {value.icon}
              </div>
              
              {/* Text */}
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                  {value.title}
                </h3>
                <p className="text-slate-500 dark:text-silver/60 text-sm mt-2 leading-relaxed font-normal">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
