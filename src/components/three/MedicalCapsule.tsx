import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MedicalCapsuleProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  speed?: number
  hoverEffect?: boolean
}

export const MedicalCapsule: React.FC<MedicalCapsuleProps> = ({
  position = [0, 0, 0],
  rotation = [0.4, 0.2, 0.5],
  scale = 1,
  speed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime() * speed

    // Gentle floating & axial oscillation
    groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.15
    groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.8) * 0.08
    groupRef.current.rotation.y += delta * 0.4
    groupRef.current.rotation.z = rotation[2] + Math.cos(t * 0.9) * 0.06
  })

  // Geometry dimensions
  const radius = 0.75
  const cylinderHeight = 1.2

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Upper Cap: Tech Sky Blue */}
      <mesh position={[0, cylinderHeight / 2, 0]}>
        <sphereGeometry args={[radius, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#0284c7"
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          emissive="#0369a1"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Upper Half Cylinder */}
      <mesh position={[0, cylinderHeight / 4, 0]}>
        <cylinderGeometry args={[radius, radius, cylinderHeight / 2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#0284c7"
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          emissive="#0369a1"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Middle Golden Ring / Seam */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[radius + 0.012, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.2}
          metalness={0.8}
          emissive="#38bdf8"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Lower Half Cylinder */}
      <mesh position={[0, -cylinderHeight / 4, 0]}>
        <cylinderGeometry args={[radius, radius, cylinderHeight / 2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          roughness={0.12}
          metalness={0.05}
          transmission={0.4}
          thickness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
        />
      </mesh>

      {/* Lower Cap: Frosted Pearl White */}
      <mesh position={[0, -cylinderHeight / 2, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[radius, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          roughness={0.12}
          metalness={0.05}
          transmission={0.4}
          thickness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
        />
      </mesh>

      {/* Inner Glowing Micro-Medicine Bead Particles */}
      <group position={[0, -0.2, 0]}>
        {[-0.2, 0, 0.2].map((x, i) => (
          <mesh key={i} position={[x, -0.3 + (i % 2) * 0.2, (i - 1) * 0.15]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color="#2dd4bf"
              emissive="#14b8a6"
              emissiveIntensity={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
