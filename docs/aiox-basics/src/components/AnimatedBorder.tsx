import { type ReactNode } from 'react'

interface AnimatedBorderProps {
  children: ReactNode
  /** Gradient colors for the rotating border */
  colors?: string[]
  /** Border width in px */
  width?: number
  /** Animation duration in seconds */
  duration?: number
  /** Border radius in px or CSS value */
  radius?: number | string
  /** Additional className for the outer wrapper */
  className?: string
  /** Whether to show the border always or only on hover */
  hoverOnly?: boolean
}

/**
 * Wraps children with a rotating conic-gradient animated border.
 * Uses the mask trick to create the border effect.
 */
export default function AnimatedBorder({
  children,
  colors = ['#7c6aef', '#4a7dff', '#06b6d4', '#22c55e', '#7c6aef'],
  width = 1,
  duration = 3,
  radius = 24,
  className = '',
  hoverOnly = false,
}: AnimatedBorderProps) {
  const borderRadius = typeof radius === 'number' ? `${radius}px` : radius
  const gradient = `conic-gradient(from var(--border-angle), ${colors.join(', ')})`

  return (
    <div
      className={`animated-border-wrap ${hoverOnly ? 'hover-only' : ''} ${className}`}
      style={{
        '--border-width': `${width}px`,
        '--border-radius': borderRadius,
        '--border-gradient': gradient,
        '--border-duration': `${duration}s`,
        position: 'relative',
        borderRadius,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

interface PulseRingProps {
  color: string
  size?: number
  className?: string
}

/**
 * Animated expanding ring effect, good for timeline dots and icons.
 */
export function PulseRing({ color, size = 44, className = '' }: PulseRingProps) {
  return (
    <div className={`pulse-ring-wrap ${className}`} style={{ width: size, height: size, position: 'relative' }}>
      <div className="pulse-ring" style={{
        '--ring-color': color,
        position: 'absolute',
        inset: 0,
        borderRadius: '14px',
      } as React.CSSProperties} />
    </div>
  )
}
