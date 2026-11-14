import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import { LoadingScreen } from '@/components/shared/LoadingScreen'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  )
}
export default App
