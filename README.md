# SuperShop - E-commerce Frontend

## 📝 Description

SuperShop est une application e-commerce développée avec Next.js et Material-UI. Elle permet aux
utilisateurs de parcourir des produits, les filtrer par catégorie, gérer un panier d'achats et une
liste de souhaits.

## 🚀 Fonctionnalités

- Navigation et filtrage des produits par catégorie
- Gestion du panier d'achats
- Liste de souhaits
- Système de notifications
- Interface responsive
- Gestion d'état avec Context API
- Persistance des données dans le localStorage

## 🛠 Technologies Utilisées

- React 17
- Next.js 12
- Material-UI
- Context API pour la gestion d'état
- Local Storage pour la persistance

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/technical-test-front.git

# Accéder au dossier
cd technical-test-front

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour la production
npm run build

# Lancer en production
npm start
```

## 🔄 Améliorations Proposées

### 1. Migration Technologique

- **Passage à pnpm**: Remplacer npm par pnpm pour une meilleure gestion des dépendances et des
  performances d'installation
- **Mise à jour vers Next.js 15**: Bénéficier des dernières fonctionnalités et améliorations de
  performances
- **Migration vers TypeScript**: Améliorer la maintenabilité et la sécurité du code
- **Remplacement de Material-UI par Tailwind CSS**: Réduire la taille du bundle et améliorer les
  performances

### 2. Optimisations de Performance

Actuellement, le score Lighthouse est de 38/100. Voici les améliorations proposées :

- Implémentation du code splitting
- Optimisation des images avec next/image
- Lazy loading des composants non critiques
- Réduction de la taille du bundle JavaScript
- Mise en place d'une stratégie de cache efficace
- Optimisation des Contexts React pour éviter les re-renders inutiles

### 3. Qualité du Code

- Mise en place de tests unitaires avec Jest et React Testing Library
- Intégration de tests E2E avec Cypress
- Configuration de Storybook pour la documentation des composants
- Ajout d'ESLint et Prettier avec des règles strictes
- Mise en place de Husky pour les pre-commit hooks

### 4. Architecture et Organisation

- Restructuration en architecture modulaire
- Implémentation du pattern Container/Presenter
- Séparation claire des responsabilités (services, hooks, utils)
- Documentation approfondie avec JSDoc

## 📋 Guide de Migration Recommandé

1. **Migration vers pnpm**:

```bash
# Installer pnpm
npm install -g pnpm

# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Installer avec pnpm
pnpm install
```

2. **Migration vers Tailwind CSS**:

```bash
# Installer Tailwind
pnpm add tailwindcss postcss autoprefixer

# Initialiser Tailwind
npx tailwindcss init -p
```

3. **Mise à jour vers Next.js 14**:

```bash
pnpm add next@latest react@latest react-dom@latest
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 License

MIT

## 🔍 Notes de Performance Actuelles

- First Contentful Paint: 0.5s
- Largest Contentful Paint: 8.6s
- Total Blocking Time: 2,920ms
- Speed Index: 2.8s
- JavaScript execution time: 3.3s
- Bundle size: 6,666 KiB

Ces métriques indiquent un besoin urgent d'optimisation, particulièrement au niveau du chargement
initial et de l'exécution JavaScript.
