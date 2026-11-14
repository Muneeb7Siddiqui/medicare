import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingCardProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  title: string
  subtitle: string
  badge?: string
  accentColor?: string
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  title,
  subtitle,
  badge = 'VERIFIED',
  accentColor = '#38bdf8',
}) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.08
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Glass Plate */}
      <RoundedBox args={[2.2, 1.1, 0.06]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.15}
          metalness={0.1}
          transmission={0.8}
          thickness={0.4}
          transparent
          opacity={0.85}
          clearcoat={1}
          reflectivity={0.8}
        />
      </RoundedBox>

      {/* Border Accent Line */}
      <mesh position={[-1.05, 0, 0.04]}>
        <boxGeometry args={[0.04, 0.8, 0.02]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
      </mesh>

      {/* Badge text */}
      <Text
        position={[-0.85, 0.32, 0.05]}
        fontSize={0.085}
        color={accentColor}
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_Pb.woff"
      >
        {badge}
      </Text>

      {/* Main Title */}
      <Text
        position={[-0.85, 0.08, 0.05]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.8}
      >
        {title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[-0.85, -0.22, 0.05]}
        fontSize={0.11}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.8}
      >
        {subtitle}
      </Text>
    </group>
  )
}
