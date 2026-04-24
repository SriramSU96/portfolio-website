import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 8L10.89 13.26C11.56 13.71 12.44 13.71 13.11 13.26L21 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z" />
      </svg>
    ),
    label: 'EMAIL',
    value: 'sriram.dev@gmail.com',
    href: 'mailto:sriram.dev@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
      </svg>
    ),
    label: 'LINKEDIN',
    value: 'linkedin.com/in/sriram-dev',
    href: 'https://www.linkedin.com/in/sriram-dev',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    label: 'GITHUB',
    value: 'github.com/sriram-dev',
    href: 'https://github.com/sriram-dev',
  },
]

const ContactCard = ({ link, index }: { link: any; index: number }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(link.value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.1 * index }}
      className="group relative flex items-center gap-6 p-6 rounded-2xl border border-white/5 bg-[#14080A]/80 backdrop-blur-xl transition-all duration-500 hover:border-[#6B1A2A]/50 hover:bg-[#1A0D10]"
    >
      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#C4526A]/30 group-hover:bg-[#6B1A2A]/20 transition-all duration-500 text-[#C4526A]">
        {link.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-mono tracking-[0.3em] text-[#C4526A] mb-1 opacity-80 uppercase">
          {link.label}
        </div>
        <div className="text-[18px] text-white/90 font-normal truncate">
          {link.value}
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="relative z-10 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[14px] font-mono tracking-widest text-white/60 hover:text-[#C4526A] hover:border-[#C4526A]/40 hover:bg-[#6B1A2A]/10 transition-all duration-300"
      >
        {copied ? 'COPIED' : 'COPY'}
      </button>

      {/* Marker dot on the far right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#C4526A]/20 to-transparent mx-4"></div>
        <div className="w-1.5 h-1.5 rounded-full border border-[#C4526A]/40 bg-[#6B1A2A]/20 shadow-[0_0_10px_rgba(196,82,106,0.3)]"></div>
      </div>
    </motion.div>
  )
}

export const Contact = () => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setMessage('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-[#0E0608] py-32 max-md:py-20 relative overflow-hidden">
      {/* Decorative Atmosphere Elements */}
      <div className="absolute top-0 right-0 w-full h-[150vh] pointer-events-none opacity-20">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 4, ease: 'easeInOut' }}
            d="M800,0 C900,300 1000,500 800,1000 S500,1200 200,800"
            fill="none"
            stroke="#6B1A2A"
            strokeWidth="0.5"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 5, ease: 'easeInOut', delay: 1 }}
            d="M1000,200 C800,400 600,200 400,600 S200,800 0,1000"
            fill="none"
            stroke="#C4526A"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="wrap max-w-[1400px] mx-auto px-20 max-md:px-8 relative z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-[1px] bg-[#6B1A2A]"></div>
            <span className="text-[14px] font-mono tracking-[0.5em] text-[#C4526A] uppercase">Contact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-medium text-[clamp(40px,5.5vw,90px)] leading-[1.1] text-[#F8F4F0]"
          >
            Let's <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-[#C4526A] via-[#8B2035] to-[#6B1A2A]">Collaborate.</span>
            <br />
            I'm Sri Ram.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Side: Paragraph & Button */}
          <div className="flex flex-col items-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[22px] text-[#F8F4F0]/80 font-normal leading-relaxed mb-12"
            >
              I specialise in <strong className="text-white font-medium hover:text-[#C4526A] transition-colors">Angular & Frontend Architecture</strong>, with hands-on experience delivering <strong className="text-white font-medium hover:text-[#C4526A] transition-colors">4+ production applications</strong> across task management, industrial systems, and enterprise platforms. I'm actively expanding into <strong className="text-white font-medium hover:text-[#C4526A] transition-colors">Full-Stack development</strong> and <strong className="text-white font-medium hover:text-[#C4526A] transition-colors">AI-integrated workflows</strong> — open to meaningful collaborations worldwide.
            </motion.p>

            <motion.a
              href="/resume.pdf"
              download
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#6B1A2A]/80 text-white font-mono text-[14px] tracking-[0.35em] uppercase rounded-full overflow-hidden hover:shadow-[0_20px_40px_rgba(107,26,42,0.3)] transition-all duration-500"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#8B2035] to-[#C4526A] translate-y-full transition-transform duration-500 group-hover:translate-y-0"></span>
              <div className="relative flex items-center gap-3">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                DOWNLOAD RESUME
              </div>
            </motion.a>
          </div>

          {/* Right Side: Contact Info & Form */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              {LINKS.map((link, i) => (
                <ContactCard key={i} link={link} index={i} />
              ))}
            </div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSubmit}
            >
              <div className="relative rounded-2xl border border-white/5 bg-[#14080A]/60 backdrop-blur-xl overflow-hidden p-1 transition-all duration-500 focus-within:border-[#6B1A2A]/40">
                <textarea
                  placeholder="Start a conversation..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-none outline-none p-6 text-white text-lg font-light placeholder:text-white/20 resize-none min-h-[160px]"
                ></textarea>

                <div className="absolute bottom-6 right-6">
                  <button
                    type="submit"
                    disabled={status === 'sending' || !message.trim()}
                    className="group relative overflow-hidden px-8 py-3 rounded-full bg-gradient-to-br from-[#6B1A2A] to-[#8B2035] text-white font-mono text-[14px] tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_10px_30px_rgba(107,26,42,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="relative flex items-center gap-2">
                      {status === 'sending' ? 'SENDING...' : status === 'success' ? 'SENT!' : 'SEND MESSAGE'}
                    </div>
                  </button>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>

 
    </section>
  )
}
