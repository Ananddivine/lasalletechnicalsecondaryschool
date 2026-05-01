import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  adminCredentials,
  defaultAdminUser,
  getPortalSession,
  setPortalSession,
} from '../data/adminPortalData'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const session = getPortalSession()
  const [email, setEmail] = useState(adminCredentials.email)
  const [password, setPassword] = useState(adminCredentials.password)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Admissions Admin Login'
  }, [])

  if (session) {
    return <Navigate to="/portal/dashboard" replace />
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_25%),linear-gradient(145deg,#082f49_0%,#0f172a_40%,#581c87_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.36em] text-cyan-200">
            Secure Access
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Admissions operations, results, and daily workflow in one place.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-sky-50">
            This admin login area is based on the reference patterns from the example folder,
            adapted to this school admissions app with a dashboard, sidebar navigation, and
            applicant result management.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">Default login</p>
              <p className="mt-3 text-sm leading-6 text-white">Email: {adminCredentials.email}</p>
              <p className="text-sm leading-6 text-white">Password: {adminCredentials.password}</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">Portal tools</p>
              <p className="mt-3 text-sm leading-6 text-white">
                Dashboard, manage queue, activities board, and admission result tracking.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">
            Admin Login
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
            Sign in to the admissions dashboard
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Use the school admissions credentials to access review, management, and result pages.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              setIsSubmitting(true)
              setErrorMessage('')

              window.setTimeout(() => {
                if (
                  email.trim().toLowerCase() === adminCredentials.email &&
                  password === adminCredentials.password
                ) {
                  setPortalSession({
                    ...defaultAdminUser,
                    email: adminCredentials.email,
                    lastLogin: new Date().toISOString(),
                  })
                  navigate('/portal/dashboard', { replace: true })
                  return
                }

                setErrorMessage('Invalid email or password. Use the default credentials shown on this page.')
                setIsSubmitting(false)
              }, 450)
            }}
          >
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="admin@lasalletech.edu.pg"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="Enter your password"
                required
              />
            </label>

            {errorMessage && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(15,23,42,0.2)] transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <Link
            to="/admissions"
            className="mt-6 inline-flex text-sm font-semibold text-sky-700 transition hover:text-sky-900"
          >
            Back to admissions page
          </Link>
        </div>
      </div>
    </section>
  )
}