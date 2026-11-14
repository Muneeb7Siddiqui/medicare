import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { MedicalCapsule } from './MedicalCapsule'
import { MedicalShield } from './MedicalShield'
import { FloatingParticles } from './FloatingParticles'
import { FloatingCard } from './FloatingCard'
import { FloatingNotification } from './FloatingNotification'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useApp } from '@/context/AppContext'

interface SceneContentProps {
  mouse: { normalizedX: number; normalizedY: number }
  isBright: boolean
}

const SceneContent: React.FC<SceneContentProps> = ({ mouse, isBright }) => {
  const sceneGroupRef = useRef<THREE.Group>(null)
  const prefersReduced = useReducedMotion()

  useFrame((_, delta) => {
    if (!sceneGroupRef.current) return

    if (!prefersReduced) {
      // Smooth lerp based on mouse movement
      const targetRotationY = mouse.normalizedX * 0.25
      const targetRotationX = -mouse.normalizedY * 0.18

      sceneGroupRef.current.rotation.y = THREE.MathUtils.damp(
        sceneGroupRef.current.rotation.y,
        targetRotationY,
        3.5,
        delta
      )
      sceneGroupRef.current.rotation.x = THREE.MathUtils.damp(
        sceneGroupRef.current.rotation.x,
        targetRotationX,
        3.5,
        delta
      )
    }
  })

  // Theme-aware colors
  const primaryLightColor = isBright ? '#05668d' : '#32e5eb'
  const secondaryLightColor = isBright ? '#02c39a' : '#8ac2c9'
  const shadowColor = isBright ? '#05668d' : '#070a0b'
  const card1Accent = isBright ? '#00a896' : '#32e5eb'
  const card2Accent = isBright ? '#05668d' : '#8ac2c9'

  return (
    <group ref={sceneGroupRef}>
      {/* Ambient and Key Lighting */}
      <ambientLight intensity={isBright ? 0.95 : 0.6} />
      <directionalLight position={[5, 8, 5]} intensity={isBright ? 1.8 : 1.5} color="#ffffff" />
      <pointLight position={[-4, 2, 2]} intensity={2.0} color={primaryLightColor} distance={10} />
      <pointLight position={[4, -2, 2]} intensity={2.2} color={secondaryLightColor} distance={10} />
      <spotLight
        position={[0, 6, 4]}
        intensity={1.2}
        angle={0.6}
        penumbra={0.8}
        color={primaryLightColor}
      />

      {/* Floating Particles in Background */}
      <FloatingParticles count={110} />

      {/* Hero Capsule in Center */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <MedicalCapsule
          position={[0.2, 0.1, 0.4]}
          rotation={[0.45, 0.35, 0.6]}
          scale={1.25}
        />
      </Float>

      {/* Glass Medical Shield in Back-Left */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <MedicalShield
          position={[-2.4, 0.6, -0.8]}
          rotation={[0.1, 0.5, -0.1]}
          scale={0.95}
        />
      </Float>

      {/* Upper Left Card: 99.2% Adherence Rate */}
      <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.4}>
        <FloatingCard
          position={[-2.1, -1.3, 0.8]}
          rotation={[0.05, 0.2, 0]}
          scale={0.85}
          badge="PATIENT ADHERENCE"
          title="99.2% On-Time Rate"
          subtitle="All morning medications verified"
          accentColor={card1Accent}
        />
      </Float>

      {/* Upper Right Card: Next Dose Alert */}
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
        <FloatingCard
          position={[2.4, 1.2, -0.2]}
          rotation={[-0.05, -0.25, 0.02]}
          scale={0.85}
          badge="SMART SCHEDULE"
          title="Next Dose: 08:30 AM"
          subtitle="Glucorid Balance 500mg"
          accentColor={card2Accent}
        />
      </Float>

      {/* Bottom Floating Notification */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
        <FloatingNotification
          position={[1.9, -1.2, 0.6]}
          scale={0.9}
          label="Dose Verified Taken"
          time="07:28 AM"
        />
      </Float>

      {/* Soft Contact Shadows below */}
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={isBright ? 0.3 : 0.45}
        scale={10}
        blur={2.5}
        far={5}
        color={shadowColor}
      />
    </group>
  )
}

interface HeroSceneProps {
  mouse?: { normalizedX: number; normalizedY: number }
  className?: string
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  mouse = { normalizedX: 0, normalizedY: 0 },
  className = '',
}) => {
  const { theme } = useApp()
  const isBright = theme === 'bright'

  return (
    <div className={`relative w-full h-full min-h-[460px] lg:min-h-[620px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} isBright={isBright} />
        </Suspense>
      </Canvas>
    </div>
  )
}
