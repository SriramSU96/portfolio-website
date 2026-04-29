import { useEffect, useRef } from 'react'

export const About = () => {
  const photoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (photoRef.current) {
        photoRef.current.style.transform = `scale(1.04) translateY(${window.scrollY * .04}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="about" className="bg-[#140A0C] relative overflow-hidden py-[120px] max-md:py-[80px]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6B1A2A] to-transparent"></div>

      <div className="wrap max-w-[1280px] mx-auto px-16 max-md:px-6">
        <div className="about-grid grid grid-cols-[1fr_1.4fr] gap-20 items-center max-md:grid-cols-1 max-md:gap-12">

          <div className="reveal-l">
            <div className="about-photo-card relative border border-[#6B1A2A]/25 overflow-hidden bg-[#1A0D10] group">
              <div className="corner-tl absolute top-[-1px] left-[-1px] w-6 h-6 border-t-2 border-l-2 border-[#C4526A] z-[2]"></div>
              <div className="corner-br absolute bottom-[-1px] right-[-1px] w-6 h-6 border-b-2 border-r-2 border-[#C4526A] z-[2]"></div>

              <img
                ref={photoRef}
                src="/photo.png"
                alt="Sriram coding"
                className="w-full aspect-[4/5] object-cover object-top grayscale-[20%] contrast-[1.05] transition-all duration-800 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:contrast-[1.08]"
              />

              <div className="about-photo-badge absolute bottom-6 left-6 bg-[#080305]/85 border border-[#6B1A2A]/25 p-[14px_20px] backdrop-blur-[8px]">
                <div className="badge-role font-mono text-[14px] tracking-[.3em] uppercase text-[#C4526A]">Frontend Developer</div>
                <div className="badge-name font-display text-[26px] font-bold text-white mt-1">Sriram</div>
              </div>

              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6B1A2A] via-[#C4526A] to-[#6B1A2A] z-[1]"></div>
            </div>
          </div>

          <div className="about-text reveal-r flex flex-col gap-6">
            <div>
              <div className="reveal-step flex items-center gap-[14px] mb-4">
                <div className="sec-label-line w-7 h-[1px] bg-[#6B1A2A]"></div>
                <span className="sec-label-txt font-mono text-[14px] tracking-[.45em] uppercase text-[#C4526A]">About Me</span>
              </div>
              <h2 className="sec-title font-display font-black text-[clamp(40px,5vw,72px)] leading-[1.05] text-white flex flex-wrap gap-x-4">
                {'Building the Future, One Commit at a Time.'.split(' ').map((word, i) => (
                  <span key={i} className="reveal-word inline-block" style={{ transitionDelay: `${i * 0.05}s` }}>
                    {word === 'Future,' ? <em className="text-[#C4526A] italic not-italic">{word}</em> : word}
                  </span>
                ))}
              </h2>
            </div>

            <p className="reveal about-p text-base leading-[1.9] text-[#F8F4F0]/80 font-normal" style={{ transitionDelay: '0.2s' }}>
              I am <strong className="text-[#D4C5BA] font-medium">Sriram</strong>, a dedicated developer with a strong interest in building refined and efficient digital experiences. With a background in <strong className="text-[#D4C5BA] font-medium">Electronics and Communication Engineering</strong>, I have developed a solid foundation in problem-solving and technology.
            </p>

            <p className="reveal about-p text-base leading-[1.9] text-[#F8F4F0]/80 font-normal" style={{ transitionDelay: '0.3s' }}>
              My expertise lies in frontend development using <span className="text-[#C4526A]">Angular</span>, and I am currently advancing towards <strong className="text-[#D4C5BA] font-medium">full stack development</strong> and <span className="text-[#C4526A]">AI-driven applications</span>. I value clean design, performance, and continuous improvement.
            </p>

            <p className="reveal about-p text-base leading-[1.9] text-[#F8F4F0]/80 font-normal" style={{ transitionDelay: '0.3s' }}>
              Long-term, I aim to position myself at the intersection of engineering and design — building software that is both precise and enduring.
            </p>

            <div className="about-stats-row flex gap-8 py-6 my-2 border-y border-[#6B1A2A]/25">
              {[
                { num: '1+', lbl: 'Years Exp.', delay: '0.5s' },
                { num: '4+', lbl: 'Projects', delay: '0.55s' },
                { num: '∞', lbl: 'Curiosity', delay: '0.6s' }
              ].map((s, idx) => (
                <div key={idx} className="reveal asr-item" style={{ transitionDelay: s.delay }}>
                  <div className="asr-num font-display font-black text-[42px] leading-none text-white">{s.num.slice(0, -1)}<em className="text-[#C4526A] not-italic">{s.num.slice(-1)}.</em></div>
                  <div className="asr-lbl font-mono text-[14px] tracking-[.3em] uppercase text-[#9A8880] mt-[5px]">{s.lbl}</div>
                </div>
              ))}
            </div>

            <div className="reveal-step status-pill inline-flex items-center gap-2 px-[18px] py-2 border border-[#6B1A2A]/40 bg-[#6B1A2A]/12 self-start" style={{ transitionDelay: '0.7s' }}>
              <span className="s-dot w-[7px] h-[7px] rounded-full bg-[#4ade80] shadow-[0_0_0_0_rgba(74,222,128,0.4)] animate-[pulse-dot_2s_ease-in-out_infinite]"></span>
              <span className="font-mono text-[14px] tracking-[.25em] uppercase text-[#C4526A]">Open to Frontend / Full Stack Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{ box-shadow:0 0 0 0 rgba(74,222,128,.4); } 50%{ box-shadow:0 0 0 6px rgba(74,222,128,0); } }
      `}</style>
    </section>
  )
}
