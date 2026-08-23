const ITEMS = [
  {
    emoji: '🏭',
    title: 'Industrial Automation Systems',
    detail: 'Designing and developing production-grade web and desktop applications for machine-to-server communication and automated data ingestion pipelines at Acceedo.',
    badge: 'Professional Focus',
    color: '#6B1A2A',
  },
  {
    emoji: '🔄',
    title: 'Node.js & Express RESTful Backend',
    detail: 'Designing and implementing secure, scalable APIs — focusing on authentication, error handling, rate limiting, and MongoDB integration.',
    badge: 'Deepening Skills',
    color: '#C4526A',
  },
  {
      emoji: '🤖',
    title: 'AI-Powered Web Features',
    detail: 'Experimenting with LLM integration (prompt engineering, context management, streaming responses) to create smarter, context-aware user interactions.',
    badge: 'Exploring & Prototyping',
    color: '#6B1A2A',
  },
]

export const CurrentlyWorkingOn = () => {
  return (
    <section id="working" className="bg-[#140A0C] py-[120px] max-md:py-[80px] relative overflow-hidden">
      <div className="wrap max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">

        <div className="reveal mb-16">
          <div className="sec-label flex items-center gap-[14px] mb-4">
            <div className="sec-label-line w-7 h-[1px] bg-[#6B1A2A]"></div>
            <span className="sec-label-txt font-mono text-[10px] tracking-[.45em] uppercase text-[#C4526A]">Currently Building</span>
          </div>
          <h2 className="sec-title font-display font-black text-[clamp(36px,5vw,72px)] leading-[1.05] text-white">
            In <em className="text-[#6B1A2A] italic not-italic">Motion.</em>
          </h2>
        </div>

        <div className="working-timeline relative max-w-[800px] pl-10 max-md:pl-6 max-md:max-w-full">
          <div className="tl-line absolute left-0 top-0 bottom-0 w-[1px] bg-[#6B1A2A]/20">
            <div className="tl-line-fill absolute inset-0 bg-gradient-to-b from-[#6B1A2A] via-[#C4526A]/40 to-transparent"></div>
          </div>

          {ITEMS.map((item, i) => (
            <div key={i}
              className="reveal tl-item relative mb-14 last:mb-0 group"
              style={{ transitionDelay: `${i * 0.2}s` }}
            >
              <div className="tl-dot absolute left-[-46px] max-md:left-[-24px] max-md:-translate-x-1/2 top-6 w-3 h-3 bg-[#1A0D10] border-2 border-[#C4526A] z-10 transition-all duration-400 group-hover:scale-125 group-hover:bg-[#C4526A] group-hover:shadow-[0_0_12px_#C4526A]"></div>

              <div className="working-card p-8 border border-[#6B1A2A]/15 bg-[#1A0D10] relative overflow-hidden transition-all duration-500 hover:border-[#6B1A2A]/40 hover:translate-x-2">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#6B1A2A] to-transparent scale-x-0 origin-left transition-transform duration-600 group-hover:scale-x-100"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(107,26,42,0.06),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                <div className="wc-header flex items-center justify-between gap-4 mb-5 flex-wrap">
                  <h3 className="wc-title font-display text-[21px] font-bold text-white flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span> {item.title}
                  </h3>
                  <div className="wc-badge font-mono text-[12px] tracking-[.25em] uppercase px-4 py-1.5 bg-[#6B1A2A]/12 border border-[#6B1A2A]/35 text-[#C4526A] rounded-full">
                    {item.badge}
                  </div>
                </div>

                <p className="wc-detail text-[17px] text-white/80 leading-relaxed font-normal line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}