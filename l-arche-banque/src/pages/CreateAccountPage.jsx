import { useState } from 'react'
import './CreateAccountPage.css'

function CreateAccountPage() {
  const [iban, setIban] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // Simulation : on ne stocke pas réellement les données.
    setSubmitted(true)
  }

  return (
    <div className="create-root">
      <section className="create-panel">
        <h1>Créer un compte</h1>
        <p className="create-subtitle">
          Renseignez votre IBAN, votre adresse e-mail et votre mot de passe pour simuler l’ouverture
          d’un compte chez l’Arche.
        </p>

        <form onSubmit={handleSubmit} className="create-form">
          <label htmlFor="iban" className="create-label">
            IBAN
          </label>
          <input
            id="iban"
            type="text"
            className="create-input"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            placeholder="FR76 3000 6000 0..."
          />

          <label htmlFor="email" className="create-label">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            className="create-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.fr"
          />

          <label htmlFor="password" className="create-label">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            className="create-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choisissez un mot de passe"
          />

          <button type="submit" className="create-button">
            Valider la création
          </button>
        </form>

        {submitted && (
          <div className="create-success">
            Votre demande de création de compte a bien été prise en compte (simulation).
          </div>
        )}
      </section>
    </div>
  )
}

export default CreateAccountPage

