"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMeta } from "@/app/api/portfolio/route";

/* ═══════════════════════════════════════════════════════
   GRADIENT PALETTE — cycles deterministically per project
   ═══════════════════════════════════════════════════════ */
const GRADIENTS = [
  "from-[#6D5DFB]/30 to-[#8A63FF]/20",
  "from-[#6D5DFB]/30 to-[#00D4FF]/20",
  "from-[#00D4FF]/30 to-[#6D5DFB]/10",
  "from-[#8A63FF]/30 to-[#6D5DFB]/20",
  "from-[#00D4FF]/25 to-[#8A63FF]/15",
];

/* ═══════════════════════════════════════════════════════
   PROJECT SLIDER (CAROUSEL) SUB-COMPONENT
   ═══════════════════════════════════════════════════════ */
function ProjectSlider({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="absolute inset-0 z-10 w-full h-full overflow-hidden group/slider">
      {/* Active Image with Fade transition and Hover Zoom */}
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Preview ${currentIndex + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Subtle overlay gradient to maintain contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090B12]/80 via-transparent to-transparent pointer-events-none z-10" />

      {/* Navigation Arrows (Visible only if more than 1 image exists) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 opacity-0 group-hover/slider:opacity-100 backdrop-blur-md cursor-pointer"
            aria-label="Anterior"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 opacity-0 group-hover/slider:opacity-100 backdrop-blur-md cursor-pointer"
            aria-label="Siguiente"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-white w-3" : "bg-white/40 w-1.5"
                }`}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SPOTLIGHT PORTFOLIO CARD
   ═══════════════════════════════════════════════════════ */
function PortfolioCard({
  project,
  index,
  onOpenModal,
}: {
  project: ProjectMeta;
  index: number;
  onOpenModal: (project: ProjectMeta) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const hasImages = project.images.length > 0;
  const gradient  = GRADIENTS[index % GRADIENTS.length];
  const initials  = project.slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 3) || "P";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={{
        hidden: { y: 40, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.07] hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-purple/10 dark:hover:shadow-purple/20"
    >
      {/* ── Spotlight Radial Glow Following Cursor ── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.25), rgba(0, 212, 255, 0.1) 40%, transparent 80%)`,
        }}
      />
      {/* Inner subtle glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 93, 251, 0.06), transparent 70%)`,
        }}
      />

      {/* Image / Preview Area */}
      <div
        onClick={() => onOpenModal(project)}
        className="aspect-[4/3] relative overflow-hidden bg-[#090B12] flex items-center justify-center border-b border-slate-200 dark:border-white/[0.06] cursor-pointer"
      >
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

        {/* Real images slider */}
        <ProjectSlider images={project.images} title={project.title} />

        {/* Fallback initials if no images */}
        {!hasImages && (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 group-hover:scale-[1.05] transition-transform duration-700 ease-out`} />
            <span className="text-6xl font-bold font-cabinet text-white/5 relative z-10 tracking-widest select-none group-hover:scale-110 group-hover:text-white/10 transition-all duration-700">
              {initials}
            </span>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between relative z-20">
        <div>
          {/* Category tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {project.categories.map((cat, i) => (
              <span
                key={i}
                className="text-[10px] text-[#6D5DFB] dark:text-[#8A63FF] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-purple/5 dark:bg-purple/10 border border-purple/15"
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-base font-bold font-cabinet text-slate-900 dark:text-white tracking-tight group-hover:text-purple dark:group-hover:text-[#00D4FF] transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>

        <button
          onClick={() => onOpenModal(project)}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-slate-800 dark:text-silver/80 bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] hover:bg-slate-900 hover:text-white dark:hover:bg-white/[0.1] dark:hover:text-white hover:border-slate-900 dark:hover:border-purple/40 transition-all duration-300 cursor-pointer group/btn"
        >
          <span>Ver Proyecto</span>
          <svg
            className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   LIGHTBOX / SCREENSHOT MODAL SUB-COMPONENT
   ═══════════════════════════════════════════════════════ */
function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectMeta;
  onClose: () => void;
}) {
  const images = project.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (images && images.length > 1) {
        if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
        if (e.key === "ArrowLeft")  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [images, onClose]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const hasImages  = images && images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-slate-950/80 dark:bg-[#07090f]/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Cerrar modal"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {project.categories.map((cat, i) => (
                <span key={i} className="text-[10px] text-[#00D4FF] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20">
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cabinet text-white tracking-tight">
              {project.title}
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="self-start sm:self-auto px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white gradient-aurora hover:shadow-[0_0_25px_rgba(109,93,251,0.45)] transition-all"
          >
            Cotizar Similar
          </a>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] flex items-center justify-center overflow-hidden rounded-2xl bg-black/60 mt-4">
          {hasImages ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${project.title} - ${currentIndex + 1}`}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          ) : (
            <div className="text-silver/40 text-sm">Sin imágenes disponibles</div>
          )}

          {/* Navigation Arrows */}
          {hasImages && images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer z-30"
                aria-label="Anterior"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer z-30"
                aria-label="Siguiente"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Footer Dots & Counter */}
        {hasImages && (
          <div className="flex items-center justify-between pt-4 px-2">
            <span className="text-xs text-silver/40">
              Captura {currentIndex + 1} de {images.length}
            </span>
            {images.length > 1 && (
              <div className="flex gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "bg-[#00D4FF] w-4" : "bg-white/30 w-1.5"
                    }`}
                    aria-label={`Ir a imagen ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [projects, setProjects]                     = useState<ProjectMeta[]>([]);
  const [filteredProjects, setFilteredProjects]     = useState<ProjectMeta[]>([]);
  const [activeCategory, setActiveCategory]         = useState<string>("Todos");
  const [categories, setCategories]                 = useState<string[]>(["Todos"]);
  const [loading, setLoading]                       = useState(true);
  const [activeModalProject, setActiveModalProject] = useState<ProjectMeta | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data: ProjectMeta[]) => {
        setProjects(data);
        setFilteredProjects(data);

        // Extract unique categories
        const cats = new Set<string>();
        data.forEach((p) => p.categories.forEach((c) => cats.add(c)));
        setCategories(["Todos", ...Array.from(cats)]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading portfolio assets:", err);
        setLoading(false);
      });
  }, []);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "Todos") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.categories.includes(category)));
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00D4FF]/[0.04] rounded-full blur-[140px] pointer-events-none translate-x-24 translate-y-24" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#6D5DFB]">
            PORTAFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-cabinet text-slate-900 dark:text-white mt-4 tracking-tight">
            Proyectos Destacados
          </h2>
          <p className="text-base text-slate-600 dark:text-silver/60 mt-3 max-w-xl font-normal">
            Casos de estudio reales donde fusionamos estrategia, creatividad e inteligencia artificial.
          </p>

          {/* Interactive Category Filter Pills */}
          {!loading && categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-full bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.05]">
              {categories.map((cat) => {
                const isActive = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-silver/60 dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 rounded-full gradient-aurora shadow-md shadow-purple/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center mt-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#6D5DFB]/30 border-t-[#6D5DFB] animate-spin" />
          </div>
        )}

        {/* Portfolio Grid with Spotlight effect */}
        {!loading && filteredProjects.length > 0 && (
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
          >
            {filteredProjects.map((project, index) => (
              <PortfolioCard
                key={project.slug}
                project={project}
                index={index}
                onOpenModal={(p) => setActiveModalProject(p)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox / Modal Overlay */}
      <AnimatePresence>
        {activeModalProject && (
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
