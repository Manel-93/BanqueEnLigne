import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { accounts, clients, invoices, messages } from '../data/mockData'
import './AdminSpacePage.css'

// Espace admin simple pour visualiser la santé des clients et leurs échanges.
function AdminSpacePage() {
  const enrichedClients = useMemo(
    () =>
      clients.map((client) => {
        const clientAccounts = accounts.filter((a) => a.clientId === client.id)
        const totalBalance = clientAccounts.reduce((acc, a) => acc + a.balance, 0)
        const hasOverdrawn = clientAccounts.some((a) => a.balance < 0)
        const clientInvoices = invoices.filter((inv) => inv.clientId === client.id)
        const unpaidInvoices = clientInvoices.filter((inv) => inv.status !== 'Payée').length
        return {
          ...client,
          totalBalance,
          hasOverdrawn,
          accountCount: clientAccounts.length,
          unpaidInvoices,
        }
      }),
    [],
  )

  return (
    <div className="admin-root">
      <header className="admin-header">
        <div>
          <h1>Dashboard administrateur</h1>
        </div>
        <div className="admin-header-right">
          <div className="admin-kpis">
            <div className="kpi">
              <span className="kpi-label">Clients</span>
              <span className="kpi-value">{clients.length}</span>
            </div>
            <div className="kpi">
              <span className="kpi-label">Soldes cumulés</span>
              <span className="kpi-value">
                {enrichedClients
                  .reduce((acc, c) => acc + c.totalBalance, 0)
                  .toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="admin-grid">
        <div className="panel admin-clients">
          <div className="panel-header">
            <h2>Liste des clients</h2>
            <span className="panel-subtitle">Vue synthétique</span>
          </div>
          <table className="clients-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Statut</th>
                <th>Soldes agrégés</th>
                <th>Comptes</th>
                <th>Factures impayées</th>
              </tr>
            </thead>
            <tbody>
              {enrichedClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className="client-cell">
                      <span className="avatar">
                        {client.firstName[0]}
                        {client.lastName[0]}
                      </span>
                      <div>
                        <div className="client-name">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="client-email">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status-pill ${
                        client.hasOverdrawn || client.unpaidInvoices > 0 ? 'negative' : 'positive'
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className={client.totalBalance < 0 ? 'neg' : ''}>
                    {client.totalBalance.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </td>
                  <td>{client.accountCount}</td>
                  <td>{client.unpaidInvoices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="side-column">
          <div className="panel admin-invoices">
            <div className="panel-header">
              <h2>Suivi des paiements</h2>
              <span className="panel-subtitle">Factures clients</span>
            </div>
            <ul className="admin-list">
              {invoices.map((inv) => {
                const client = clients.find((c) => c.id === inv.clientId)
                return (
                  <li key={inv.id} className="admin-list-item">
                    <div className="admin-list-main">
                      <span className="merchant">{inv.merchant}</span>
                      <span
                        className={`invoice-status ${
                          inv.status === 'Payée' ? 'paid' : 'pending'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <div className="admin-list-meta">
                      <span>
                        {client?.firstName} {client?.lastName}
                      </span>
                      <span>
                        {inv.amount.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="panel admin-messages">
            <div className="panel-header">
              <h2>Messagerie clients</h2>
              <span className="panel-subtitle">Derniers échanges</span>
            </div>
            <div className="messages-thread">
              {messages.map((m, index) => {
                const client = clients.find((c) => c.id === m.clientId)
                const previous = index > 0 ? messages[index - 1] : null
                const newThread = !previous || previous.clientId !== m.clientId

                return (
                  <div key={m.id}>
                    {newThread && (
                      <div className="thread-separator">
                        <span className="thread-title">
                          Conversation avec {client?.firstName} {client?.lastName}
                        </span>
                      </div>
                    )}
                    <div
                      className={`message-bubble ${m.from === 'client' ? 'client' : 'bank'}`}
                    >
                      <div className="message-meta">
                        <span>
                          {m.from === 'client'
                            ? `${client?.firstName} ${client?.lastName}`
                            : 'Conseiller l’Arche'}
                        </span>
                        <span>{m.date}</span>
                      </div>
                      <p>{m.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminSpacePage

