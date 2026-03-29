interface BadgeProps {
  children: React.ReactNode
}

export default function Badge({ children }: BadgeProps) {
  return (
    <div className="liquid-glass-strong rounded-full px-5 py-2 text-xs font-medium font-[var(--font-body)] inline-flex items-center gap-2.5 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" style={{ animation: 'pulse-glow 2s infinite' }} />
      <span className="shimmer-text">{children}</span>
    </div>
  )
}
