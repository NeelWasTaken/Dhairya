import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

const koshaInfo = [
  { id: 0, name: "Annamaya", sa: "अन्नमय", role: "Gross Physical Body", practice: "Pure nutrition, somatic grounding, rhythmic restorative sleep.", color: "#B8301C", radius: 2.2 },
  { id: 1, name: "Prāṇamaya", sa: "प्राणमय", role: "Vital Energetic Breath", practice: "4-4-6 diaphragmatic breathing, nadi shodhana, autonomic balance.", color: "#E07A1F", radius: 1.7 },
  { id: 2, name: "Manomaya", sa: "मनोमय", role: "Mental & Emotional Field", practice: "Witnessing mental reactivity without compulsive grasping (rāga/dveṣa).", color: "#B8892B", radius: 1.25 },
  { id: 3, name: "Vijñānamaya", sa: "विज्ञानमय", role: "Discriminative Intellect", practice: "Daily viveka inquiry: distinguishing the mortal from the timeless.", color: "#0E6B6B", radius: 0.8 },
  { id: 4, name: "Ānandamaya", sa: "आनन्दमय", role: "Causal Bliss Baseline", practice: "Resting in pure untainted awareness (Turīya) beyond grief.", color: "#C95B7F", radius: 0.4 },
]

function ConcentricSpheres({ activeLayer, onSelect }: { activeLayer: number; onSelect: (idx: number) => void }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.x += delta * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {koshaInfo.map((k, idx) => {
        const isSelected = activeLayer === idx
        return (
          <mesh
            key={k.id}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(idx)
            }}
          >
            <sphereGeometry args={[k.radius, 24, 24]} />
            <meshStandardMaterial
              color={k.color}
              transparent
              opacity={isSelected ? 0.65 : 0.2}
              wireframe={idx !== 4 && !isSelected}
              roughness={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Panchakosha3DViewer() {
  const [activeLayer, setActiveLayer] = useState(0)

  const selected = koshaInfo[activeLayer]

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-[var(--border-hairline)] pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold">
            Interactive 3D Contemplation • Taittirīya 2.1–5
          </span>
          <h3 className="text-2xl font-bold text-[var(--ink)]">
            Pañcakośa 3D Peeling Lotus
          </h3>
        </div>
        <div className="flex flex-wrap gap-1">
          {koshaInfo.map((k, idx) => (
            <button
              key={k.id}
              onClick={() => setActiveLayer(idx)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                activeLayer === idx
                  ? 'bg-[var(--gold)] text-[#1E1B2E] shadow'
                  : 'bg-[var(--bg)] text-[var(--ink-soft)] hover:bg-[var(--bg-alt)]'
              }`}
            >
              {k.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Three.js 3D Interactive Canvas */}
        <div className="lg:col-span-7 h-80 md:h-96 rounded-xl bg-[radial-gradient(ellipse_at_center,#FBF7EF_0%,#EFE6D4_100%)] dark:bg-[radial-gradient(ellipse_at_center,#1A1428_0%,#07060B_100%)] border border-[var(--border-color)] relative cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <ConcentricSpheres activeLayer={activeLayer} onSelect={setActiveLayer} />
          </Canvas>

          <span className="absolute bottom-3 inset-x-0 text-center text-[10px] uppercase tracking-widest text-[var(--ink-faint)] font-[var(--font-marginalia)] pointer-events-none">
            Click any concentric layer to peel it open
          </span>
        </div>

        {/* Selected Layer Card */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-6 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] shadow-sm"
              style={{ borderLeft: `5px solid ${selected.color}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: selected.color }}>
                  Layer {selected.id + 1} of 5
                </span>
                <span className="sanskrit text-xl font-bold text-[var(--vermilion)]">
                  {selected.sa}
                </span>
              </div>

              <h4 className="text-xl font-bold text-[var(--ink)] mb-1">
                {selected.name} Kośa
              </h4>
              <p className="text-xs text-[var(--text-muted)] italic font-[var(--font-marginalia)] mb-4">
                Domain: {selected.role}
              </p>

              <div className="p-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border-hairline)] mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--saffron)] block mb-1">
                  🌿 Prescribed Resilience Practice
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {selected.practice}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
