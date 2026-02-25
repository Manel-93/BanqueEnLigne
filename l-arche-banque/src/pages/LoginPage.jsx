import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

// Mots de passe stockés en dur pour la démonstration.
const CLIENT_ALICE_PASSWORD = 'client123!'
const CLIENT_KARIM_PASSWORD = 'karim123!'
const ADMIN_PASSWORD = 'admin123!'

function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password === CLIENT_ALICE_PASSWORD) {
      setError('')
      navigate('/client?clientId=c1')
      return
    }

    if (password === CLIENT_KARIM_PASSWORD) {
      setError('')
      navigate('/client?clientId=c2')
      return
    }

    if (password === ADMIN_PASSWORD) {
      setError('')
      navigate('/admin')
      return
    }

    setError('Mot de passe incorrect. Essayez à nouveau.')
  }

  return (
    <div className="login-root">
      <section className="login-panel">
        <h1>Connexion</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="password" className="login-label">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Saisissez votre mot de passe…"
          />

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
      </section>
    </div>
  )
}

export default LoginPage

