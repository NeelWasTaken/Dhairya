import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CaveDescent() {
  const [scrollDepth, setScrollDepth] = useState(25) // 0 to 100

  const corridorVerses = [
    { depth: 15, text: "अणोरणीयान् महतो महीयान्", translation: "Subtler than the subtle, vaster than the vast." },
    { depth: 45, text: "गुहायां निहितोऽस्य जन्तोः", translation: "Concealed within the secret cave of the heart." },
    { depth: 75, text: "तमक्रतुः पश्यति वीतशोकः", translation: "The un-craving person beholds Him, freed from sorrow." },
  ]

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[#090710] border border-[var(--gold)]/25 text-white shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold">
            Guha-Praveśa • Kaṭha Upaniṣad 1.2.20
          </span>
          <h3 className="text-2xl font-bold text-white">
            Descend the Cave of the Heart (Hṛdaya-Guhā)
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[var(--gold)]">Depth: {scrollDepth}m</span>
          <input
            type="range"
            min="0"
            max="100"
            value={scrollDepth}
            onChange={(e) => setScrollDepth(parseInt(e.target.value))}
            className="w-28 accent-[var(--gold)] cursor-pointer"
          />
        </div>
      </div>

      {/* 3D Perspective Corridor View */}
      <div className="relative w-full h-80 rounded-xl bg-black overflow-hidden flex items-center justify-center border border-white/10">
        {/* Parallax Stone Walls with Carved Shlokas */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{
            transform: `perspective(600px) translateZ(${scrollDepth * 4 - 200}px)`,
          }}
        >
          {/* Torch Glow Left */}
          <div className="absolute left-10 w-4 h-12 bg-amber-500/80 rounded-full blur-md animate-pulse" />
          {/* Torch Glow Right */}
          <div className="absolute right-10 w-4 h-12 bg-amber-500/80 rounded-full blur-md animate-pulse" />

          {/* Carved Wall Verses */}
          <div className="space-y-12 text-center">
            {corridorVerses.map((v, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-lg bg-black/60 border border-[var(--gold)]/30 backdrop-blur-md"
                animate={{
                  opacity: Math.max(0.2, 1 - Math.abs(scrollDepth - v.depth) * 0.03),
                }}
              >
                <span className="sanskrit text-2xl md:text-3xl text-[var(--gold)] font-bold block mb-1">
                  {v.text}
                </span>
                <span className="text-xs italic text-amber-200/80 font-[var(--font-marginalia)]">
                  "{v.translation}"
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Cave Dust Motes */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
        </div>

        {/* Guidance Cue */}
        <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
          <span className="px-4 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-black/70 text-[var(--gold)] border border-[var(--gold)]/30">
            Drag Depth Slider to Journey Deeper into the Guhā
          </span>
        </div>
      </div>
    </div>
  )
}
