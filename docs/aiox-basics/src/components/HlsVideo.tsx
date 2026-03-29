import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

interface HlsVideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
  desaturate?: boolean
}

export default function HlsVideo({ src, className = '', style = {}, desaturate = false }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false })
      hls.loadSource(src)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ ...style, ...(desaturate ? { filter: 'saturate(0)' } : {}) }}
      autoPlay
      loop
      muted
      playsInline
    />
  )
}
