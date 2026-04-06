import { useEffect, useState } from 'react'

const MESSAGES = ['Loading experience...', 'Preparing portfolio...', 'Almost there...', 'Welcome.']

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)
  const [isOut, setIsOut] = useState(false)

  useEffect(() => {
    // Lock scroll
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let pv = 0
    let mi = 0

    const pi = setInterval(() => {
      pv = Math.min(100, pv + Math.random() * 2.5 + .5)
      setProgress(pv)

      if (mi < MESSAGES.length - 1 && pv > (mi + 1) * 25) {
        mi++
        setMsgIdx(mi)
      }

      if (pv >= 100) clearInterval(pi)
    }, 60)

    const timer = setTimeout(() => {
      setIsOut(true)
      setTimeout(() => onComplete(), 900)
    }, 5000)

    return () => {
      clearInterval(pi)
      clearTimeout(timer)
      document.body.style.overflow = prevOverflow || ''
    }
  }, [onComplete])

  return (
    <div
      id="preloader"
      className={`fixed inset-0 bg-[#080305] z-[99000] flex flex-col items-center justify-center gap-8 transition-all duration-800 ease-in-out ${isOut ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
    >
      <div className="pre-logo font-display text-[52px] font-black tracking-tight text-white overflow-hidden">
        Sri<span className="text-[#6B1A2A] italic">ram</span>
      </div>

      <div className="pre-bar-wrap w-[200px] h-[1px] bg-white/10 relative overflow-hidden">
        <div
          className="pre-bar h-full bg-gradient-to-r from-[#6B1A2A] to-[#C4526A] transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="pre-txt font-mono text-[10px] tracking-[.4em] uppercase text-[#9A8880]">
        {MESSAGES[msgIdx]}
      </div>
    </div>
  )
}
