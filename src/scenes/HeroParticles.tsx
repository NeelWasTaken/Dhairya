import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

function EmberParticles({ count = 180 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      speed: Math.random() * 0.3 + 0.1,
      scale: Math.random() * 0.035 + 0.015,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    
    particles.forEach((p, i) => {
      const y = ((p.position[1] + p.speed * t * 0.5 + p.offset) % 14) - 7
      const x = p.position[0] + Math.sin(t * 0.3 + p.offset) * 0.5
      const z = p.position[2] + Math.cos(t * 0.2 + p.offset) * 0.3
      
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(p.scale * (0.8 + Math.sin(t * 2 + p.offset) * 0.2))
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#E8892B" transparent opacity={0.65} />
    </instancedMesh>
  )
}

function SriYantraMesh() {
  const groupRef = useRef<THREE.Group>(null)

  // Use primitive Three.js Line objects
  const lines = useMemo(() => {
    const list: THREE.Line[] = []
    const sizes = [3.5, 2.8, 2.1, 1.4, 0.7]

    sizes.forEach((size, i) => {
      const points: THREE.Vector3[] = []
      const sides = 3
      const rotation = i % 2 === 0 ? 0 : Math.PI / 3

      for (let j = 0; j <= sides; j++) {
        const angle = (j / sides) * Math.PI * 2 + rotation - Math.PI / 2
        points.push(new THREE.Vector3(Math.cos(angle) * size, Math.sin(angle) * size, 0))
      }

      const geo = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({
        color: 0xC9A23A,
        transparent: true,
        opacity: 0.15 + i * 0.05,
      })
      list.push(new THREE.Line(geo, mat))
    })

    // Outer circles
    ;[4.2, 4.5].forEach(r => {
      const pts: THREE.Vector3[] = []
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0))
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = new THREE.LineBasicMaterial({
        color: 0xC9A23A,
        transparent: true,
        opacity: 0.12,
      })
      list.push(new THREE.Line(geo, mat))
    })

    return list
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.08) * 0.06
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {lines.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color="#C9A23A" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <EmberParticles count={140} />
      <SriYantraMesh />
    </>
  )
}

export default function HeroScene() {
  const prefersReduced = useReducedMotion()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (prefersReduced) {
    return (
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,162,58,0.08) 0%, transparent 60%)',
          }}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
