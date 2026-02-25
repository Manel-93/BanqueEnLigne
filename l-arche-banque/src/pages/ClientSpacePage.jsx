import { useEffect, useMemo, useState } from 'react'
import { accounts, cards, invoices, messages, clients, transactions } from '../data/mockData'
import './ClientSpacePage.css'

// Sélectionne un client fictif par défaut pour la simulation.
const DEFAULT_CLIENT_ID = 'c1'

function ClientSpacePage() {
  const [selectedAccountId, setSelectedAccountId] = useState(null)
  const [localCards, setLocalCards] = useState([])

  const client = useMemo(() => clients.find((c) => c.id === DEFAULT_CLIENT_ID), [])

  useEffect(() => {
    setLocalCards(cards.filter((c) => c.clientId === DEFAULT_CLIENT_ID))
    const firstAccount = accounts.find((a) => a.clientId === DEFAULT_CLIENT_ID)
    setSelectedAccountId(firstAccount?.id ?? null)
  }, [])

  const clientAccounts = useMemo(
    () => accounts.filter((a) => a.clientId === DEFAULT_CLIENT_ID),
    [],
  )

  const currentAccount = useMemo(
    () => clientAccounts.find((a) => a.id === selectedAccountId) ?? clientAccounts[0],
    [clientAccounts, selectedAccountId],
  )

  const currentTransactions = useMemo(
    () => (currentAccount ? transactions.filter((t) => t.accountId === currentAccount.id) : []),
    [currentAccount],
  )

  const clientInvoices = useMemo(
    () => invoices.filter((i) => i.clientId === DEFAULT_CLIENT_ID),
    [],
  )

  const clientMessages = useMemo(
    () => messages.filter((m) => m.clientId === DEFAULT_CLIENT_ID),
    [],
  )

  const isOverdrawn = currentAccount && currentAccount.balance < 0

  const toggleCardStatus = (cardId) => {
    setLocalCards((prev) =>
      prev.map((c) =>
        c.id === cardId ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' } : c,
      ),
    )
  }

  return (
    <div className="client-root">
      <section className="client-header">
        <div>
          <h1>Espace client</h1>
          <p className="client-welcome">
            Bonjour <span>{client?.firstName}</span>, voici une vue synthétique de vos comptes chez
            l’Arche.
          </p>
        </div>
        <div className={`status-pill ${isOverdrawn ? 'negative' : 'positive'}`}>
          <span className="dot" />
          {isOverdrawn ? 'À découvert' : 'Pas à découvert'}
        </div>
      </section>

      <section className="client-grid">
        <div className="panel accounts-panel">
          <div className="panel-header">
            <h2>Comptes bancaires</h2>
            <span className="panel-subtitle">Compte courant & épargne</span>
          </div>

          <div className="accounts-list">
            {clientAccounts.map((account) => (
              <button
                key={account.id}
                type="button"
                className={`account-item${
                  currentAccount && account.id === currentAccount.id ? ' active' : ''
                }`}
                onClick={() => setSelectedAccountId(account.id)}
              >
                <div className="account-type">{account.type}</div>
                <div className="account-iban">{account.iban}</div>
                <div className="account-balance">
                  {account.balance.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: account.currency,
                  })}
                </div>
              </button>
            ))}
          </div>

          {currentAccount && (
            <div className="account-summary">
              <div>
                <span className="label">Devise</span>
                <span>{currentAccount.currency}</span>
              </div>
              <div>
                <span className="label">Découvert autorisé</span>
                <span>
                  {currentAccount.overdraftLimit.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: currentAccount.currency,
                  })}
                </span>
              </div>
            </div>
          )}

          <div className="transactions">
            <h3>Derniers mouvements</h3>
            <ul>
              {currentTransactions.map((t) => (
                <li key={t.id} className={t.amount < 0 ? 'debit' : 'credit'}>
                  <div className="txn-main">
                    <span className="txn-label">{t.label}</span>
                    <span className="txn-amount">
                      {t.amount.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: currentAccount.currency,
                      })}
                    </span>
                  </div>
                  <div className="txn-meta">
                    <span>{new Date(t.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="side-column">
          <div className="panel cards-panel">
            <div className="panel-header">
              <h2>Cartes virtuelles</h2>
              <span className="panel-subtitle">Contrôle temps réel</span>
            </div>
            <ul className="cards-list">
              {localCards.map((card) => (
                <li key={card.id} className={`card-item ${card.status}`}>
                  <div className="card-row">
                    <span className="card-label">{card.label}</span>
                    <span className="card-status-badge">
                      {card.status === 'active' ? 'Active' : 'Bloquée'}
                    </span>
                  </div>
                  <div className="card-row small">
                    <span>{card.maskedNumber}</span>
                    <span>Expire le {card.expiry}</span>
                  </div>
                  <button
                    type="button"
                    className="card-toggle"
                    onClick={() => toggleCardStatus(card.id)}
                  >
                    {card.status === 'active' ? 'Désactiver' : 'Activer'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel invoices-panel">
            <div className="panel-header">
              <h2>Paiements & factures</h2>
              <span className="panel-subtitle">Suivi de vos dépenses</span>
            </div>
            <ul className="invoice-list">
              {clientInvoices.map((inv) => (
                <li key={inv.id} className="invoice-item">
                  <div className="invoice-main">
                    <span className="invoice-merchant">{inv.merchant}</span>
                    <span
                      className={`invoice-status ${
                        inv.status === 'Payée' ? 'paid' : 'pending'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <div className="invoice-meta">
                    <span>{new Date(inv.date).toLocaleDateString('fr-FR')}</span>
                    <span className="invoice-amount">
                      {inv.amount.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                  <p className="invoice-details">{inv.details}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel messages-panel">
            <div className="panel-header">
              <h2>Messagerie sécurisée</h2>
              <span className="panel-subtitle">Client ↔ Banque</span>
            </div>
            <div className="messages-thread">
              {clientMessages.map((m) => (
                <div key={m.id} className={`message-bubble ${m.from === 'client' ? 'client' : 'bank'}`}>
                  <div className="message-meta">
                    <span>{m.from === 'client' ? client?.firstName : 'Conseiller l’Arche'}</span>
                    <span>{m.date}</span>
                  </div>
                  <p>{m.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClientSpacePage

