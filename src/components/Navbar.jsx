import { NavLink } from "react-router-dom"
import logo from "../assets/tds-logo.png"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/policies", label: "Policies" },
  { to: "/documents", label: "Documents" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <NavLink className="brand" to="/">
          <img alt="TDS logo" className="brand-logo" src={logo} />
        </NavLink>

        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <a className="nav-button nav-button--ghost" href="mailto:trizoneds@gmail.com">
            Email Us
          </a>
          <NavLink className="nav-button" to="/contact">
            Get In Touch
          </NavLink>
        </div>
      </nav>

    </header>
  )
}
