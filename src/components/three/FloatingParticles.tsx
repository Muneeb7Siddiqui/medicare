import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingParticlesProps {
  count?: number
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 90 }) => {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const colorA = new THREE.Color('#38bdf8')
    const colorB = new THREE.Color('#2dd4bf')
    const colorC = new THREE.Color('#ffffff')

    for (let i = 0; i < count; i++) {
      // Scatter in a cylinder/sphere around the center
      const r = 2.5 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI

      pos[i * 3] = r * Math.cos(theta) * Math.cos(phi)
      pos[i * 3 + 1] = r * Math.sin(phi) * 1.5
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi) - 1

      // Intertwine cyan and teal colors
      const chosenColor = Math.random() > 0.5 ? colorA : Math.random() > 0.3 ? colorB : colorC
      col[i * 3] = chosenColor.r
      col[i * 3 + 1] = chosenColor.g
      col[i * 3 + 2] = chosenColor.b
    }

    return [pos, col]
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.04
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
