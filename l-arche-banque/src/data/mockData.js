// Données fictives cohérentes pour la banque "l'Arche"
// Centralise toutes les données pour les espaces client et admin.

export const clients = [
  {
    id: 'c1',
    firstName: 'Alice',
    lastName: 'Dupont',
    email: 'alice.dupont@larche.fr',
    status: 'Solvable',
    riskLevel: 'Faible',
  },
  {
    id: 'c2',
    firstName: 'Karim',
    lastName: 'Benali',
    email: 'karim.benali@larche.fr',
    status: 'Sous surveillance',
    riskLevel: 'Moyen',
  },
]

export const accounts = [
  {
    id: 'a1',
    clientId: 'c1',
    type: 'Compte courant',
    iban: 'FR76 3000 6000 0112 3456 7890 189',
    currency: 'EUR',
    balance: 1520.45,
    overdraftLimit: -500,
  },
  {
    id: 'a2',
    clientId: 'c1',
    type: 'Livret épargne',
    iban: 'FR76 3000 6000 0112 3456 7890 256',
    currency: 'EUR',
    balance: 8200.0,
    overdraftLimit: 0,
  },
  {
    id: 'a3',
    clientId: 'c2',
    type: 'Compte courant',
    iban: 'FR76 3000 6000 0177 8899 0000 321',
    currency: 'EUR',
    balance: -230.5,
    overdraftLimit: -800,
  },
]

export const transactions = [
  {
    id: 't1',
    accountId: 'a1',
    date: '2026-02-20',
    label: 'Salaire - Société NovaTech',
    amount: 2300.0,
  },
  {
    id: 't2',
    accountId: 'a1',
    date: '2026-02-22',
    label: 'Paiement CB - Boulangerie du Port',
    amount: -8.9,
  },
  {
    id: 't3',
    accountId: 'a1',
    date: '2026-02-23',
    label: 'Prélèvement - Abonnement mobile',
    amount: -24.99,
  },
  {
    id: 't4',
    accountId: 'a2',
    date: '2026-02-15',
    label: 'Virement vers livret',
    amount: 300.0,
  },
  {
    id: 't5',
    accountId: 'a3',
    date: '2026-02-21',
    label: 'Paiement CB - Station service',
    amount: -75.5,
  },
]

export const cards = [
  {
    id: 'card1',
    clientId: 'c1',
    label: 'Carte Visa Classic',
    maskedNumber: '**** **** **** 4521',
    expiry: '07/29',
    status: 'active',
  },
  {
    id: 'card2',
    clientId: 'c1',
    label: 'Carte virtuelle e-commerce',
    maskedNumber: '**** **** **** 9914',
    expiry: '01/27',
    status: 'blocked',
  },
  {
    id: 'card3',
    clientId: 'c2',
    label: 'Carte Mastercard Gold',
    maskedNumber: '**** **** **** 3345',
    expiry: '11/28',
    status: 'active',
  },
]

export const invoices = [
  {
    id: 'inv1',
    clientId: 'c1',
    merchant: 'EDF Énergie',
    date: '2026-02-10',
    amount: 89.5,
    status: 'Payée',
    details: 'Facture électricité janvier 2026 - logement principal.',
  },
  {
    id: 'inv2',
    clientId: 'c1',
    merchant: 'Société des Eaux',
    date: '2026-02-05',
    amount: 32.1,
    status: 'En attente',
    details: 'Facture eau janvier 2026 - logement principal.',
  },
  {
    id: 'inv3',
    clientId: 'c2',
    merchant: 'Opérateur Mobile Telia',
    date: '2026-02-08',
    amount: 54.9,
    status: 'Payée',
    details: 'Forfait 5G premium - février 2026.',
  },
]

export const messages = [
  {
    id: 'm1',
    clientId: 'c1',
    from: 'client',
    date: '2026-02-18 09:24',
    content: 'Bonjour, pourriez-vous augmenter temporairement mon plafond de carte pour ce week-end ?',
  },
  {
    id: 'm2',
    clientId: 'c1',
    from: 'bank',
    date: '2026-02-18 10:02',
    content: "Bonjour Alice, bien sûr. Merci de nous indiquer le montant souhaité et la durée.",
  },
  {
    id: 'm3',
    clientId: 'c2',
    from: 'bank',
    date: '2026-02-19 14:15',
    content:
      'Bonjour M. Benali, nous avons détecté plusieurs paiements inhabituels. Merci de confirmer que vous en êtes bien à l’origine.',
  },
  {
    id: 'm4',
    clientId: 'c2',
    from: 'client',
    date: '2026-02-19 15:01',
    content:
      'Bonjour, oui les paiements sur la plateforme AeroTravel sont bien de moi. Merci pour votre vigilance.',
  },
]

