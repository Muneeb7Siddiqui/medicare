import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingNotificationProps {
  position?: [number, number, number]
  scale?: number
  label?: string
  time?: string
}

export const FloatingNotification: React.FC<FloatingNotificationProps> = ({
  position = [1.8, -1.2, 0.5],
  scale = 1,
  label = 'Dose Taken On Time',
  time = '08:00 AM',
}) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = position[1] + Math.sin(t * 1.8 + 1) * 0.06
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Background Pill */}
      <RoundedBox args={[2.0, 0.6, 0.05]} radius={0.25} smoothness={4}>
        <meshPhysicalMaterial
          color="#064e3b"
          roughness={0.2}
          metalness={0.1}
          transmission={0.6}
          thickness={0.3}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Pulsing Green Indicator Dot */}
      <mesh position={[-0.75, 0, 0.04]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Notification Text */}
      <Text
        position={[-0.55, 0.06, 0.04]}
        fontSize={0.11}
        color="#ecfdf5"
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Timestamp */}
      <Text
        position={[-0.55, -0.12, 0.04]}
        fontSize={0.08}
        color="#a7f3d0"
        anchorX="left"
        anchorY="middle"
      >
        {time} • Vasopress 10mg
      </Text>
    </group>
  )
}
