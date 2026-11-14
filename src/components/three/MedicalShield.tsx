import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MedicalShieldProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export const MedicalShield: React.FC<MedicalShieldProps> = ({
  position = [-2.2, 0.4, -0.5],
  rotation = [0.1, 0.4, -0.1],
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null)

  // Create shield shape
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 1.2)
    shape.quadraticCurveTo(1.1, 1.1, 1.1, 0.2)
    shape.quadraticCurveTo(1.0, -0.8, 0, -1.4)
    shape.quadraticCurveTo(-1.0, -0.8, -1.1, 0.2)
    shape.quadraticCurveTo(-1.1, 1.1, 0, 1.2)

    const extrudeSettings = {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = position[1] + Math.cos(t * 1.1) * 0.12
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.6) * 0.15
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Glass Shield Outer Body */}
      <mesh geometry={shieldGeometry}>
        <meshPhysicalMaterial
          color="#2dd4bf"
          roughness={0.05}
          metalness={0.1}
          transmission={0.88}
          thickness={1.2}
          ior={1.45}
          transparent={true}
          opacity={0.92}
          reflectivity={0.9}
        />
      </mesh>

      {/* Central Medical Cross (Glowing Teal) */}
      <group position={[0, -0.1, 0.16]}>
        {/* Vertical beam */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.22, 0.72, 0.08]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>
        {/* Horizontal beam */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.72, 0.22, 0.08]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Inner ambient glow point light */}
      <pointLight color="#2dd4bf" intensity={1.5} distance={3} />
    </group>
  )
}
