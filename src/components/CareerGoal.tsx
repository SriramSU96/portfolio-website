import { useEffect, useRef } from 'react'

const WORDS = 'Build clean, performant web applications today. Grow into a strong full-stack developer. Create meaningful, scalable solutions and contribute to innovative teams.'.split(' ')
const HIGHLIGHTS = ['full-stack', 'scalable', 'innovative', 'meaningful', 'performant', 'clean']

export const CareerGoal = () => {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        const move = (window.scrollY - bgRef.current.parentElement!.offsetTop) * 0.15
        bgRef.current.style.transform = `translateY(-50%) translateX(${move - 100}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="goal" className="bg-[#140A0C] py-[140px] max-md:py-[100px] relative overflow-hidden flex items-center min-h-[60vh] border-y border-[#6B1A2A]/15">
      <div ref={bgRef} className="absolute top-1/2 left-0 -translate-y-1/2 font-display font-black text-[15vw] text-white/[0.015] pointer-events-none select-none whitespace-nowrap z-0">
        CAREER GOAL CAREER GOAL CAREER GOAL
      </div>

      <div className="wrap max-w-[1280px] mx-auto px-16 max-md:px-6 relative z-10 w-full">
        <div className="goal-content">
          <div className="reveal-step mb-8">
            <div className="sec-label flex items-center gap-[14px] mb-4">
              <div className="sec-label-line w-7 h-[1px] bg-[#6B1A2A]"></div>
              <span className="sec-label-txt font-mono text-[10px] tracking-[.45em] uppercase text-[#C4526A]">Career Goal</span>
            </div>
          </div>

          <div className="goal-quote-wrap relative">
            <div className="quote-icon font-display font-black text-[120px] leading-none text-[#6B1A2A]/20 absolute -top-16 -left-10 select-none">"</div>

            <p className="goal-text font-display font-black text-[clamp(24px,4vw,60px)] leading-[1.2] text-white flex flex-wrap gap-x-4 gap-y-2 max-w-[1000px]">
              {WORDS.map((word, i) => (
                <span
                  key={i}
                  className={`goal-word reveal-word ${HIGHLIGHTS.includes(word.replace(/,$/, '')) ? 'text-grad bg-gradient-to-r from-white via-[#C4526A] to-white bg-[length:200%_auto] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] animate-[shimmer_5s_linear_infinite]' : ''}`}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  {word}
                </span>
              ))}
            </p>

            <div className="quote-icon font-display font-black text-[80px] leading-none text-[#6B1A2A]/15 absolute -bottom-10 right-0 select-none">"</div>
          </div>

          <div className="goal-actions mt-16 flex gap-6 flex-wrap">
            <a
              href="#contact"
              className="reveal-step group relative overflow-hidden px-12 py-5 bg-[#6B1A2A]/80 text-white font-mono text-[11px] tracking-[0.35em] uppercase rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(107,26,42,0.3)]"
              style={{ transitionDelay: '0.8s' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#8B2035] to-[#C4526A] translate-y-full transition-transform duration-500 group-hover:translate-y-0"></span>
              <span className="relative z-10 flex items-center gap-3">
                Let's Build Together
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            <a
              href="/resume.pdf"
              download
              className="reveal-step group relative px-12 py-5 border border-white/10 text-white/70 font-mono text-[11px] tracking-[0.35em] uppercase rounded-full transition-all duration-500 hover:text-white hover:border-[#C4526A]/50"
              style={{ transitionDelay: '0.9s' }}
            >
              <span className="absolute inset-x-0 bottom-0 h-0 bg-[#C4526A]/5 transition-all duration-500 group-hover:h-full"></span>
              <span className="relative z-10 flex items-center gap-3 font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download Resume
              </span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%{ background-position:-200% 0; } 100%{ background-position:200% 0; } }
      `}</style>
    </section>
  )
}