export const Footer = () => {
  return (
    <footer className="bg-[#080305] border-t border-[#6B1A2A]/15 relative overflow-hidden">
      <div className="wrap max-w-[1280px] mx-auto px-16 max-md:px-6 py-12 flex flex-col items-center justify-center gap-8 relative z-10 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">

        <div className="footer-left flex flex-col items-center md:items-start w-full md:w-auto">
          <div className="footer-logo font-display font-black text-2xl text-white mb-2">
            Sri<span className="text-[#6B1A2A]">ram</span>
          </div>
          <div className="footer-copy font-mono text-[12px] tracking-[.3em] uppercase text-white/70">
            © {new Date().getFullYear()} Sriram. All rights reserved.
          </div>
        </div>

        <div className="footer-status flex items-center justify-center gap-3 w-full md:w-auto">
          <div className="status-dot w-2 h-2 rounded-full bg-green-500 animate-pulse-glow"></div>
          <span className="status-txt font-mono text-[12px] tracking-[.25em] uppercase text-white/70">
            Open for opportunities
          </span>
        </div>

        <div className="footer-links flex flex-wrap justify-center gap-6 md:gap-8 w-full md:w-auto">
          <a
            href="https://github.com/SriramSU96"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link font-mono text-[12px] tracking-[.3em] uppercase text-white/70 transition-colors duration-400 hover:text-[#C4526A]"
          >
            GitHub
          </a>
        
          <a
            href="mailto:Sriramsekardev@gmail.com"
            className="footer-link font-mono text-[12px] tracking-[.3em] uppercase text-white/70 transition-colors duration-400 hover:text-[#C4526A]"
          >
            Email
          </a>
            <span className="footer-link font-mono text-[12px] tracking-[.3em] uppercase text-white/40 cursor-not-allowed">
            LinkedIn
          </span>
        </div>

      </div>

      <div className="footer-watermark h-28 flex items-center justify-center opacity-[0.025] select-none pointer-events-none">
        <span className="font-display font-black text-[14vw] whitespace-nowrap">SRIRAM</span>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
        }
      `}</style>
    </footer>
  )
}
