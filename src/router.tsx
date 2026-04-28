import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import Analytics from '@/pages/Analytics'
import Patients from '@/pages/Patients'
import PatientDetail from '@/pages/PatientDetail'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: ROUTES.ANALYTICS, element: <Analytics /> },
      { path: ROUTES.PATIENTS, element: <Patients /> },
      { path: ROUTES.PATIENT_DETAIL, element: <PatientDetail /> },
    ],
  },
])

export { router }
