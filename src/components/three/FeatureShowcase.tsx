import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, ContactShadows } from '@react-three/drei'
import { MedicalCapsule } from './MedicalCapsule'
import { MedicalShield } from './MedicalShield'
import { PrescriptionDoc } from './PrescriptionDoc'

interface FeatureShowcaseItemProps {
  variant: 'reminders' | 'monitoring' | 'prescription'
  className?: string
}

export const FeatureShowcaseItem: React.FC<FeatureShowcaseItemProps> = ({
  variant,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-[240px] md:h-[280px] rounded-2xl overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} />
        <pointLight position={[-3, 2, 2]} intensity={1.8} color="#0284c7" />
        <pointLight position={[3, -2, 2]} intensity={1.8} color="#2dd4bf" />

        <Suspense fallback={null}>
          {variant === 'reminders' && (
            <group position={[0, 0, 0]}>
              <Float speed={2} rotationIntensity={0.8} floatIntensity={0.9}>
                <MedicalCapsule
                  position={[0, 0, 0]}
                  rotation={[0.5, 0.4, 0.6]}
                  scale={1.05}
                />
              </Float>
            </group>
          )}

          {variant === 'monitoring' && (
            <group position={[0, 0, 0]}>
              <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.7}>
                <MedicalShield
                  position={[0, 0.1, 0]}
                  rotation={[0.1, 0.2, 0]}
                  scale={0.95}
                />
              </Float>
            </group>
          )}

          {variant === 'prescription' && (
            <group position={[0, 0, 0]}>
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.6}>
                <PrescriptionDoc
                  position={[0, 0, 0]}
                  rotation={[0.08, -0.2, 0.04]}
                  scale={1.05}
                />
              </Float>
            </group>
          )}

          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
            far={3.5}
            color="#0284c7"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
