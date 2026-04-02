import './Navbar.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Programs' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, onNav }) {
  return (
    <nav className="site-navbar">
      <div className="brand-wrap">
        <strong>Lasalle</strong>
        <span>Technical Secondary School</span>
      </div>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onNav(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
