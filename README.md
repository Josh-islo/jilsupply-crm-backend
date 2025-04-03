# JIL SUPPLY CRM - Backend

Backend API pour le système CRM JIL SUPPLY GABON développé avec Node.js, Express et MongoDB.

## Fonctionnalités

- Authentification et autorisation avec JWT
- Gestion des clients
- Gestion des commandes
- Facturation
- Comptabilité OHADA
- API RESTful

## Technologies

- Node.js
- Express.js
- MongoDB avec Mongoose
- JSON Web Tokens (JWT)
- bcryptjs pour le hachage de mots de passe

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Josh-islo/jilsupply-crm-backend.git

# Naviguer dans le dossier du projet
cd jilsupply-crm-backend

# Installer les dépendances
npm install

# Créer un fichier .env basé sur .env.example
cp .env.example .env

# Modifier le fichier .env avec vos configurations
```

## Utilisation

```bash
# Lancer en mode développement
npm run dev

# Lancer en production
npm start

# Initialiser la base de données avec des données de test
npm run seed

# Supprimer toutes les données
npm run seed:delete
```

## Structure du Projet

```
jilsupply-crm-backend/
├── config/              # Configuration (BDD, JWT, etc.)
│   └── db.js
├── controllers/         # Logique métier
│   ├── authController.js
│   ├── clientController.js
│   ├── orderController.js
│   └── invoiceController.js
├── middleware/          # Middleware personnalisés
│   ├── auth.js
│   └── errorHandler.js
├── models/              # Modèles MongoDB
│   ├── User.js
│   ├── Client.js
│   ├── Order.js
│   └── Invoice.js
├── routes/              # Routes API
│   ├── authRoutes.js
│   ├── clientRoutes.js
│   ├── orderRoutes.js
│   └── invoiceRoutes.js
├── utils/               # Utilitaires
│   ├── validation.js
│   └── seeder.js
├── .env                 # Variables d'environnement
├── .gitignore           # Fichiers à ignorer
├── app.js               # Configuration Express
├── server.js            # Point d'entrée
└── package.json         # Dépendances
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur
- `GET /api/auth/logout` - Déconnexion

### Clients
- `GET /api/clients` - Liste des clients
- `POST /api/clients` - Créer un client
- `GET /api/clients/:id` - Détails d'un client
- `PUT /api/clients/:id` - Modifier un client
- `DELETE /api/clients/:id` - Supprimer un client

### Commandes
- `GET /api/orders` - Liste des commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders/:id` - Détails d'une commande
- `PUT /api/orders/:id` - Modifier une commande
- `DELETE /api/orders/:id` - Supprimer une commande

### Factures
- `GET /api/invoices` - Liste des factures
- `POST /api/invoices` - Créer une facture
- `GET /api/invoices/:id` - Détails d'une facture
- `PUT /api/invoices/:id` - Modifier une facture
- `DELETE /api/invoices/:id` - Supprimer une facture

## Licence

Ce projet est la propriété de JIL SUPPLY GABON.

## Contact

JIL SUPPLY GABON
- Email: contact@jilsupply.com
- Tel: +241 11 538 784