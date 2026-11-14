import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Heart, Globe, Share2, Mail } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export const Footer: React.FC = () => {
  const { theme } = useApp()
  const isBright = theme === 'bright'

  return (
    <footer
      className={`border-t py-16 transition-colors ${
        isBright
          ? 'bg-[#fcfdf2] border-[#b9e9fc] text-[#045372]'
          : 'bg-[#070a0b] border-[#384146] text-[#9db4c0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
                  isBright
                    ? 'bg-gradient-to-tr from-[#05668d] to-[#00a896] text-white'
                    : 'bg-gradient-to-tr from-[#11a7ad] to-[#32e5eb] text-[#070a0b]'
                }`}
              >
                <Activity className="w-5 h-5" />
              </div>
              <span
                className={`text-xl font-bold tracking-tight font-['Plus_Jakarta_Sans'] ${
                  isBright ? 'text-[#01151d]' : 'text-white'
                }`}
              >
                Medi
                <span className={isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}>
                  Care
                </span>
              </span>
            </Link>
            <p
              className={`text-sm max-w-sm leading-relaxed mb-6 ${
                isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
              }`}
            >
              The international gold standard in intelligent medication management, computer vision prescription parsing, and caregiver telemetry.
            </p>
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                  isBright
                    ? 'bg-white border-[#b9e9fc] hover:text-[#05668d]'
                    : 'bg-[#161e21] border-[#384146] hover:text-white'
                }`}
                title="Global Health Network"
              >
                <Globe className="w-4 h-4" />
              </span>
              <span
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                  isBright
                    ? 'bg-white border-[#b9e9fc] hover:text-[#05668d]'
                    : 'bg-[#161e21] border-[#384146] hover:text-white'
                }`}
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </span>
              <span
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                  isBright
                    ? 'bg-white border-[#b9e9fc] hover:text-[#05668d]'
                    : 'bg-[#161e21] border-[#384146] hover:text-white'
                }`}
                title="Clinical Support"
              >
                <Mail className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Nav columns */}
          <div>
            <h5
              className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              Platform
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/dashboard"
                  className={isBright ? 'hover:text-[#05668d]' : 'hover:text-white'}
                >
                  Patient Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className={isBright ? 'hover:text-[#05668d]' : 'hover:text-white'}
                >
                  Caregiver Portal
                </Link>
              </li>
              <li>
                <a
                  href="#technology"
                  className={isBright ? 'hover:text-[#05668d]' : 'hover:text-white'}
                >
                  3D Digital Twin
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className={isBright ? 'hover:text-[#05668d]' : 'hover:text-white'}
                >
                  Prescription OCR
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className={isBright ? 'hover:text-[#05668d]' : 'hover:text-white'}
                >
                  Adherence Analytics
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5
              className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              Clinical & Safety
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#technology"
                  className={isBright ? 'hover:text-[#05668d]' : 'hover:text-white'}
                >
                  Clinical Standards
                </a>
              </li>
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  FDA Interaction Engine
                </span>
              </li>
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  HIPAA Compliance
                </span>
              </li>
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  Physician Direct API
                </span>
              </li>
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  Pharmacy Integrations
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h5
              className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              Company
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  About Us
                </span>
              </li>
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  Medical Advisory Board
                </span>
              </li>
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  Careers
                </span>
              </li>
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  Privacy & Security
                </span>
              </li>
              <li>
                <span className={isBright ? 'hover:text-[#05668d] cursor-pointer' : 'hover:text-white cursor-pointer'}>
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${
            isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
          }`}
        >
          <p>© {new Date().getFullYear()} MediCare Health Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for global patient wellness</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
