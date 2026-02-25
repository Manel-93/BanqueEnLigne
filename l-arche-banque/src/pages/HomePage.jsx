import { Link } from 'react-router-dom'
import logoLarche from '../assets/logo-larche.png'
import './HomePage.css'

// Page d'accueil présentant la banque et l'accès à la connexion.
function HomePage() {
  return (
    <div className="home-root">
      <section className="hero">
        <div className="hero-left">
          <img src={logoLarche} alt="Logo l’Arche" className="hero-logo" />
          <h1>
            Bienvenue à <span>l’Arche</span>
          </h1>
          <p className="hero-subtitle">
            Une banque 100% en ligne, pensée pour la transparence, la sécurité et la simplicité au quotidien.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Créer un compte
            </Link>
            <Link to="/login" className="btn-secondary">
              Connexion
            </Link>
          </div>
          <div className="hero-badges">
            <span>Chiffrement avancé</span>
            <span>Support 7j/7</span>
            <span>Cartes virtuelles instantanées</span>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card hero-security">
            <span className="card-label">Sécurité</span>
            <span className="card-value">3D Secure • Biométrie</span>
            <span className="card-caption">Suivi en temps réel</span>
          </div>
          <div className="hero-card hero-notification">
            <span className="card-label">Alertes intelligentes</span>
            <span className="card-caption">
              Vous êtes prévenu dès qu’un paiement sort de vos habitudes.
            </span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Comptes courants & épargne</h3>
          <p>Visualisez vos soldes, vos IBAN et votre historique de mouvements en un coup d’œil.</p>
        </div>
        <div className="feature">
          <h3>Cartes virtuelles</h3>
          <p>Activez ou bloquez vos cartes en temps réel, sans appel ni attente en agence.</p>
        </div>
        <div className="feature">
          <h3>Paiements & factures</h3>
          <p>Centralisez vos factures et suivez l’état de chaque paiement de manière claire.</p>
        </div>
        <div className="feature">
          <h3>Messagerie sécurisée</h3>
          <p>Échangez avec votre conseiller dans un environnement sécurisé et chiffré.</p>
        </div>
      </section>
    </div>
  )
}

export default HomePage

