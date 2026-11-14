import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { useApp } from '@/context/AppContext'

export const TestimonialsSection: React.FC = () => {
  const { theme } = useApp()
  const isBright = theme === 'bright'

  const testimonials = [
    {
      name: 'Dr. Rehan Shaik [K.K], MD, FACC',
      role: 'Chief of Preventive Cardiology, Bay Area Medical',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
      quote:
        'MediCare solved the single greatest bottleneck in cardiology: patient adherence post-myocardial infarction. Our readmission rate fell by 38% in the first cohort.',
      badge: 'Clinical Partner',
      rating: 5,
    },
    {
      name: 'Arthur Sterling',
      role: 'Family Caregiver for 82yo Parent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      quote:
        'Living three states away from my father was agonizing until MediCare. The instant push notification confirming his morning blood pressure dose brings immense peace of mind.',
      badge: 'Caregiver Portal',
      rating: 5,
    },
    {
      name: 'Clara Hughes',
      role: 'Type 2 Diabetes & Asthma Patient',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      quote:
        'The 3D pill inspection sounds high-tech, but for someone with deteriorating eyesight, seeing the exact shape, color, and dosage confirmed on screen is life-saving.',
      badge: 'Active Patient',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden mesh-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
              isBright
                ? 'bg-[#b9e9fc]/40 border-[#05668d]/30 text-[#05668d]'
                : 'bg-[#161e21] border-[#384146] text-[#32e5eb]'
            }`}
          >
            Patient & Provider Trust
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            Validated by Doctors, Loved by Families
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
            }`}
          >
            Hear directly from clinicians on the frontlines and patients taking control of their wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <GlassCard
              key={item.name}
              variant="interactive"
              className="p-8 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isBright
                        ? 'bg-[#b8f6fe]/40 text-[#00a896] border-[#00a896]/30'
                        : 'bg-[#161e21] text-[#32e5eb] border-[#384146]'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <Quote
                  className={`w-8 h-8 mb-3 ${
                    isBright ? 'text-[#05668d]/25' : 'text-[#32e5eb]/30'
                  }`}
                />

                <p
                  className={`text-sm leading-relaxed italic ${
                    isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
                  }`}
                >
                  "{item.quote}"
                </p>
              </div>

              {/* Author footer */}
              <div
                className={`mt-8 pt-4 border-t flex items-center gap-3 ${
                  isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
                }`}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className={`w-11 h-11 rounded-full object-cover border-2 ${
                    isBright ? 'border-[#05668d]/40' : 'border-[#32e5eb]/40'
                  }`}
                />
                <div>
                  <h4
                    className={`text-sm font-bold font-['Plus_Jakarta_Sans'] ${
                      isBright ? 'text-[#01151d]' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </h4>
                  <p className={`text-xs ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
                    {item.role}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
