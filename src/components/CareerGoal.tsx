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

          <div className="goal-actions mt-12 flex gap-6 flex-wrap">
            <a
              href="#contact"
              className="reveal-step btn-wine px-10 py-4 bg-[#6B1A2A] text-white font-mono text-[11px] tracking-[.3em] uppercase transition-all duration-300 hover:bg-[#8B2035] hover:shadow-[0_10px_30px_rgba(107,26,42,0.3)]"
              style={{ transitionDelay: '0.8s' }}
            >
              Let's Build Together →
            </a>
            <a
              href="#"
              className="reveal-step btn-outline-wine px-10 py-4 border border-[#6B1A2A]/40 text-[#9A8880] font-mono text-[11px] tracking-[.3em] uppercase transition-all duration-300 hover:border-[#C4526A] hover:text-[#C4526A]"
              style={{ transitionDelay: '0.9s' }}
            >
              Download Resume
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