import HlsVideo from './HlsVideo'

interface VideoSectionProps {
  src: string
  children: React.ReactNode
  desaturate?: boolean
  minHeight?: string
}

export default function VideoSection({ src, children, desaturate = false, minHeight = '700px' }: VideoSectionProps) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: `min(${minHeight}, 90vh)` }}>
      {/* Video */}
      <HlsVideo
        src={src}
        className="absolute inset-0 w-full h-full object-cover z-0"
        desaturate={desaturate}
      />
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-[120px] sm:h-[200px] bg-gradient-to-b from-[#030305] to-transparent z-[1]" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] sm:h-[200px] bg-gradient-to-t from-[#030305] to-transparent z-[1]" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-0" style={{ minHeight: `min(${minHeight}, 90vh)` }}>
        {children}
      </div>
    </section>
  )
}
