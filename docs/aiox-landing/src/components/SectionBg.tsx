interface OrbProps {
  color: string
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  blur?: number
  opacity?: number
  animate?: boolean
  delay?: string
}

function Orb({ color, size, top, left, right, bottom, blur = 120, opacity = 0.08, animate = false, delay = '0s' }: OrbProps) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: color,
        width: size,
        height: size,
        top, left, right, bottom,
        filter: `blur(${blur}px)`,
        opacity,
        animation: animate ? `drift 25s ease-in-out ${delay} infinite` : undefined,
      }}
    />
  )
}

interface SectionBgProps {
  variant: 'hero' | 'purple' | 'blue' | 'green' | 'warm' | 'neutral' | 'red' | 'cyan'
  pattern?: 'dots' | 'lines' | 'none'
  noise?: boolean
  /** Base tint color, creates a subtle radial glow in the center */
  tint?: string
}

const gradientTints: Record<string, string> = {
  hero: 'rgba(124,106,239,0.06)',
  purple: 'rgba(124,106,239,0.04)',
  blue: 'rgba(74,125,255,0.04)',
  green: 'rgba(34,197,94,0.03)',
  warm: 'rgba(245,158,11,0.03)',
  neutral: 'rgba(255,255,255,0.015)',
  red: 'rgba(239,68,68,0.03)',
  cyan: 'rgba(6,182,212,0.035)',
}

export default function SectionBg({ variant, pattern = 'dots', noise = true }: SectionBgProps) {
  const patternClass = pattern === 'dots' ? 'bg-dot-grid' : pattern === 'lines' ? 'bg-line-grid' : ''
  const tint = gradientTints[variant] || gradientTints.neutral

  const configs: Record<string, OrbProps[]> = {
    hero: [
      { color: '#7c6aef', size: 800, top: '-250px', left: '40%', blur: 160, opacity: 0.14, animate: true },
      { color: '#ec4899', size: 500, bottom: '5%', right: '-100px', blur: 140, opacity: 0.08, animate: true, delay: '-8s' },
      { color: '#4a7dff', size: 400, top: '55%', left: '-80px', blur: 120, opacity: 0.07, animate: true, delay: '-15s' },
    ],
    purple: [
      { color: '#7c6aef', size: 600, top: '-120px', right: '-80px', blur: 150, opacity: 0.10, animate: true },
      { color: '#4a7dff', size: 400, bottom: '-60px', left: '10%', blur: 120, opacity: 0.07, animate: true, delay: '-10s' },
      { color: '#ec4899', size: 250, top: '50%', left: '60%', blur: 100, opacity: 0.04, animate: true, delay: '-5s' },
    ],
    blue: [
      { color: '#4a7dff', size: 600, top: '5%', left: '-120px', blur: 150, opacity: 0.10, animate: true },
      { color: '#06b6d4', size: 400, bottom: '-80px', right: '10%', blur: 130, opacity: 0.07, animate: true, delay: '-12s' },
      { color: '#7c6aef', size: 250, top: '40%', right: '-50px', blur: 100, opacity: 0.04, animate: true, delay: '-6s' },
    ],
    green: [
      { color: '#22c55e', size: 550, top: '-100px', right: '15%', blur: 140, opacity: 0.08, animate: true },
      { color: '#06b6d4', size: 400, bottom: '5%', left: '-80px', blur: 120, opacity: 0.06, animate: true, delay: '-9s' },
      { color: '#4a7dff', size: 250, top: '60%', right: '50%', blur: 100, opacity: 0.03, animate: true, delay: '-18s' },
    ],
    warm: [
      { color: '#f59e0b', size: 550, top: '10%', right: '-100px', blur: 150, opacity: 0.08, animate: true },
      { color: '#ef4444', size: 400, bottom: '-80px', left: '15%', blur: 130, opacity: 0.06, animate: true, delay: '-7s' },
      { color: '#7c6aef', size: 200, top: '30%', left: '50%', blur: 100, opacity: 0.03, animate: true, delay: '-14s' },
    ],
    neutral: [
      { color: '#ffffff', size: 500, top: '20%', left: '45%', blur: 160, opacity: 0.025, animate: true },
      { color: '#7c6aef', size: 400, bottom: '-100px', right: '25%', blur: 140, opacity: 0.04, animate: true, delay: '-11s' },
      { color: '#4a7dff', size: 250, top: '10%', left: '-60px', blur: 100, opacity: 0.03 },
    ],
    red: [
      { color: '#ef4444', size: 600, top: '-120px', left: '25%', blur: 150, opacity: 0.08, animate: true },
      { color: '#f59e0b', size: 400, bottom: '5%', right: '-80px', blur: 120, opacity: 0.06, animate: true, delay: '-13s' },
      { color: '#7c6aef', size: 250, bottom: '30%', left: '-50px', blur: 100, opacity: 0.03, animate: true, delay: '-6s' },
    ],
    cyan: [
      { color: '#06b6d4', size: 600, top: '-80px', right: '-120px', blur: 150, opacity: 0.09, animate: true },
      { color: '#7c6aef', size: 400, bottom: '-100px', left: '10%', blur: 130, opacity: 0.06, animate: true, delay: '-8s' },
      { color: '#22c55e', size: 200, top: '50%', left: '40%', blur: 100, opacity: 0.03, animate: true, delay: '-16s' },
    ],
  }

  return (
    <>
      {/* Base tinted gradient — kills flat black */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${tint}, transparent 80%)`
      }} />
      {/* Secondary ambient fill — subtle gradient */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.008) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.008) 100%)'
      }} />
      {/* Pattern overlay */}
      <div className={`absolute inset-0 ${patternClass} pointer-events-none z-0`} />
      {/* Noise */}
      {noise && <div className="bg-noise absolute inset-0 pointer-events-none z-0" />}
      {/* Orbs */}
      {(configs[variant] || []).map((o, i) => <Orb key={i} {...o} />)}
      {/* Vignette — softer */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(3,3,5,0.5) 100%)'
      }} />
    </>
  )
}
