import { useState, type FormEvent } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import { validateSignupForm } from '@/utils/validators'
import { APP_NAME } from '@/constants'
import { ROUTES } from '@/constants/routes'

function Signup() {
  const { user, signUp, loading: authLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (authLoading) return null
  if (user) return <Navigate to={ROUTES.DASHBOARD} replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const validation = validateSignupForm(name, email, password, confirmPassword)
    if (!validation.valid) {
      setError(validation.message)
      return
    }

    setSubmitting(true)
    try {
      await signUp(name, email, password)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      if (message.includes('email-already-in-use')) {
        setError('An account with this email already exists')
      } else if (message.includes('weak-password')) {
        setError('Password is too weak. Please choose a stronger one.')
      } else {
        setError('Unable to create account. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-weak p-4">
      <div className="w-full max-w-sm">
        <div className="bg-background-weak border-2 border-background-white rounded-[20px] shadow-[0_4px_8px_0_rgba(0,0,0,0.06),0_0_4px_0_rgba(0,0,0,0.04)] p-6">
          <div className="text-center mb-6">
            <h1 className="font-ibm-plex-serif text-2xl font-semibold text-strong">{APP_NAME}</h1>
            <p className="text-sm text-soft mt-1">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Dr. Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={16} strokeWidth={2} />}
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={16} strokeWidth={2} />}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={16} strokeWidth={2} />}
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={16} strokeWidth={2} />}
              autoComplete="new-password"
            />

            {error && (
              <div className="bg-error-lighter text-error-base text-xs font-medium px-3 py-2 rounded-full">
                {error}
              </div>
            )}

            <Button type="submit" loading={submitting} className="w-full mt-2">
              Create account
            </Button>
          </form>

          <p className="text-xs text-soft text-center mt-4">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-sub font-medium hover:text-strong transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
