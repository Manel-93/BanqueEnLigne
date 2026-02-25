import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ClientSpacePage from './pages/ClientSpacePage.jsx'
import AdminSpacePage from './pages/AdminSpacePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CreateAccountPage from './pages/CreateAccountPage.jsx'
import './App.css'

// Déclare les routes principales de l'application.
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CreateAccountPage />} />
          <Route path="/client" element={<ClientSpacePage />} />
          <Route path="/admin" element={<AdminSpacePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
