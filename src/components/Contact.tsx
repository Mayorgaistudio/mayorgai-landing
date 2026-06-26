"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-[#6D5DFB]/10 rounded-full blur-[160px] animate-glow-pulse" />
        <div className="w-[500px] h-[500px] bg-[#00D4FF]/5 rounded-full blur-[140px] -translate-x-12 translate-y-12" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            HABLEMOS
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cabinet text-slate-900 dark:text-white leading-[1.1] tracking-tight mt-6 max-w-3xl">
            Construyamos Algo <br className="hidden sm:inline" />
            <span className="text-gradient-aurora">Extraordinario.</span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-silver/70 mt-6 max-w-2xl leading-relaxed font-normal">
            ¿Listo para transformar tu negocio con diseño y automatización impulsados por IA? Conversemos.
          </p>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full sm:w-auto">
            <a
              href="https://wa.me/593979139647"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 rounded-full text-lg font-medium text-white gradient-aurora hover:shadow-[0_0_35px_rgba(109,93,251,0.4)] transition-all duration-300 btn-glow"
            >
              Agendar Llamada
            </a>
            
            <a
              href="https://wa.me/593979139647"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-medium text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-all duration-300"
            >
              {/* WhatsApp Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.706 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <p className="mt-8 text-slate-400 dark:text-silver/40 text-sm font-normal">
            o escríbenos a{" "}
            <a
              href="mailto:ceomayorgaistudio@gmail.com"
              className="text-slate-800 hover:text-slate-900 dark:text-silver dark:hover:text-white transition-colors duration-300 underline underline-offset-4"
            >
              ceomayorgaistudio@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
