import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const PROJECTS = [
  {
    title: 'Desktop Automation Application',
    category: 'Industrial / Automation',
    year: '2025',
    index: '01',
    description:
      'A high-performance desktop automation system built with Electron and Angular to ingest and process industrial data from melting software, featuring real-time data tracking via IP and serial interfaces.',
    techs: ['Angular', 'Electron', 'Node.js', 'RxJS', 'Serial Port'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1800',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Gym Management App',
    category: 'Frontend / Angular',
    year: '2025',
    index: '02',
    description:
      'A gym management application to manage member records, workout tracking, and subscription details with an organised interface for smooth daily operations.',
    techs: ['Angular', 'JavaScript', 'HTML', 'CSS'],
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1800',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Melting Operations Monitor',
    category: 'Industrial / Process',
    year: '2025',
    index: '03',
    description:
      'A process-based application to manage and monitor melting operations, machine configurations, and production data for industrial efficiency.',
    techs: ['Angular', 'TypeScript', 'RxJS', 'SCSS'],
    image:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1800',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Quality Management System',
    category: 'Industrial / Enterprise',
    year: '2025',
    index: '04',
    description:
      'An industry-oriented web application designed to digitize shop-floor quality inspection workflows, featuring configurable validation rules and conditional state transitions for production control.',
    techs: ['Angular', 'Node.js', 'Express.js', 'MongoDB'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1800',
    liveUrl: '#',
    githubUrl: '#',
  },
]

export const Projects = () => {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(0)
  const sectionRef = useRef(null)

  // Single reliable trigger for the whole section
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.15 })

  const goTo = useCallback((next: number) => {
    setDir(next > current ? 1 : -1)
    setCurrent(next)
  }, [current])

  const goNext = () => goTo((current + 1) % PROJECTS.length)
  const goPrev = () => goTo((current - 1 + PROJECTS.length) % PROJECTS.length)

  const project = PROJECTS[current]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative bg-[#0A0507] overflow-hidden min-h-screen flex flex-col reveal-trigger ${sectionInView ? 'visible' : ''}`}
    >
      {/* Background Images - Staggered entrance tied to section visibility */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={true} custom={dir}>
          {sectionInView && (
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, scale: 1.2, filter: 'blur(15px) brightness(0.3)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px) brightness(0.4)' }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070204] via-[#070204]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070204]/90 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Surface Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col justify-between h-screen px-10 md:px-20 pt-10 pb-16">

        {/* Top bar */}
        <div className="pj-entrance-top flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-[#C4526A]" />
            <span className="font-mono text-[12px] tracking-[0.4em] uppercase text-[#C4526A]">Selected Work</span>
          </div>
          <div className="font-mono text-[14px] text-white/50 tracking-[0.2em]">
            <span className="text-white font-bold">{String(current + 1).padStart(2, '0')}</span> / {String(PROJECTS.length).padStart(2, '0')}
          </div>
        </div>

        {/* Info Blocks */}
        <div className="max-w-4xl">
          <div className="overflow-hidden mb-4 pj-entrance-cat">
            <motion.p
              key={`cat-${current}`}
              initial={sectionInView ? { y: "100%", opacity: 0 } : false}
              animate={sectionInView ? { y: 0, opacity: 1 } : false}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-mono text-[14px] tracking-[0.3em] uppercase text-[#C4526A]"
            >
              {project.category} — {project.year}
            </motion.p>
          </div>

          <div className="overflow-hidden mb-8 pj-entrance-title">
            <motion.h2
              key={`title-${current}`}
              initial={sectionInView ? { y: "110%", skewY: 5 } : false}
              animate={sectionInView ? { y: 0, skewY: 0 } : false}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="font-display font-black text-white text-[clamp(44px,9vw,110px)] leading-[1.1] tracking-tight pb-6 -mb-6"
            >
              {project.title}
            </motion.h2>
          </div>

          <div className="max-w-xl pj-entrance-content">
            <motion.p
              key={`desc-${current}`}
              initial={sectionInView ? { opacity: 0, x: -30 } : false}
              animate={sectionInView ? { opacity: 1, x: 0 } : false}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="text-[17.5px] text-white/80 leading-[1.85] mb-10"
            >
              {project.description}
            </motion.p>

            <div className="flex flex-wrap gap-3 mb-12">
              {project.techs.map((tech) => (
                <span key={tech} className="font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 border border-[#C4526A]/30 bg-[#C4526A]/5 text-[#F8F4F0]/90">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-12">
              <a href={project.liveUrl} className="group flex items-center gap-4 font-mono text-[12px] tracking-[0.3em] uppercase text-white/60 hover:text-[#C4526A] transition-colors">
                <span className="w-6 h-[1px] bg-white/20 group-hover:bg-[#C4526A] transition-colors" />
                Live Demo
              </a>
              <a href={project.githubUrl} className="group flex items-center gap-4 font-mono text-[12px] tracking-[0.3em] uppercase text-white/60 hover:text-[#C4526A] transition-colors">
                <span className="w-6 h-[1px] bg-white/20 group-hover:bg-[#C4526A] transition-colors" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Rail */}
        <div className="pj-entrance-bottom flex items-end justify-between">
          <div className="flex gap-4">
            <button onClick={goPrev} className="w-14 h-14 border border-white/10 flex items-center justify-center hover:bg-[#C4526A]/10 hover:border-[#C4526A]/40 transition-all duration-400 group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40 group-hover:text-[#C4526A] transition-colors">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={goNext} className="w-14 h-14 border border-white/10 flex items-center justify-center hover:bg-[#C4526A]/10 hover:border-[#C4526A]/40 transition-all duration-400 group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40 group-hover:text-[#C4526A] transition-colors">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex gap-6 items-center max-md:hidden">
            {PROJECTS.map((p, i) => (
              <button key={i} onClick={() => goTo(i)} className="relative group h-[56px] w-[100px] overflow-hidden">
                <div className={`w-full h-full border ${i === current ? 'border-[#C4526A]' : 'border-white/10 opacity-30'} transition-all duration-500`}>
                  <img src={p.image} className="w-full h-full object-cover grayscale-[30%] brightness-[100%] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                </div>
                {i === current && <motion.div layoutId="active-pill" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C4526A]" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Index Number */}
      <div className="pj-entrance-num absolute top-1/2 right-12 md:right-24 -translate-y-1/2 pointer-events-none select-none z-[-1]">
        <span className="font-display font-black text-[#C4526A]/5 text-[clamp(180px,25vw,400px)] leading-[0.7] tracking-tighter">
          {project.index}
        </span>
      </div>

      <style>{`
        /* ── Luxury Sync Entrance ── */
        .pj-entrance-top, .pj-entrance-cat, .pj-entrance-title, .pj-entrance-content, .pj-entrance-bottom, .pj-entrance-num {
          opacity: 0;
          filter: blur(10px);
          transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1), transform 2.2s cubic-bezier(0.16, 1, 0.3, 1), filter 2s ease;
        }

        .pj-entrance-top, .pj-entrance-cat, .pj-entrance-title, .pj-entrance-content, .pj-entrance-bottom {
          transform: translateY(40px);
        }

        .pj-entrance-num {
          transform: translateY(-50%) translateX(60px);
        }

        .reveal-trigger.visible .pj-entrance-top { opacity: 1; transform: translateY(0); filter: blur(0); transition-delay: 0.1s; }
        .reveal-trigger.visible .pj-entrance-cat { opacity: 1; transform: translateY(0); filter: blur(0); transition-delay: 0.3s; }
        .reveal-trigger.visible .pj-entrance-title { opacity: 1; transform: translateY(0); filter: blur(0); transition-delay: 0.5s; }
        .reveal-trigger.visible .pj-entrance-content { opacity: 1; transform: translateY(0); filter: blur(0); transition-delay: 0.8s; }
        .reveal-trigger.visible .pj-entrance-bottom { opacity: 1; transform: translateY(0); filter: blur(0); transition-delay: 1.1s; }
        .reveal-trigger.visible .pj-entrance-num { opacity: 1; transform: translateY(-50%) translateX(0); filter: blur(0); transition-delay: 0.4s; }
      `}</style>
    </section>
  )
}
