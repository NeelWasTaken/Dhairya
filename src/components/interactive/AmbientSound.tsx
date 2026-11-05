import { useState, useRef, useEffect } from 'react'

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const bellTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Initialize Web Audio API synthesized drone (no external copyrighted audio files)
  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime)
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3)
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Tanpura frequencies based on Sa (fundamental C# ~ 138.59 Hz)
      // Pa (fifth ~ 207.65 Hz), Sa' (octave ~ 277.18 Hz)
      const freqs = [138.59, 138.59 * 1.002, 207.65, 277.18]
      const oscs: OscillatorNode[] = []

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtly modulate pitch to simulate tanpura jawari buzz
        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.setValueAtTime(0.2 + idx * 0.05, ctx.currentTime)
        lfoGain.gain.setValueAtTime(0.8, ctx.currentTime)
        lfo.connect(lfoGain)
        lfoGain.connect(osc.frequency)
        lfo.start()

        gain.gain.setValueAtTime(0.25, ctx.currentTime)
        osc.connect(gain)
        gain.connect(masterGain)
        osc.start()
        oscs.push(osc)
      })

      oscillatorsRef.current = oscs

      // Soft temple bell chime every ~22 seconds
      const playTempleBell = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return
        const t = audioCtxRef.current.currentTime
        const bellOsc = audioCtxRef.current.createOscillator()
        const bellGain = audioCtxRef.current.createGain()
        bellOsc.type = 'sine'
        bellOsc.frequency.setValueAtTime(880, t) // A5
        bellGain.gain.setValueAtTime(0.001, t)
        bellGain.gain.exponentialRampToValueAtTime(0.18, t + 0.04)
        bellGain.gain.exponentialRampToValueAtTime(0.0001, t + 4.5)
        bellOsc.connect(bellGain)
        bellGain.connect(masterGain)
        bellOsc.start(t)
        bellOsc.stop(t + 4.6)
      }

      bellTimerRef.current = setInterval(playTempleBell, 22000)
      setIsPlaying(true)
    } catch {
      console.warn('Web Audio API not supported')
    }
  }

  const stopAudio = () => {
    if (bellTimerRef.current) clearInterval(bellTimerRef.current)
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1)
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop()
            osc.disconnect()
          } catch {
            // Already stopped
          }
        })
        audioCtxRef.current?.close()
        audioCtxRef.current = null
        setIsPlaying(false)
      }, 1000)
    } else {
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (bellTimerRef.current) clearInterval(bellTimerRef.current)
      audioCtxRef.current?.close()
    }
  }, [])

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio()
    } else {
      startAudio()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleSound}
        className={`px-3 py-2 rounded-full backdrop-blur-md border border-[var(--border-color)] text-xs flex items-center gap-2 shadow-lg transition-all ${
          isPlaying
            ? 'bg-[var(--gold)]/20 text-[var(--gold)] ring-1 ring-[var(--gold)]/50'
            : 'bg-[var(--bg-primary)]/80 text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
        style={{ fontFamily: 'var(--font-marginalia)' }}
        aria-label={isPlaying ? 'Mute ambient sound' : 'Enable ambient sound'}
      >
        <span className="text-base">{isPlaying ? '🔊' : '🔇'}</span>
        <span className="hidden sm:inline">
          {isPlaying ? 'Tanpura: On' : 'Ambient Tanpura'}
        </span>
      </button>
    </div>
  )
}
