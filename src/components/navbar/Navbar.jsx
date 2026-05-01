import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { admissionForms } from '../../data/admissionForms'
import navbarLogo from '../../assets/logofornavbar.png'

const admissionSubmenu = admissionForms.map((form) => ({
  label: form.navLabel,
  path: `/admissions/${form.slug}`,
}))

const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  {
    id: 'programs',
    label: 'Programs',
    path: '/programs',
    submenu: [
      { label: 'Engineering', path: '/programs/engineering' },
      { label: 'Design', path: '/programs/design' },
      { label: 'Leadership', path: '/programs/leadership' },
    ],
  },
  { id: 'admissions', label: 'Admissions', path: '/admissions', submenu: admissionSubmenu },
  { id: 'history', label: 'History', path: '/history' },
  { id: 'handbook', label: 'Handbook', path: '/handbook' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => {
    setIsOpen(false)
  }
  const navLinkClass = (path) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
      ? 'text-slate-900 border-b-2 border-indigo-500 pb-1'
      : 'text-slate-700 hover:text-indigo-700'

  const admissionsLinkClass =
    location.pathname === '/admissions' || location.pathname.startsWith('/admissions/')
      ? 'admissions-nav-link admissions-nav-link-active'
      : 'admissions-nav-link'

  return (
    <nav className="sticky top-0 w-full z-30 border-b border-slate-200 bg-gradient-to-br from-pink-100 via-peach-100 to-sky-200 backdrop-blur-xl px-6 py-5 shadow-sm">
      <div className="mx-auto flex  flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl p-2 shadow-lg shadow-cyan-500/10 ring-1 ring-white/70 backdrop-blur-sm">
              <img
                src={navbarLogo}
                alt="La Salle Technical Secondary School logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-cyan-500/20">
                Lasalle
              </div>
              <p className="text-sm text-slate-600">Technical Secondary School</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-700 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className={`flex-col gap-3 md:flex md:flex-row ${isOpen ? 'flex' : 'hidden'}`}>
          <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            {navItems.map((item) => (
              <li key={item.id} className="relative group md:pb-3">
                <NavLink
                  to={item.path}
                  className={`transition ${item.id === 'admissions' ? admissionsLinkClass : navLinkClass(item.path)}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
                {item.submenu && (
                  <div className="md:pointer-events-none md:absolute md:left-0 md:top-full md:w-80 md:pt-3 md:opacity-0 md:transition md:duration-200 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100">
                    <ul className="space-y-2 rounded-[1.75rem] border border-cyan-100/70 bg-gradient-to-br from-cyan-50 via-sky-100 to-fuchsia-100 p-3 shadow-[0_22px_50px_rgba(14,116,144,0.18)] backdrop-blur-sm">
                      {item.submenu.map((sub) => (
                        <li key={sub.path}>
                          <NavLink
                            to={sub.path}
                            className="block rounded-xl px-4 py-2 text-slate-700 transition hover:bg-white/80 hover:text-indigo-700 focus:bg-white/80 focus:text-indigo-700"
                            onClick={closeMenu}
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
