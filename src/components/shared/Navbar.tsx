import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Bell, Menu, X, ChevronRight } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useApp } from '@/context/AppContext'

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { userRole, setUserRole, unreadNotificationsCount, theme, userName, doctorName } = useApp()
  const isBright = theme === 'bright'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Technology', href: '/#technology' },
  ]

  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || isDashboard
          ? isBright
            ? 'bg-[#fcfdf2]/85 backdrop-blur-xl border-b border-[#b9e9fc] py-3.5 shadow-lg shadow-black/5'
            : 'bg-[#070a0b]/85 backdrop-blur-xl border-b border-[#384146] py-3.5 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 ${
                isBright
                  ? 'bg-gradient-to-tr from-[#05668d] to-[#00a896] shadow-[#05668d]/20 text-white'
                  : 'bg-gradient-to-tr from-[#11a7ad] to-[#32e5eb] shadow-[#32e5eb]/25 text-[#070a0b]'
              }`}
            >
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-bold tracking-tight flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] ${
                  isBright ? 'text-[#01151d]' : 'text-white'
                }`}
              >
                Medi
                <span className={isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}>
                  Care
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${
                    isBright
                      ? 'bg-[#b9e9fc]/40 text-[#05668d] border-[#05668d]/30'
                      : 'bg-[#32e5eb]/10 text-[#32e5eb] border-[#32e5eb]/25'
                  }`}
                >
                  PRO
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {!isDashboard ? (
            <nav
              className={`hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 backdrop-blur-md border ${
                isBright
                  ? 'bg-white/80 border-[#b9e9fc] shadow-sm'
                  : 'bg-[#161e21]/80 border-[#384146]'
              }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isBright
                      ? 'text-[#033e56] hover:text-[#05668d] hover:bg-[#b9e9fc]/30'
                      : 'text-[#c2dfe3] hover:text-white hover:bg-[#253237]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span
                className={`text-xs uppercase tracking-wider font-semibold ${
                  isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
                }`}
              >
                Active Role:
              </span>
              <div
                className={`inline-flex rounded-lg p-1 border ${
                  isBright ? 'bg-slate-100 border-[#b9e9fc]' : 'bg-[#161e21] border-[#384146]'
                }`}
              >
                <button
                  onClick={() => setUserRole('patient')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    userRole === 'patient'
                      ? isBright
                        ? 'bg-[#05668d] text-white shadow-sm'
                        : 'bg-[#32e5eb] text-[#070a0b] font-bold shadow-sm'
                      : isBright
                      ? 'text-[#033e56] hover:text-[#05668d]'
                      : 'text-[#9db4c0] hover:text-white'
                  }`}
                >
                  Patient View
                </button>
                <button
                  onClick={() => setUserRole('caregiver')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    userRole === 'caregiver'
                      ? isBright
                        ? 'bg-[#00a896] text-white shadow-sm'
                        : 'bg-[#11a7ad] text-white shadow-sm'
                      : isBright
                      ? 'text-[#033e56] hover:text-[#05668d]'
                      : 'text-[#9db4c0] hover:text-white'
                  }`}
                >
                  Caregiver Portal
                </button>
              </div>
            </div>
          )}

          {/* CTA Actions and Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle (Bright / Dark) */}
            <ThemeToggle />

            {isDashboard ? (
              <>
                <Link
                  to="/"
                  className={`text-xs font-medium transition-colors px-3 py-2 ${
                    isBright ? 'text-[#033e56] hover:text-[#05668d]' : 'text-[#9db4c0] hover:text-white'
                  }`}
                >
                  Landing Page
                </Link>
                <div
                  className={`relative p-2 rounded-xl border transition-colors cursor-pointer ${
                    isBright
                      ? 'bg-white border-[#b9e9fc] text-[#05668d] hover:bg-slate-50'
                      : 'bg-[#161e21] border-[#384146] text-[#c2dfe3] hover:text-white'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationsCount > 0 && (
                    <span
                      className={`absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse ${
                        isBright ? 'bg-[#00a896]' : 'bg-[#32e5eb]'
                      }`}
                    />
                  )}
                </div>
                <div
                  className={`flex items-center gap-2.5 pl-2 border-l ${
                    isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                      isBright
                        ? 'bg-gradient-to-tr from-[#05668d] to-[#02c39a] text-white'
                        : 'bg-gradient-to-tr from-[#32e5eb] to-[#8ac2c9] text-[#070a0b]'
                    }`}
                  >
                    {userRole === 'patient' ? userName.slice(0, 2).toUpperCase() : 'RS'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p
                      className={`text-xs font-semibold leading-none ${
                        isBright ? 'text-[#01151d]' : 'text-white'
                      }`}
                    >
                      {userRole === 'patient' ? userName : `Dr. ${doctorName}`}
                    </p>
                    <p
                      className={`text-[10px] leading-none mt-1 ${
                        isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
                      }`}
                    >
                      {userRole === 'patient' ? 'Patient ID #8892' : 'Attending Physician & Caregiver'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors px-3.5 py-2 ${
                    isBright ? 'text-[#033e56] hover:text-[#05668d]' : 'text-[#c2dfe3] hover:text-white'
                  }`}
                >
                  Sign In
                </Link>
                <MagneticButton strength={0.25}>
                  <Link
                    to="/dashboard"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all group ${
                      isBright
                        ? 'bg-gradient-to-r from-[#05668d] to-[#00a896] hover:from-[#089bd5] hover:to-[#02c39a] text-white shadow-md shadow-[#05668d]/25'
                        : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] hover:from-[#32e5eb] hover:to-[#88f0f3] text-[#070a0b] shadow-lg shadow-[#32e5eb]/25 font-bold'
                    }`}
                  >
                    <span>Launch Platform</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </MagneticButton>
              </>
            )}
          </div>

          {/* Mobile Menu & Theme Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${
                isBright
                  ? 'bg-white border-[#b9e9fc] text-[#05668d]'
                  : 'bg-[#161e21] border-[#384146] text-[#c2dfe3]'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b backdrop-blur-2xl px-4 py-5 ${
              isBright
                ? 'bg-[#fcfdf2]/98 border-[#b9e9fc] text-[#01151d]'
                : 'bg-[#070a0b]/98 border-[#384146] text-white'
            }`}
          >
            <div className="flex flex-col gap-3">
              {!isDashboard ? (
                <>
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 text-base font-medium transition-colors ${
                        isBright
                          ? 'text-[#033e56] hover:text-[#05668d]'
                          : 'text-[#c2dfe3] hover:text-[#32e5eb]'
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                  <div
                    className={`pt-3 border-t flex flex-col gap-2 ${
                      isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
                    }`}
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full text-center py-2.5 rounded-xl font-semibold text-sm ${
                        isBright
                          ? 'bg-[#05668d] text-white'
                          : 'bg-[#32e5eb] text-[#070a0b]'
                      }`}
                    >
                      Launch Dashboard
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <div
                    className={`flex items-center justify-between p-2 rounded-xl border ${
                      isBright
                        ? 'bg-white border-[#b9e9fc]'
                        : 'bg-[#161e21] border-[#384146]'
                    }`}
                  >
                    <span className="text-xs text-[#045372]">View Mode:</span>
                    <button
                      onClick={() => {
                        setUserRole(userRole === 'patient' ? 'caregiver' : 'patient')
                        setMobileMenuOpen(false)
                      }}
                      className="text-xs font-semibold text-[#05668d]"
                    >
                      Switch to {userRole === 'patient' ? 'Caregiver' : 'Patient'}
                    </button>
                  </div>
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm py-2"
                  >
                    Back to Landing Page
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
