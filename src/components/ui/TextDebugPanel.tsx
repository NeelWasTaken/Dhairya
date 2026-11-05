import { useState, useEffect } from 'react'
import { getAllRevealItems, subscribeRevealRegistry } from '../../hooks/usePageReady'
import type { RevealDebugItem } from '../../hooks/usePageReady'

export default function TextDebugPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [reveals, setReveals] = useState<RevealDebugItem[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('debug') === 'text') {
        setIsVisible(true)
      }
    }
  }, [])

  useEffect(() => {
    const updateList = () => {
      setReveals(getAllRevealItems())
    }
    updateList()
    const unsubscribe = subscribeRevealRegistry(updateList)
    return unsubscribe
  }, [])

  if (!isVisible) return null

  return (
    <div
      role="region"
      aria-label="Text Reveal Inspector"
      className="fixed bottom-6 right-6 z-[99990] w-96 max-h-[75vh] flex flex-col rounded-2xl bg-[#0D0A14]/95 border border-[var(--gold)]/50 text-white shadow-2xl backdrop-blur-2xl overflow-hidden font-sans text-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono font-bold text-[var(--gold)] uppercase tracking-wider text-[11px]">
            Text Reveal HUD (?debug=text)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/10 font-mono text-[10px] text-stone-300">
            {reveals.length} reveals
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-stone-400 hover:text-white px-1 cursor-pointer"
            aria-label="Close text inspector"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Live Reveals List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {reveals.length === 0 ? (
          <div className="py-8 text-center text-stone-400 font-serif italic text-xs">
            No active reveals registered on this view yet.
          </div>
        ) : (
          reveals.map((item) => {
            const statusColor =
              item.state === 'done'
                ? item.failsafeTriggered
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : item.state === 'playing'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse'
                : 'bg-stone-500/20 text-stone-300 border-stone-500/40'

            return (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col gap-1.5 hover:border-[var(--gold)]/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-stone-200 truncate max-w-[180px]">
                    {item.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] uppercase border ${statusColor}`}>
                    {item.state} {item.failsafeTriggered ? '⚠ failsafe' : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>
                    type: <strong className="text-[var(--gold)]">{item.type}</strong>
                  </span>
                  <span>
                    mode: <strong className="text-stone-300">{item.triggerMode}</strong>
                  </span>
                  <span>
                    origin: <strong className="text-stone-300">{item.origin}</strong>
                  </span>
                </div>

                {item.replay && (
                  <div className="pt-1 border-t border-white/5 flex justify-end">
                    <button
                      onClick={item.replay}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-[var(--gold)] hover:text-[#07060B] text-[10px] font-mono transition-colors cursor-pointer"
                    >
                      ↺ Replay
                    </button>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Footer Failsafe Notice */}
      <div className="px-4 py-2 bg-black/60 border-t border-white/10 text-[10px] text-stone-400 flex items-center justify-between">
        <span>Failsafe: 2.0s auto-reveal</span>
        <button
          onClick={() => {
            reveals.forEach(r => r.replay?.())
          }}
          className="text-[var(--gold)] hover:underline font-mono font-bold cursor-pointer"
        >
          Replay All ↺
        </button>
      </div>
    </div>
  )
}
