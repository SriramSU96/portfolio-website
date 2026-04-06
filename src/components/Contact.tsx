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

const IndiaMapSVG = () => (
  <svg viewBox="100 0 800 1000" className="w-full h-full opacity-60 filter drop-shadow-[0_0_15px_rgba(196,82,106,0.2)]">
    <defs>
      <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6B1A2A" />
        <stop offset="50%" stopColor="#C4526A" />
        <stop offset="100%" stopColor="#6B1A2A" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 3, ease: 'easeInOut' }}
      d="M355.9 45.5l0.5 0.7 0.5 0.8 0.7 0.6 0.7 0.2 0.9-0.4 1.3-1.5 0.8-0.4 1.7 0.1 0.4 1.4-0.6 1.9-0.8 1.8-0.2 2.8 1 2.7 2.7 4.9 0.3 1.3 0.2 2.7 0.5 1.2 1.1 1.6 0.3 0.6 1.8 6.7 0.6 1.2 1.2 1.1 1.3 0.5 6.6 1.2 1.7 0.7 2.5 1.9 1.5 2 1.1 0.6 1.3 0.4 1.1 0.5 0.8 0.8 0.2 0.3 0.5 1.1 0.3 0.8 0.1 0.9-0.1 0.8-0.3 0.8-2.1 2-2.8 1.3-2.2 1.5-0.3 3 1.4 4.3 0.5 2.2 0.2 2.3-0.3 6.7 0.5 2 0.7 1.2 2.7 2.5 0 0.1 1.4 1.4 0.8 0.5 0.9 0.4 0.9 0.4 0.6 0.4 0.7 0.3 0.8-0.1 0.7-0.1 3.2 0.1 2.3 0.5 2.3 0 1.1 0.9-1 3.2-1.4 1.6 0.2 1.7 0.5 1.3-1.7 0.4-0.2 0.7 1.3 0.5 1.1 0.3 1.6 2.1 2.7 4 1.5 1 0.2 1.3-1.3 2-1.3 0.8-0.5 1.4-1.2 1.4-0.9 1.1-1 0.2-0.8-1.7-1.7-0.5-1 2.1-1.5 0.9-0.6-0.1-0.7 0.1-0.9 0.3-0.8 0.4-0.6 0.4-0.3 0.8-0.3 2.1-0.5 0.6-0.2 0.1-0.8-0.2-0.4-0.1-0.3 0.1-0.8 0.4-0.4 0.1-0.9 0.5-1-0.3-0.8-0.8-0.8-0.8-2.4-2.1-0.5-1.1-0.5-1.8-0.1-0.5 0.2-0.6 0.2-0.6 0.1-0.6-0.4-0.6-0.7-0.3-0.6 0.3-0.8 1.1-0.5 0.4-0.5 0.3-1.2 0.3-4.1 0.1-1.2 0.3-0.7 0.3-0.1 0.7 0.8 1.8 1.2 1.7 0.1 0.4-0.1 0.2-0.2 0.2-0.2 0.3 0 0.4 0 0.2 0.1 0.1 0.7 3.2 0 0.7-0.2 0.7 0.1 0.4 0.3 0.1 0.2 0.1 1.1 0.6 0.6 0.9 0.5 1 2.8 3.9 0.9 0.7 1.2 0.8 0.4 0.3 0.3 0.7-0.1 0.7-0.6 1.4-0.2 0.7-0.2 1.4-0.2 0.7-0.8 1.2 0 0.5 0.7 0.9 0 0.3-0.1 0.3 0 0.3 0.1 0.3 0.4 0.4 0.2 0.6 0.2 0.3 0.2 0.1 0.3 0.1 0.5 0 1.1 1.1 0.7 0.9-0.2 0.4-0.5 0.6-2.8 2.3-0.1 0.8 1.1 0.7 0.8 0.8-0.1 1.1-0.4 1.3-0.2 1.3 0.1 0.6 0.1 0.3 0.2 0.2 1 0.5 0.3 0 0.7-0.2 0.8 0.1 0.4 0 0.7 0.2 1 0.5 0.6-1.1 0.6-0.8 0.8-0.6 0.8-1.3 1-1.4 0.6-1.3 0.2 0 1.6 0.8 0.7 0.8 0.6 0.7 0.4 0.8 0.5 0.7 0.9 0.7 0 0.6 0.4 0.4 0.3 0.7-0.4 0.8 0.1 0.4 0.7 0.1 0.3 0.5 0.3 0.8 0.1 0.7 0 0.6 0.5 0.8 1.4 1 0.2 0.6 0.3 0.5 0.1 0.3 0.2 1.2 0.2 0.4 0.4 0.1 0.5-0.1 0.4 0 0.5 0.1 0.4 0.2 0.1 0.2 0.1 0.1 0.1 0.2 0 0.2 0.3 0.4 0.4 0.5 0.5 0.5 0.5 0.2 0.6 0.2 0.3 0.1 0.4-0.1 1.2-0.7 0.5-0.1 1.2-0.1 1.4-0.4 0.7 0.1 2.1 0.5 0.5 0.2 0.3 0.5 0.5 1 0.7 0.7 0.3 0.2 0.2 0.1 0.4 0.3 2.1 0.9 0.7 0.5 0.4 0.9 0.5 0.7 0.9 0.3 0.5-0.1 0.9-0.5 0.5 0 0.3 0.3 0.8 1.2 0.9 0.5 0.2 0.3-0.8 1.3-0.2 0.2-0.2 0.1-0.3-0.1-0.3 0.1-0.1 0.1 0 0.5 0.3 0.4 0.4 0.4 0.2 0.4 0.1 0.6-0.1 0.5-0.3 0.5-0.3 0.6 1.1-0.2 1.1 0 2.1 0.7 2.9 1.6 1.4 0.6 1 0.6 0.5 0.1 0.6-0.1 0.4-0.1 0.5 0 0.6 0.2 2.8 1.6 0.9 0.7 0.3 0.4 0.6 1.1 0.3 0.5 0.5 0.4 2.4 1.1 2.3 0.6 0.9 0.5 0.6 0.9 0.2 0.5-0.2 0.5-0.2 0.1-2 0.6-0.5-0.1-0.3-0.6-0.3-0.4-0.4 0.3-0.5 0.6-0.4 0.4 0.3 0.9-0.5 0.9-1.8 1.4-0.4 0.4-0.9 1.4-0.3 0.3-1 0.7-0.8 0.8-0.3 0.2-0.6 0.2-1 0.1-0.5 0.2-0.2 0.6-0.4 1.2-0.6 1.1-1.5 1.9-0.6 0.5-1.8 0.5-0.7 0.6-0.5 0.9 0 0.9 0.3 0.8 0.4 0.9 0.3 0.9-0.1 0.7-0.3 0.7-0.7 0.7-0.1 0.2-0.4 0.2-0.2 0.1-0.1 0.2 0.1 0.2 0 0.2 0 0.2-0.2 0.3-0.2 0.2-0.6 0.5-0.3 0.3-0.2 0.2-0.2 0.2-0.1 0.5-0.2 0.3-0.8 0.3-0.3 0.2-0.2 0.6 0.2 0.6 0.7 1 0.2 1.4 0.1 0.3 0.3 0.1 0.3 0 0.2 0.2 0 0.6-0.1 0.8-0.6 2.1-0.2 0-0.4-0.3-0.5 0.1-0.2 0.4 0.5 1.4 0.1 0.6-0.4 0.4-0.5 0.2-0.6 0-0.5-0.1-0.9 0.4-0.6 1.3-0.2 1.5 0.1 1.1-0.3 0.5-0.4 0.4-0.5 0.2-0.4 0.4-0.4 0.5-0.2 0.6-0.1 0.6 0 0.7 0.2 1.3 0.5 0.4 0.5 0.1 0.3 0.1 0.9 0.5 1 1.4 0.4 0.3 0.6 0.2 1 0.2 0.5 0.3 0.2 0.2 0.3 0.5 0.2 0.3 0.2 0.1 0.6 0.1 0.2 0.2 0.8 1.6 0.3 0.5 0.6 0.2 0.6-0.1 0.5-0.1 0.6 0 0.5 0.3 1.3 1.5 0.5 0.3 0.2-0.4-0.3-2.1 0.1-0.6 0.3-0.5 0.6-0.3 0.5 0 0.6 0.1 0.1 0.1-0.1 0.3 0 0.3 0.2 0.3 0.5 0.3 0.5 0.1 1.1 0.2 0.4 0.3 0.6 1.1 0.3 0.4 0.5 0.2 0.9 0.3 0.4 0.3 1.2 1.2 0.4 0.3 0.6 0.1 1.2 0 0.4 0.2 0.2 0.5 0.1 0.5 0.1 0.4 0.6 0.4 0.4 0.2 0.6 0.1 0.6 0 0.4-0.1 0.4 0.2 0.1 0.3 0 0.4 0.2 0.4 1.4 0.2 2.9 0.6 0.6 0.4 0.6 0.7 0.6 2 0.4 0.9 1.7 2 0.4 0.8-0.4 0.2-0.1 0.2 0.1 0.3 0.5 0.1-0.1 0.5 0.3 0.1 0.5-0.1 0.4-0.2 0.3-0.4 0.1-0.4 0.2-0.3 0.5 0 0.6 0.2 0.6 0.4 0.6 0.4 0.3 0.6 0.2 0.5 0 0.3 0.1 0.3 0.5 0.4 2.6 1.3 0.5 0.5 0.4 0.6 0.6 0.4 1.5 0.4 0.7 0.2 0.6 0.5 1.1 1.3 1.5 0.8 0.8 0.6 0.8 0.5 0.8 0.1 0.7-0.5 1.1-1.4 0.9-0.4 1.5 0.2 0.7 0.2 0.6 0.5 0.5 0.6 0.5 0.3 1.3 0.5 3.5 2.9 2.2 1.1 1.6 1.6 1.1 0.4 2.5-0.3 3.7-1 0.6 0.3 0.2 0 0.5 0.9 0.3 1.2 0.3 2.5 0.3 1.2 0.7 0.8 3.6 0.2 0.7 0.3 1.4 0.7 1.8 0.5 3.6 0 1 0.4 1.5 1.2 0.3 0.4 0.4 0.6 0.1 0.5 0.3 0.3 0.7 0.3 0.7-0.1 0.5-0.3 0.5-0.5 0.6-0.9 0.2-0.4 0.1-0.4-0.5-0.6 0-0.4 0-0.4 0.2-0.3 0.7-0.3 2.8 0 3.2 0.4 2.1 0.8 4 2.2 1.4 0.5 0.1 0.2 0.1 0 0.2-0.3 0.1-0.1 0.3-0.1 0-0.3-0.1-0.3-0.1-0.3-0.8-1-0.2-0.5 0.5-0.2 1.4-0.1 0.6-0.2 0.4 0.1 1.2 0.2 0.9 0 0.6-0.5 1.5-1.8 0.6-0.2 0.5 0.1 0.1 0.6 0.3 0.3 0.3 0.2 0.7 0.2 0.3 0.3 0.3 0.8 0.3 0.1 0.8-0.1 0.4 0.3 0.3 0.6 0.6 0.8 0.6 0.4 8.4 1.5 0.8 0.6 0.8 1.1 0.4 1.2 0.3 1.2 0.1 1.3-0.2 1.3-0.3 0.7-0.4 0.7-0.2 0.8 0.1 0.7 0.4 0.3 3.5 0.9 0.3 0 0.4-0.3 0.5-0.2 0.5 0.1 0.3 0.6 0.7 0.4 1.4 0.5 0.7 0.3 0.4 0.7 0.2 0.6 0.2 0.6 0.7 0.4 0.3 0.1 0.4 0 0.5 0.3 0 0.5 0 0.4 0.8 0.1 1.6-0.7 0.6 0 1.2 0.4 0.1 1 0 1.2 0.8 0.9 2.7 0.7 0.5 0 1-0.4 0.4-0.3 0.1-0.1 0.4-0.5 0.5-0.4 0.5 0 0.5 0.2 0.6-0.2 1-0.6 1.3-0.6 2.3-1 0.3 0.1 2.3 1.3 0.4 0.5 0.2 1.1-0.2 2.4 0.3 1.2 0.4 0.5 1.6 1.3 0.3 0 0.2-0.1 0.3-0.1 0.3 0.2 0 0.3 0 0.3 0.1 0.2 0.2 0.2 0.4-0.1 0.7-0.3 2-1.7 0.5-0.3 0.7-0.1 1-0.3 0.9 0.2 2 1.3 0.1 0.1 0.2 0.1 0.7 0 0.2 0 0.4 0.1 0.2 0.1 0.2 0.2 0.2 0.1 0.3 0.1 0.2-0.1 0.6-0.4 1.1-0.4 0.6-0.1 0.5 0.1 0.2 0.3 0.1 0.4 0.2 0.2 0.2 0.1 0.6-0.1 0.3 0 0.8 0.3 1.8 1 0.9 0.3 0.6 0.2 0.4 0.2 0.4 0.4 0.4 0.4 0.6 0.4 2 0.9 2 1.2 0.5 0.2 0.3-0.3 0.2-0.4 0.2-0.3 0.4-0.1 1.1 0.5 0.2 0 0.8-0.2 0.7-0.5 0.5-0.6 0.3-0.8 1-0.5 0.8-0.3 1.1-0.4 0.3-0.2 0.9-1 0.4-0.3 0.4 0 0 0.6 0.1 0.5 0.3 1.6 0.3 1 0.5 1.1 0.6 0.9 0.9 0.3 1.5-0.2 0.9-0.2 0.3 0.3 0.2 0.5 0.3 0.4 0.4 0.2 1.2 0.6 0.4 0.1 0.3-0.4 0.6-1.1 0.3-0.5 0.8-0.5 1-0.3 0.9 0 0.9 0.2 2.1 1.2 1 0.2 1.1-0.4 0.7-0.6 0.3-0.2 0.7-0.3 0.4 0.3 0.4 0.3 0.5 0.1 0.4-0.2 0.3-0.5 0.2-0.7 0.3-0.1 0.5 0.1 0.6 0.3 0.5 0 0.8-0.7 0.6-0.2 0 0.2 0.7 0.5 0.1 0 0.1 0.3 0.2 0.5 0.2 0.4 0.4 0.3 0.9 0.6 0.4 0.4 0.9-0.1 1.1-1.2 0.9-1.5 0.2-1.4-0.1-0.4 0.1-0.3 0.2-0.7 0.4-1.4 1.3-2.6 0.5-1.4 0.1-0.6 0.1-0.7-0.1-0.6-0.2-1.3-0.1-1.4-0.2-0.5-0.2-0.5-0.7-1-0.2-0.5-0.4-1.2-0.6-1-0.6-0.9-0.4-0.4-0.5-0.2-0.5-0.3-0.5-1.2-0.5-0.4-0.1-0.3-0.1-0.2 0.1-0.3 0.4-1 0.1-2.2 0.5-1.1 0.7-1.6 0.2-0.8-0.1-0.3-0.4-0.7-0.1-0.3 0-0.5 0-0.3 0.3-0.8 0.1-0.2 0.2-0.2 0.1-0.2 0.1-0.2-0.1-0.2-0.3-0.3 0-0.1-0.2-0.6 0-0.4 0-0.3 0.8-1.7 1.8-3.1 0.7-2.7 0.4-0.8 0.3-0.9-0.2-1.3 0.4-0.6-0.1-0.4-0.2-0.2-0.4-0.2-0.7-0.1-0.4-0.6-0.2-0.8 0.1-0.8 0.4-0.7 0.3-0.1 0.7 0.1 0.4 0 0.3-0.1 0.7-0.2 5.3-0.8 0.6-0.4 1.6-1.2 0.6-0.2 0.7 0.2 0.5-0.3 0.4-0.7 0.6-0.6 1.2-0.9 0.5 0 0.6 0.7 0.6 0.5 1.7 0.2 0.7 0.3 1.3 0.9 0.7 0.5 0.4 0.6 0.1 0.5-0.3 1.1 0 0.6 0.3 0.4 0.7 0.7 0.2 0.5 0.1 0.6 0 0.5-1.4 6.2-0.7 1.1-0.4 1.2-0.6 0.9-0.2 0.4 0 0.5 0.5 0.7 0 0.5-0.1 1 0.1 1 0.4 0.8 0.7 0.8 0.4 0.2 0.3 0.2 0.3 0.2 0.6 0.8 0.4 0.3 0.8 0.6-0.2 0.9-0.3 0.2-0.4 0.3-1.7 0.5-0.8 0.5-0.6 0.9-0.5 1.1-0.2 1 0.1 0 0.2 0.2 1.9 1 0.6 0.5 0.4 0.7 0.1 0.9 0 1.8 0.2 1.6 0.5-0.6 0.5-0.5 0.6-0.1 0.5 0.6 0.1 0.4 0 0.4 0 0.3 0.2 0.3 0.3 0.2 0.3 0 0.3-0.1 0.3-0.2 0.6 0 0.8 0.3 0.6 0.5 0.5 0.6 0.4 0.8 0.2 0.6 0.4 0.5 1 0.3 1.6 0.1 0.8-0.1 0.8-0.2 0.4-0.3 0.3-0.3 0.3-0.2 0.4-0.1 0.4 0.1 1.2-0.4 0.8 0.6 1.1 0.8 1 0.5 1.8-0.2 1.2 0.2 1.2 0.4 0.7 0.6 0.1 0.6-0.5 0.9 0.4 0.3 0.5 0 1-0.5 0.7 0.1 1.5 0.7 0.5 0 0.2 0.1 1.1 0 0.1 0 0.3 0.1 0.1 0 0.1-0.2 0.1-0.2 0.1-0.2 0-0.1 0-0.2 0.1-0.1 0.1-0.2 0.1 0.1 0.3 0.2 0.1 0 0.2 0.1 0.1 0 0.5 0.1 0.3 0.1 0.7-0.1 1.8-0.5 3.3-0.3 1.1-0.3 0.8-0.7 0.7-1.9 1-0.7 0.5 0 1.1 0 0.5-0.1 0.5-0.4 0.4-0.4 0.4-0.3 0.6-0.2 1 0.1 2.7 2 3.2 1.7 3.8 0.4 6.6-0.4 1.8-0.1 0.2-0.1 1.4-0.6 0.9 0 1 0.1 2.1-0.1 1 0.3 0.8 0.5 0.4 0.2 0.6-0.1 0.5-0.1 0.5-0.2 0.5-0.3 0.3-0.4 0.4-0.6 0.2-0.6 0.3-0.5 0.5-0.4 0.4 0 1.2 0.1 0.4 0.1 0.3 0.4 0.7 1.5 0.4 0.3 0.5 0 1.1-0.4 0.5 0 1.3 0.3 0.4 0.1 1.4-0.2 0.9-0.4 1.9-1.2 0.8-0.2 0.6 0.3 0.1 0.5 0.1 0.5 0.3 0.5 0.5 0 0.2-0.4 0-0.5-0.4-0.4 0.7-0.3 0-0.5-0.1-0.4 0.4-0.2 0.5 0.2 1 0.8 0.5 0.3 1.7-0.3 1.1-1 0.2-1.2 0.1-0.5-0.4-1.8-0.5-1.1-1.5-1.4-0.4-1.1 0.1-0.6 0-0.6 0.2-0.6 0.2-0.5 0.1-0.1 0.1-0.1 0.3-0.4 0.2-0.2 0.1-0.3 0.1-0.6 0.1-0.3 0.4-0.5 0.9-0.8 0.2-0.6-0.1-0.4-1.8-4.6-1.4-0.9-0.4 0.1-1.8 0.3-1.3-0.2-1.1 0.2-1.1 0.2-1.5-0.2-0.7-0.2-0.7-0.2-0.7-0.2-0.4 0.5-0.3-0.6-0.8-0.6-0.3-0.5-0.6-2.4 0.2-1.3 1.3-1.9 0.3-1 0-1.2-0.9-0.9-1.1-0.3-0.1-1 1.9-0.1 1.5 0.1 1.4 1.5 2.9-0.1 0.8 1.4 0.3 1.2 1.3-0.1 1.2 0.2 0.5-0.7 0.6-0.7 2.2 0.2 1.2-0.8 0.6-0.8 3.3-1.8 0.3 0.1 0.2 0.5 0.5 1.2 0.4 0.6 0.4 0.2 0.4-0.5 0.4-1 0.1 0 0.2 0.6 0.3 0.4 0.5-0.1 0.2-0.5 0.2-0.7 0.3-0.5 0.4 0.1 0.3 0.1 0.3 0.5 0.6 0.1 0.3 0 0.4-0.1 0.4-0.3 0.6-0.4 0.4-0.3-0.2-0.2-0.7-0.1-3.5-0.1-0.6-0.2-0.5-0.6-0.3"
      fill="none"
      stroke="url(#mapGradient)"
      strokeWidth="0.5"
      filter="url(#glow)"
    />

    {/* Plexus Nodes */}
    <g className="plexus-nodes">
      {[
        { x: 350, y: 150 }, { x: 450, y: 250 }, { x: 550, y: 220 },
        { x: 650, y: 350 }, { x: 750, y: 450 }, { x: 400, y: 450 },
        { x: 500, y: 550 }, { x: 300, y: 580 }, { x: 600, y: 650 },
        { x: 550, y: 800 }, { x: 650, y: 750 }, { x: 250, y: 400 },
        { x: 800, y: 500 }, { x: 480, y: 700 }
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="3"
          fill="#C4526A"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: [0.3, 1, 0.3], scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </g>

    {/* Plexus Connections */}
    <g className="plexus-lines opacity-20">
      {[
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 11],
        [8, 9], [9, 10], [10, 8], [5, 8], [6, 13], [13, 10], [0, 11], [12, 4]
      ].map(([start, end], i) => (
        <line
          key={i}
          x1={[350, 450, 550, 650, 750, 400, 500, 300, 600, 550, 650, 250, 800, 480][start]}
          y1={[150, 250, 220, 350, 450, 450, 550, 580, 650, 800, 750, 400, 500, 700][start]}
          x2={[350, 450, 550, 650, 750, 400, 500, 300, 600, 550, 650, 250, 800, 480][end]}
          y2={[150, 250, 220, 350, 450, 450, 550, 580, 650, 800, 750, 400, 500, 700][end]}
          stroke="#C4526A"
          strokeWidth="0.5"
        />
      ))}
    </g>
  </svg>
)

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
        <div className="grid grid-cols-12 gap-16 max-lg:flex max-lg:flex-col">
          {/* Left Column: Narrative & Map */}
          <div className="col-span-5 flex flex-col items-start">
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
              className="font-display font-medium text-[clamp(40px,5.5vw,90px)] leading-[1.1] text-[#F8F4F0] mb-10"
            >
              Let's <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-[#C4526A] via-[#8B2035] to-[#6B1A2A]">Collaborate.</span>
              <br />
              I'm Sri Ram.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[22px] text-[#F8F4F0]/80 font-normal leading-relaxed max-w-[500px] mb-12"
            >
              I am currently open to <strong className="text-white font-medium hover:text-[#C4526A] transition-colors">Frontend</strong> and <strong className="text-white font-medium hover:text-[#C4526A] transition-colors">Full-Stack</strong> development challenges and creative, impactful collaborations. I bring experience and a remote-first mindset to projects worldwide, while proud to be based in India.
            </motion.p>

            {/* India Map Visualization */}
            <div className="relative w-full aspect-square max-w-[400px] mb-12 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-radial-gradient from-[#6B1A2A]/10 to-transparent rounded-full filter blur-3xl opacity-30"></div>
              <IndiaMapSVG />
            </div>

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

          {/* Right Column: Interaction */}
          <div className="col-span-7 flex flex-col gap-6">
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
              className="mt-4"
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

      {/* Finishing bottom deco */}
      <div className="absolute right-12 bottom-12 opacity-40">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 0L24.5 15.5L40 20L24.5 24.5L20 40L15.5 24.5L0 20L15.5 15.5L20 0Z" fill="#C4526A" />
        </svg>
      </div>

      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </section>
  )
}