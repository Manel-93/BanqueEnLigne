import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import ClientSpacePage from '../pages/ClientSpacePage.jsx'
import AdminSpacePage from '../pages/AdminSpacePage.jsx'
import CreateAccountPage from '../pages/CreateAccountPage.jsx'

describe('HomePage', () => {
  it('affiche les boutons Connexion et Créer un compte', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /connexion/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /créer un compte/i })).toBeInTheDocument()
  })
})

describe('LoginPage', () => {
  it('affiche un champ mot de passe et le bouton Se connecter', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
  })
})

describe('ClientSpacePage', () => {
  it('affiche le titre Espace client et la section Comptes bancaires pour Alice', () => {
    render(
      <MemoryRouter initialEntries={['/client?clientId=c1']}>
        <Routes>
          <Route path="/client" element={<ClientSpacePage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /espace client/i })).toBeInTheDocument()
    expect(screen.getByText(/Comptes bancaires/i)).toBeInTheDocument()
  })
})

describe('AdminSpacePage', () => {
  it('affiche le dashboard administrateur et la liste des clients', () => {
    render(
      <MemoryRouter>
        <AdminSpacePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /dashboard administrateur/i })).toBeInTheDocument()
    expect(screen.getByText(/liste des clients/i)).toBeInTheDocument()
  })
})

describe('CreateAccountPage', () => {
  it('affiche le formulaire de création de compte', () => {
    render(
      <MemoryRouter>
        <CreateAccountPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /créer un compte/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/iban/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument()
  })
})

