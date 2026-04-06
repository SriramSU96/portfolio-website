import { useState, useEffect, useRef, useCallback } from 'react'

const PROJECTS = [
  {
    title: 'Task Management System',
    category: 'Full Stack / Angular',
    year: '2024',
    index: '01',
    description:
      'A full-featured task management application for managers and employees. Features include task creation, assignment, priority tracking, and real-time updates.',
    techs: ['Angular', 'Firebase', 'TypeScript', 'Tailwind'],
    image:
      'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1800',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Gym Management App',
    category: 'Frontend / Angular',
    year: '2023',
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
    year: '2024',
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
    category: 'Enterprise / QA',
    year: '2023',
    index: '04',
    description:
      'A quality management application to track product quality, process parameters, and reporting through structured dashboards and monitoring tools.',
    techs: ['Angular', 'JavaScript', 'D3.js', 'Bootstrap'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1800',
    liveUrl: '#',
    githubUrl: '#',
  },
]

/* ─────────────────────────────────────────────
   Animated text that re-runs on key change
───────────────────────────────────────────── */
function AnimText({
  text,
  animKey,
  className,
  baseDelay = 0,
  wordDelay = 80,
  perWord = false,
}: {
  text: string
  animKey: string | number
  className?: string
  baseDelay?: number
  wordDelay?: number
  perWord?: boolean
}) {
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={`${animKey}-${wi}`}
          className="inline-block overflow-hidden py-[0.1em] px-[0.02em] -my-[0.1em]"
          style={{ marginRight: perWord ? '0.3em' : '0.3em' }}
        >
          <span
            className="inline-block pj-word-inner"
            style={{
              animationDelay: `${baseDelay + wi * wordDelay}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

/* ─────────────────────────────────────────────
   Main Projects component
───────────────────────────────────────────── */
export const Projects = () => {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const [dir, setDir] = useState<1 | -1>(1) // 1 = forward, -1 = backward
  const [textKey, setTextKey] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  /* scroll reveal for section */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true) },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const goTo = useCallback(
    (next: number, direction: 1 | -1 = 1) => {
      if (animating || next === current) return
      setAnimating(true)
      setDir(direction)
      setPrev(current)
      setCurrent(next)
      setTextKey(k => k + 1)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setPrev(null)
        setAnimating(false)
      }, 900)
    },
    [animating, current]
  )

  const goNext = () => goTo((current + 1) % PROJECTS.length, 1)
  const goPrev = () => goTo((current - 1 + PROJECTS.length) % PROJECTS.length, -1)

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const project = PROJECTS[current]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[#0A0507] overflow-hidden"
      style={{ minHeight: '100vh', padding: 0 }}
    >
      {/* ── background images layer ── */}
      {PROJECTS.map((p, i) => {
        const isCurrent = i === current
        const isPrev = i === prev
        const show = isCurrent || isPrev

        return show ? (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              zIndex: isCurrent ? 1 : 0,
              transition: 'opacity 900ms cubic-bezier(.76,0,.24,1)',
              opacity: isCurrent ? 1 : 0,
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover"
              style={{
                transition: 'transform 1200ms cubic-bezier(.76,0,.24,1)',
                transform: isCurrent
                  ? 'scale(1)'
                  : dir === 1
                  ? 'scale(1.06) translateX(-2%)'
                  : 'scale(1.06) translateX(2%)',
              }}
            />
            {/* gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070204]/95 via-[#070204]/50 to-[#070204]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070204]/80 via-transparent to-transparent" />
          </div>
        ) : null
      })}

      {/* noise */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── main content ── */}
      <div
        className="relative flex flex-col justify-between"
        style={{ zIndex: 3, minHeight: '100vh', height: '100vh' }}
      >
        {/* TOP BAR */}
        <div
          className="flex items-center justify-between px-10 md:px-20 pt-12"
          style={{
            transition: 'opacity .8s ease, transform .8s ease',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(-20px)',
          }}
        >
          {/* section label */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-[#6B1A2A]" />
            <span className="font-mono text-[14px] tracking-[.45em] uppercase text-[#C4526A]">
              Selected Work
            </span>
          </div>
          {/* counter */}
          <div className="font-mono text-[14px] tracking-[.3em] text-[#9A8880]">
            <span className="text-[#C4526A] font-bold">{String(current + 1).padStart(2, '0')}</span>
            <span className="mx-3 opacity-30">/</span>
            {String(PROJECTS.length).padStart(2, '0')}
          </div>
        </div>

        {/* MIDDLE — giant project number */}
        <div className="absolute top-1/2 right-12 md:right-24 -translate-y-1/2 pointer-events-none select-none" style={{ zIndex: 0 }}>
          <div
            className="font-display font-black"
            style={{
              fontSize: 'clamp(140px, 20vw, 320px)',
              lineHeight: 0.8,
              color: 'rgba(196,82,106,0.06)',
              transition: 'opacity 800ms ease 200ms, transform 800ms ease 200ms',
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateX(0)' : 'translateX(40px)',
            }}
          >
            {project.index}
          </div>
        </div>

        {/* BOTTOM — text content */}
        <div className="px-10 md:px-20 pb-12 md:pb-20">

          {/* category + year */}
          <div
            className="overflow-hidden mb-8"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transition: 'opacity .5s ease .1s',
            }}
          >
            <div
              key={`cat-${textKey}`}
              className="flex items-center gap-6 pj-slide-up"
              style={{ animationDelay: '50ms' }}
            >
              <span className="font-mono text-[14px] tracking-[.4em] uppercase text-[#C4526A]">
                {project.category}
              </span>
              <span className="w-16 h-[1px] bg-[#6B1A2A]" />
              <span className="font-mono text-[14px] tracking-[.3em] text-[#9A8880]/70">
                {project.year}
              </span>
            </div>
          </div>

          {/* main title */}
        <h2
          className="font-display font-black text-white mb-10 overflow-visible"
          style={{
            fontSize: 'clamp(52px, 9vw, 136px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            opacity: sectionVisible ? 1 : 0,
            transition: 'opacity .1s',
          }}
        >
          <AnimText
            text={project.title}
            animKey={textKey}
            baseDelay={80}
            wordDelay={100}
            perWord
          />
        </h2>

          {/* description + techs + links */}
          <div className="flex items-end justify-between gap-16 max-md:flex-col max-md:items-start">

            {/* description block */}
            <div
              key={`desc-${textKey}`}
              className="max-w-[580px] pj-fade-up"
              style={{ animationDelay: '450ms', opacity: sectionVisible ? undefined : 0 }}
            >
              <p className="text-[17px] text-white/80 font-normal leading-[1.85] mb-8">
                {project.description}
              </p>
              
              {/* tech tags */}
              <div className="flex flex-wrap gap-3 mb-10">
                {project.techs.map(tech => (
                  <span
                    key={tech}
                    className="font-mono text-[14px] tracking-[.15em] uppercase px-4 py-[8px]
                               bg-[#6B1A2A]/5 border border-[#6B1A2A]/40 text-[#C4526A]/80 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* action links */}
              <div className="flex items-center gap-10">
                <a
                  href={project.liveUrl}
                  className="group font-mono text-[14px] tracking-[.3em] uppercase text-[#F8F4F0]/70
                             flex items-center gap-4 hover:text-[#C4526A] transition-all duration-300"
                >
                  <span className="w-5 h-[1px] bg-current transition-all duration-300 group-hover:w-8" />
                  Live Preview
                </a>
                <a
                  href={project.githubUrl}
                  className="group font-mono text-[14px] tracking-[.3em] uppercase text-[#F8F4F0]/70
                             flex items-center gap-4 hover:text-[#C4526A] transition-all duration-300"
                >
                  <span className="w-5 h-[1px] bg-current transition-all duration-300 group-hover:w-8" />
                  Source Code
                </a>
              </div>
            </div>

            {/* nav + progress controls */}
            <div className="flex flex-col items-end gap-10 max-md:items-start max-md:flex-row max-md:items-center">

              {/* progress dots */}
              <div className="flex items-center gap-4">
                {PROJECTS.map((_, pi) => (
                  <button
                    key={pi}
                    onClick={() => goTo(pi, pi > current ? 1 : -1)}
                    className="group relative flex items-center"
                    aria-label={`Go to project ${pi + 1}`}
                  >
                    <div
                      className="rounded-full transition-all duration-600 ease-out"
                      style={{
                        width: pi === current ? '40px' : '8px',
                        height: '4px',
                        background:
                          pi === current
                            ? '#C4526A'
                            : 'rgba(196,82,106,0.3)',
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* nav arrows */}
              <div className="flex items-center gap-5">
                <button
                  onClick={goPrev}
                  disabled={animating}
                  className="group w-14 h-14 border border-[#6B1A2A]/40 flex items-center justify-center
                             hover:border-[#C4526A]/70 hover:bg-[#6B1A2A]/10
                             transition-all duration-400 disabled:opacity-40"
                  aria-label="Previous project"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:-translate-x-1">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="#C4526A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  disabled={animating}
                  className="group w-14 h-14 border border-[#6B1A2A]/40 flex items-center justify-center
                             hover:border-[#C4526A]/70 hover:bg-[#6B1A2A]/10
                             transition-all duration-400 disabled:opacity-40"
                  aria-label="Next project"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="#C4526A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* THUMBNAIL STRIP — footer nav */}
        <div
          className="relative border-t border-[#6B1A2A]/20 grid"
          style={{
            gridTemplateColumns: `repeat(${PROJECTS.length}, 1fr)`,
            zIndex: 4,
            transition: 'opacity .8s ease .7s, transform .8s ease .7s',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {PROJECTS.map((p, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="group relative overflow-hidden"
              style={{ height: '140px' }}
              aria-label={`Switch to ${p.title}`}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-all duration-[1000ms]
                           grayscale-[80%] brightness-[0.4]"
                style={{
                  filter: i === current ? 'grayscale(0%) brightness(0.7)' : undefined,
                  transform: i === current ? 'scale(1.1)' : 'scale(1)',
                  transition: 'filter 700ms ease, transform 1200ms cubic-bezier(.19,1,.22,1)',
                }}
              />
              
              {/* hover highlight layer */}
              <div className="absolute inset-0 bg-[#C4526A]/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* active accent bar */}
              <div
                className="absolute top-0 left-0 h-[3px] bg-[#C4526A] transition-all duration-700 ease-out"
                style={{ width: i === current ? '100%' : '0%' }}
              />
              
              {/* project title inside thumbnail */}
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
                <p
                  className="font-mono text-[12px] tracking-[.25em] uppercase transition-all duration-500"
                  style={{ 
                    color: i === current ? '#F8F4F0' : 'rgba(248,244,240,0.4)',
                    transform: i === current ? 'translateY(0)' : 'translateY(0)'
                  }}
                >
                  {p.title}
                </p>
                <span className="font-mono text-[12px] text-[#C4526A] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.index}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        /* ── custom easing ── */
        :root {
          --cubic-luxury: cubic-bezier(.76,0,.24,1);
        }

        /* ── word mask reveal ── */
        .pj-word-inner {
          display: inline-block;
          animation: pjWordReveal 1000ms var(--cubic-luxury) both;
        }
        @keyframes pjWordReveal {
          from { transform: translateY(115%) skewY(6deg); opacity: 0; }
          to   { transform: translateY(0)    skewY(0deg); opacity: 1; }
        }

        /* ── fade up generic ── */
        .pj-fade-up {
          animation: pjFadeUp 900ms cubic-bezier(.25,.46,.45,.94) both;
        }
        @keyframes pjFadeUp {
          from { opacity: 0; transform: translateY(35px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── slide up with mask for category/metadata ── */
        .pj-slide-up {
          animation: pjSlideUp 800ms var(--cubic-luxury) both;
        }
        @keyframes pjSlideUp {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        @keyframes breathe {
          0%,100%{ opacity:.6; transform:scale(1); }
          50%    { opacity:1;  transform:scale(1.08); }
        }

        @media (max-width: 768px) {
          .pj-content-wrap {
            padding: 80px 24px 40px;
          }
        }

        /* accessibility: reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .pj-word-inner, .pj-fade-up, .pj-slide-up, .pj-word-inner, img {
            animation: none !important;
            transition-duration: 0.1ms !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  )
}
