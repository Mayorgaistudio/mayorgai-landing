export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/mayorgaistudio",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/mayorgaistudio/",
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/mayorgaistudio",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@mayorgaistudio",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-[#090B12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: contact info */}
        <div className="flex flex-col items-center md:items-start gap-0.5 text-xs text-slate-400 dark:text-silver/35 font-normal">
          <span>Quito — Ecuador</span>
          <a
            href="tel:+5930979139647"
            className="hover:text-slate-700 dark:hover:text-silver/70 transition-colors duration-300"
          >
            +593 097 913 9647
          </a>
        </div>

        {/* Center: Social Links */}
        <div className="flex gap-6 items-center">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-silver/40 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Right: Logo + Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <img
            src="/brand/logo-horizontal.svg"
            alt="MayorgAI Studio"
            className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity dark:invert-0 invert dark:hue-rotate-0 hue-rotate-180"
          />
          <div className="text-xs text-slate-400 dark:text-silver/30 font-normal">
            &copy; 2025 MayorgAI Studio. Todos los derechos reservados.
          </div>
        </div>
        
      </div>
    </footer>
  );
}
