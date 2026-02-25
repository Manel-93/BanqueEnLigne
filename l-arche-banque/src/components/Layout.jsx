import PropTypes from 'prop-types'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Layout.css'

// Layout principal avec header, navigation et conteneur de page.
function Layout({ children }) {
  const location = useLocation()
  const isSessionView =
    location.pathname.startsWith('/client') || location.pathname.startsWith('/admin')

  return (
    <div className="layout-root">
      <header className="layout-header">
        <Link to="/" className="brand">
          <div className="brand-mark">A</div>
          <div className="brand-text">
            <span className="brand-name">l’Arche</span>
            <span className="brand-tagline">Banque en ligne nouvelle génération</span>
          </div>
        </Link>
        <nav className="main-nav">
          <NavLink to="/" end className="nav-link">
            Accueil
          </NavLink>
          {isSessionView ? (
            <Link to="/" className="nav-link nav-link-primary">
              Déconnexion
            </Link>
          ) : (
            <NavLink to="/login" className="nav-link nav-link-primary">
              Connexion
            </NavLink>
          )}
        </nav>
      </header>

      <main className="layout-content">{children}</main>

      <footer className="layout-footer">
        <span>© 2026 Banque l’Arche – Projet d’étude</span>
        <span className="footer-links">
          <a href="#security">Sécurité</a>
          <a href="#legal">Mentions légales</a>
        </span>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

