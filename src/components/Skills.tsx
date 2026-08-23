const SKILLS = [
  {
    title: 'Frontend',
    desc: 'Building responsive, industrial-grade interfaces with Angular, RxJS, and high-performance state management.',
    tags: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
    accent: '#6B1A2A',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128">
        <path fill="#C4526A" d="M64 14L8 36v56l56 22 56-22V36L64 14zm0 10.9l46.3 18.5v37.2L64 98.1 17.7 80.6V45.4L64 24.9z" />
        <path fill="#C4526A" d="M64 14L8 36v56l56 22 56-22V36L64 14zM64 24.9l46.3 18.5v37.2L64 98.1 17.7 80.6V45.4L64 24.9z" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: 'Backend & APIs',
    desc: 'Creating reliable server-side logic, RESTful APIs, and scalable data solutions for automation workflows.',
    tags: ['Node.js', 'Express.js', 'RESTful APIs', 'MongoDB', 'MySQL', 'SQL'],
    accent: '#8B2035',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128">
        <path fill="#C4526A" d="M126.5 32.3c-4-9.9-23.3-13.8-38.1-8.7-14.8 5.1-25.1 18.3-21.1 28.2l-21 52.5c-1.1 2.8-.3 6 2 7.9 2.3 1.9 5.4 2 7.9.3l52.5-21c9.9-4 13.8-23.3 8.7-38.1-5.1-14.8-18.3-25.1-28.2-21.1z" />
      </svg>
    ),
  },
  {
    title: 'Dev Ecosystem',
    desc: 'Streamlined workflows with modern tooling, Docker containerization, and real-time device communication.',
    tags: ['Git', 'GitHub', 'Docker', 'Electron', 'Socket.io', 'WebSockets', 'Postman'],
    accent: '#6B1A2A',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128">
        <path fill="#C4526A" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 120c-30.9 0-56-25.1-56-56S33.1 8 64 8s56 25.1 56 56-25.1 56-56 56z" />
        <circle fill="#C4526A" cx="64" cy="64" r="24" />
      </svg>
    ),
  },
]

export const Skills = () => {
  return (
    <section id="skills" className="bg-[#0E0608] relative overflow-hidden py-[120px] max-md:py-[80px]">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(107,26,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(107,26,42,0.04)_1px,transparent_1px)] bg-[length:64px_64px]"></div>

      <div className="wrap max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="reveal mb-12">
          <div className="sec-label flex items-center gap-[14px] mb-4">
            <div className="sec-label-line w-7 h-[1px] bg-[#6B1A2A]"></div>
            <span className="sec-label-txt font-mono text-[10px] tracking-[.45em] uppercase text-[#C4526A]">Core Skills</span>
          </div>
          <h2 className="sec-title font-display font-black text-[clamp(36px,5vw,72px)] leading-[1.05] text-white">
            Technical <span className="text-grad bg-gradient-to-r from-white via-[#C4526A] to-white bg-[length:200%_auto] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] animate-[shimmer_5s_linear_infinite]">Arsenal</span>
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-md:gap-5">
          {SKILLS.map((sk, i) => (
            <div
              key={i}
              className="skill-card reveal border border-[#6B1A2A]/25 bg-[#1A0D10] p-8 relative overflow-hidden transition-all duration-400 group hover:border-[#6B1A2A]/60 hover:shadow-[0_0_50px_rgba(107,26,42,0.12)] hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="skill-card-glow absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(107,26,42,0.15),transparent_70%)] group-hover:opacity-100"></div>

              <div className="sk-icon mb-5 text-[#C4526A]">{sk.icon}</div>
              <h3 className="sk-title font-display text-[25px] font-bold text-white mb-3">{sk.title}</h3>
              <p className="sk-desc text-[16.5px] text-[#F8F4F0]/80 leading-[1.75] mb-6 font-normal">{sk.desc}</p>

              <div className="sk-tags flex flex-wrap gap-2.5">
                {sk.tags.map((tag) => (
                  <span
                    key={tag}
                    className="sk-tag font-mono text-[12px] tracking-[.2em] uppercase px-3.5 py-1.5 border border-[#C4526A]/30 text-[#F8F4F0]/90 font-medium bg-[#C4526A]/15 transition-all duration-300 hover:bg-[#C4526A]/40 hover:border-[#C4526A]/70 hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6B1A2A] to-[#C4526A] scale-x-0 origin-left transition-transform duration-600 group-hover:scale-x-100"></div>
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