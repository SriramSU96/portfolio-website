
const COUNTERS = [
  { num: '1+', label: 'Year Experience' },
  { num: '4+', label: 'Production Projects' },
  { num: '100%', label: 'Dedication' },
  { num: '∞', label: 'Learning Drive' },
]

const ITEMS = [
  '1+ year building real-world applications in production environments',
  'Shipped 4+ responsive, user-centered web applications from concept to deployment',
  'Deep focus on clean architecture, performance optimization, and exceptional UI/UX',
  'Actively mastering full-stack development and AI-enhanced workflows',
]

export const Highlights = () => {
  return (
    <section id="highlights" className="bg-[#0E0608] relative overflow-hidden py-[140px] max-md:py-[80px]">
      {/* Background Section Title */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 font-display font-black text-[15vw] text-white/[0.012] pointer-events-none select-none whitespace-nowrap z-0">
        HIGHLIGHTS
      </div>

      <div className="wrap max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="grid grid-cols-12 gap-16 items-center max-lg:flex max-lg:flex-col max-lg:gap-16">

          {/* Intro & Counters Column */}
          <div className="col-span-5 highlights-intro">
            <div className="reveal-step">
              <div className="sec-label flex items-center gap-[14px] mb-6">
                <div className="sec-label-line w-7 h-[1px] bg-[#6B1A2A]"></div>
                <span className="sec-label-txt font-mono text-[14px] tracking-[.45em] uppercase text-[#C4526A]">Highlights</span>
              </div>
            </div>
            <h2 className="reveal-step sec-title font-display font-black text-[clamp(40px,5vw,72px)] leading-[1.05] text-white mb-12" style={{ transitionDelay: '0.1s' }}>
              Numbers that <em className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4526A] to-[#8B2035] italic not-italic">Matter.</em>
            </h2>

            <div className="highlights-counters grid grid-cols-2 gap-6">
              {COUNTERS.map((c, i) => (
                <div key={i}
                  className="reveal counter-card p-8 border border-white/5 bg-[#1A0D10]/40 backdrop-blur-sm group transition-all duration-500 hover:border-[#6B1A2A]/40 hover:bg-[#6B1A2A]/5"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="cc-num font-display font-black text-[48px] leading-none text-white mb-3 group-hover:text-[#C4526A] transition-colors duration-300">
                    {c.num}
                  </div>
                  <div className="cc-lbl font-mono text-[14px] tracking-[.35em] uppercase text-[#9A8880] group-hover:text-[#C4526A]/80 transition-colors">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Points Column */}
          <div className="col-span-7 highlights-list flex flex-col gap-6">
            {ITEMS.map((item, i) => (
              <div key={i}
                className="reveal highlight-item flex flex-col items-start gap-6 p-8 border border-white/5 bg-[#14080A]/60 backdrop-blur-md transition-all duration-500 hover:translate-x-0 sm:hover:translate-x-3 hover:border-[#6B1A2A]/40 hover:bg-[#1A0D10] group"
                style={{ transitionDelay: `${(i + 4) * 0.1}s` }}
              >
                <div className="hi-icon w-12 h-12 flex-shrink-0 border border-[#6B1A2A]/40 flex items-center justify-center rounded-lg text-[#C4526A] group-hover:bg-[#C4526A]/10 group-hover:scale-110 shadow-[0_0_15px_rgba(107,26,42,0.1)] transition-all duration-500">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="hi-txt text-[16px] sm:text-[18px] text-white/80 leading-relaxed font-normal group-hover:text-white transition-colors duration-300 break-words">
                  {item}
                </p>
                {/* Accent line on right */}
                <div className="hidden md:block ml-auto w-[1px] h-6 bg-gradient-to-b from-transparent via-[#C4526A]/30 to-transparent group-hover:h-12 transition-all duration-500"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}