import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

interface PrescriptionDocProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export const PrescriptionDoc: React.FC<PrescriptionDocProps> = ({
  position = [0, 0, 0],
  rotation = [0.1, -0.2, 0.05],
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const scanLineRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Gentle float
    groupRef.current.position.y = position[1] + Math.sin(t * 1.4) * 0.08
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.8) * 0.1

    // Scan line animation up and down the document
    if (scanLineRef.current) {
      const scanY = Math.sin(t * 2.2) * 0.75
      scanLineRef.current.position.y = scanY
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Paper / Document Sheet */}
      <RoundedBox args={[1.5, 2.0, 0.04]} radius={0.06} smoothness={4}>
        <meshPhysicalMaterial
          color="#f8fafc"
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.3}
          reflectivity={0.5}
        />
      </RoundedBox>

      {/* Header Rx Cross */}
      <mesh position={[-0.48, 0.72, 0.03]}>
        <boxGeometry args={[0.08, 0.22, 0.01]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.48, 0.72, 0.03]}>
        <boxGeometry args={[0.22, 0.08, 0.01]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* Prescription Header Text */}
      <Text
        position={[-0.28, 0.72, 0.03]}
        fontSize={0.08}
        color="#0f172a"
        anchorX="left"
        anchorY="middle"
      >
        RX OFFICIAL SCRIPT
      </Text>

      {/* Simulated text lines */}
      {[-0.35, -0.15, 0.05, 0.25, 0.45].map((yOffset, idx) => (
        <mesh key={idx} position={[0, -yOffset * 1.1 + 0.15, 0.026]}>
          <planeGeometry args={[1.15 - (idx % 2) * 0.25, 0.035]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
      ))}

      {/* Pill icon stamp in bottom right */}
      <mesh position={[0.42, -0.65, 0.03]}>
        <circleGeometry args={[0.16, 24]} />
        <meshStandardMaterial color="#e0f2fe" />
      </mesh>

      {/* Glowing OCR Laser Scan Line */}
      <mesh ref={scanLineRef} position={[0, 0, 0.035]}>
        <planeGeometry args={[1.52, 0.04]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Subtle Laser Glow Flare */}
      <pointLight position={[0, 0, 0.2]} intensity={1.8} color="#38bdf8" distance={2} />
    </group>
  )
}
