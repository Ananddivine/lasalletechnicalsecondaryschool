import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  adminSidebarSections,
  clearPortalSession,
  defaultAdminUser,
  getFirstPortalPath,
  getPortalSession,
  hasPortalAccess,
  resolvePortalPermission,
  setPortalSession,
} from '../../data/adminPortalData'
import { fetchMailboxSummary, verifyPortalSession } from '../../lib/api'

function SidebarToggleIcon({ expanded }) {
  return expanded ? (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M16 8l-4 4 4 4" />
      <path d="M8 5v14" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M8 8l4 4-4 4" />
      <path d="M16 5v14" />
    </svg>
  )
}

function SidebarItemIcon({ label, isCompact = false }) {
  const className = isCompact ? 'h-5 w-5' : 'h-5 w-5 text-cyan-100'

  switch (label) {
    case 'Dashboard':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="5" rx="1.5" />
          <rect x="13" y="10" width="8" height="11" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
        </svg>
      )
    case 'Manage':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16" />
          <path d="M4 12h10" />
          <path d="M4 17h7" />
          <circle cx="18" cy="12" r="3" />
          <circle cx="15" cy="17" r="2" />
        </svg>
      )
    case 'Admission Results':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M15 3v4h4" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
        </svg>
      )
    case 'Trash':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16" />
          <path d="M9 7V4h6v3" />
          <path d="M7 7l1 13h8l1-13" />
          <path d="M10 11v5" />
          <path d="M14 11v5" />
        </svg>
      )
    case 'Activities':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 18h16" />
          <path d="M7 14V9" />
          <path d="M12 14V5" />
          <path d="M17 14v-3" />
          <circle cx="7" cy="8" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" />
          <circle cx="17" cy="10" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'Configuration':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v4" />
          <path d="M12 17v4" />
          <path d="M3 12h4" />
          <path d="M17 12h4" />
          <path d="m5.6 5.6 2.8 2.8" />
          <path d="m15.6 15.6 2.8 2.8" />
          <path d="m5.6 18.4 2.8-2.8" />
          <path d="m15.6 8.4 2.8-2.8" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2 2" />
        </svg>
      )
  }
}

const routeTitles = {
  '/portal/dashboard': 'Admissions Dashboard',
  '/portal/manage': 'Manage Admissions',
  '/portal/activities': 'Admissions Activities',
  '/portal/mailbox': 'Mailbox',
  '/portal/results': 'Admission Results',
  '/portal/trash': 'Deleted Applications',
  '/portal/configuration': 'Portal Configuration',
}

function NotificationBellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9a6 6 0 1 1 12 0v4.5l1.8 2.8c.2.3 0 .7-.4.7H4.6c-.4 0-.6-.4-.4-.7L6 13.5z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  )
}

function AdminAvatar({ session }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-2 shadow-sm">
      <img
        src={session.avatar}
        alt={session.name}
        className="h-10 w-10 rounded-full object-cover object-center"
      />
      <div className="hidden text-left sm:block">
        <p className="text-sm font-semibold text-slate-900">{session.name}</p>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{session.role}</p>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const session = getPortalSession()
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthorizing, setIsAuthorizing] = useState(Boolean(session?.token))
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarPinned, setIsSidebarPinned] = useState(true)
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const [mailboxSummary, setMailboxSummary] = useState(null)
  const [isMailboxMenuOpen, setIsMailboxMenuOpen] = useState(false)
  const mailboxMenuRef = useRef(null)
  const currentToken = session?.token || ''

  useEffect(() => {
    let isMounted = true

    if (!currentToken) {
      setIsAuthorizing(false)
      return undefined
    }

    setIsAuthorizing(true)

    verifyPortalSession()
      .then((response) => {
        if (!isMounted) {
          return
        }

        setPortalSession({
          ...defaultAdminUser,
          ...session,
          name: response.name || session.name || defaultAdminUser.name,
          email: response.email || session.email || defaultAdminUser.email,
          role: response.role || session.role,
          refId: response.refId || session.refId || null,
          avatar: response.profilePhoto || session.avatar || defaultAdminUser.avatar,
          permissions: response.permissions || session.permissions || [],
        })
        setIsAuthorizing(false)
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        clearPortalSession()
        setIsAuthorizing(false)
        navigate('/portal/login', { replace: true })
      })

    return () => {
      isMounted = false
    }
  }, [currentToken, navigate])

  const refreshMailbox = () => {
    if (!currentToken) {
      setMailboxSummary(null)
      return Promise.resolve()
    }

    return fetchMailboxSummary()
      .then((response) => {
        setMailboxSummary(response)
      })
      .catch(() => {
        setMailboxSummary(null)
      })
  }

  useEffect(() => {
    if (!currentToken) {
      setMailboxSummary(null)
      return undefined
    }

    refreshMailbox()
    const intervalId = window.setInterval(() => {
      refreshMailbox()
    }, 60000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [currentToken])

  useEffect(() => {
    if (!isMailboxMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (mailboxMenuRef.current?.contains(event.target)) {
        return
      }

      setIsMailboxMenuOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isMailboxMenuOpen])

  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith('/portal/results/')) {
      return 'Admission Result Detail'
    }

    return routeTitles[location.pathname] ?? 'Admissions Portal'
  }, [location.pathname])

  const filteredSections = useMemo(
    () =>
      adminSidebarSections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => hasPortalAccess(session, item.permission)),
        }))
        .filter((section) => section.items.length > 0),
    [session],
  )

  const currentPagePermission = resolvePortalPermission(location.pathname)
  const firstAllowedPath = getFirstPortalPath(session)
  const unreadCount = mailboxSummary?.unreadCount || 0

  if (!session) {
    return <Navigate to="/portal/login" replace />
  }

  if (isAuthorizing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#e0f2fe_100%)] px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-8 py-7 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-sky-700">Session Check</p>
          <p className="mt-3 text-sm font-medium text-slate-600">Verifying your portal access.</p>
        </div>
      </div>
    )
  }

  if (currentPagePermission && !hasPortalAccess(session, currentPagePermission)) {
    return <Navigate to={firstAllowedPath} replace />
  }

  const isDesktopExpanded = isSidebarPinned || isSidebarHovered

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#e0f2fe_100%)]">
      <div className="flex min-h-screen">
        <aside
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`fixed inset-y-0 left-0 z-40 border-r border-slate-200 bg-gradient-to-b from-slate-950 via-sky-900 to-cyan-800 text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)] transition-all duration-300 lg:static lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isDesktopExpanded ? 'w-80 p-6' : 'w-[5.5rem] p-4'}`}
        >
          <div className={`flex ${isDesktopExpanded ? 'items-center justify-between gap-4' : 'flex-col items-center gap-3'}`}>
            <div className={isDesktopExpanded ? '' : 'text-center'}>
              {isDesktopExpanded ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
                    Admin Portal
                  </p>
                  <h1 className="mt-3 text-2xl font-black tracking-tight">La Salle Admissions</h1>
                </>
              ) : (
                <div className="hidden flex h-12 w-12 items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/10 text-lg font-black tracking-[0.2em] text-cyan-100">
                  LS
                </div>
              )}
            </div>
            <div className={`flex ${isDesktopExpanded ? 'items-center gap-2' : 'flex-col gap-2'}`}>
              {isDesktopExpanded ? (
                <button
                  type="button"
                  aria-label={isSidebarPinned ? 'Collapse sidebar' : 'Expand sidebar'}
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 lg:inline-flex"
                  onClick={() => setIsSidebarPinned((currentValue) => !currentValue)}
                >
                  <SidebarToggleIcon expanded={isSidebarPinned} />
                </button>
              ) : null}
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
            </div>
          </div>

          {isDesktopExpanded ? (
            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <AdminAvatar session={session} />
              <p className="mt-4 text-sm leading-6 text-sky-100">{session.email}</p>
            </div>
          ) : (
            <div className="mt-8 flex justify-center">
              <img
                src={session.avatar}
                alt={session.name}
                className="h-12 w-12 rounded-2xl border border-white/15 object-cover object-center"
              />
            </div>
          )}

          <nav className="mt-8 space-y-6">
            {filteredSections.map((section) => (
              <div key={section.title}>
                {isDesktopExpanded ? (
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">
                    {section.title}
                  </p>
                ) : null}
                <div className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-[1.35rem] border transition ${
                          isActive
                            ? 'border-white/25 bg-white/18 text-white shadow-[0_18px_36px_rgba(8,47,73,0.24)]'
                            : 'border-transparent bg-white/5 text-slate-100 hover:border-white/20 hover:bg-white/12'
                        } ${isDesktopExpanded ? 'px-4 py-4' : 'px-3 py-3 text-center'}`
                      }
                      title={!isDesktopExpanded ? item.label : undefined}
                    >
                      {isDesktopExpanded ? (
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                            <SidebarItemIcon label={item.label} />
                          </span>
                          <div>
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className="mt-1 text-xs leading-5 text-sky-100">{item.description}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white">
                          <SidebarItemIcon label={item.label} isCompact />
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {isDesktopExpanded ? (
            <div className="mt-8 rounded-[1.6rem] border border-amber-200/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
              Use the results section to review every applicant and open the full decision note.
            </div>
          ) : null}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  Menu
                </button>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-700">
                    Admissions Control
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    {pageTitle}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative" ref={mailboxMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsMailboxMenuOpen((currentValue) => !currentValue)}
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-950 hover:text-slate-950"
                    aria-label="Open mailbox"
                  >
                    <NotificationBellIcon />
                    {unreadCount > 0 ? (
                      <span className="absolute -right-1 -top-1 inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white shadow-[0_10px_22px_rgba(244,63,94,0.35)]">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    ) : null}
                  </button>

                  {isMailboxMenuOpen ? (
                    <div className="absolute right-0 top-full z-40 mt-3 w-[23rem] rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Mailbox</p>
                          <h3 className="mt-2 text-lg font-black tracking-tight text-slate-950">{session.email}</h3>
                        </div>
                        <span className="rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-900">
                          {unreadCount} unread
                        </span>
                      </div>

                      <div className="mt-4 space-y-3">
                        {(mailboxSummary?.recentUnread || []).length > 0 ? mailboxSummary.recentUnread.map((message) => (
                          <button
                            key={message.uid}
                            type="button"
                            onClick={() => {
                              setIsMailboxMenuOpen(false)
                              navigate(`/portal/mailbox?messageUid=${message.uid}`)
                            }}
                            className="block w-full rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-sky-300 hover:bg-sky-50"
                          >
                            <p className="text-sm font-semibold text-slate-950">{message.subject}</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{message.from}</p>
                          </button>
                        )) : (
                          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                            No unread email at the moment.
                          </div>
                        )}
                      </div>

                      <Link
                        to="/portal/mailbox"
                        onClick={() => setIsMailboxMenuOpen(false)}
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                      >
                        Open mailbox
                      </Link>
                    </div>
                  ) : null}
                </div>
                <Link
                  to="/admissions"
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                >
                  Public admissions
                </Link>
                <AdminAvatar session={session} />
                <button
                  type="button"
                  onClick={() => {
                    clearPortalSession()
                    navigate('/portal/login', { replace: true })
                  }}
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet context={{ mailboxSummary, refreshMailboxSummary: refreshMailbox, portalSession: session }} />
          </main>
        </div>
      </div>
    </div>
  )
}