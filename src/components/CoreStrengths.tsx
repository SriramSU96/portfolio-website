const STRENGTHS = [
  {
    emoji: '🧠',
    title: 'Systematic Problem Solving',
    desc: 'Breaking down complex challenges into clear, logical steps — delivering clean, effective solutions under pressure.',
  },
  {
    emoji: '✨',
    title: 'Clean & Scalable Code',
    desc: 'Writing readable, modular, and maintainable code that stands the test of time and team collaboration.',
  },
  {
    emoji: '⚡',
    title: 'Rapid Learning & Adaptability',
    desc: 'Quickly mastering new tools, frameworks, and paradigms while staying productive in fast-changing environments.',
  },
  {
    emoji: '🎨',
    title: 'Pixel-Perfect UI/UX Focus',
    desc: 'Designing intuitive, polished interfaces with strong attention to detail, accessibility, and user delight.',
  },
]

export const CoreStrengths = () => {
  return (
    <section id="strengths" className="bg-[#0E0608] py-[120px] max-md:py-[80px] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(107,26,42,0.06),transparent_70%)] pointer-events-none"></div>

      <div className="wrap max-w-[1780px] mx-auto px-16 max-md:px-6 relative z-10">
        <div className="reveal text-center mb-16">
          <div className="sec-label flex items-center justify-center gap-[14px] mb-5">
            <div className="sec-label-line w-8 h-[1px] bg-[#6B1A2A]"></div>
            <span className="sec-label-txt font-mono text-[10.5px] tracking-[.48em] uppercase text-[#C4526A]">Core Strengths</span>
            <div className="sec-label-line w-8 h-[1px] bg-[#6B1A2A]"></div>
          </div>
          <h2 className="sec-title font-display font-black text-[clamp(40px,5.5vw,80px)] leading-[1.05] text-white">
            What I <span className="text-grad bg-gradient-to-r from-white via-[#C4526A] to-white bg-[length:200%_auto] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] animate-[shimmer_5s_linear_infinite]">Bring.</span>
          </h2>
        </div>

        <div className="strengths-grid grid grid-cols-4 gap-6 max-md:grid-cols-1 max-md:gap-5">
          {STRENGTHS.map((s, i) => (
            <div
              key={i}
              className="reveal strength-card p-8 border border-[#6B1A2A]/20 bg-[#1A0D10] relative overflow-hidden transition-all duration-500 hover:border-[#6B1A2A]/50 group hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(107,26,42,0.12)]"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6B1A2A] to-[#C4526A] scale-x-0 origin-left transition-transform duration-600 group-hover:scale-x-100"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(107,26,42,0.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="sc-icon text-5xl mb-6 block text-[#C4526A]/90 group-hover:text-[#C4526A] transition-colors duration-400">
                {s.emoji}
              </div>
              <h3 className="sc-title font-display text-[20px] font-bold text-white mb-4 leading-tight">
                {s.title}
              </h3>
              <p className="sc-desc text-[17px] text-white/80 leading-[1.65] font-normal">
                {s.desc}
              </p>

              <div className="sc-dot absolute bottom-5 right-5 w-2.5 h-2.5 rounded-full bg-[#C4526A] opacity-0 transition-all duration-400 group-hover:opacity-90 group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%{ background-position:-200% 0; } 100%{ background-position:200% 0; } }
      `}</style>
    </section>
  )
}