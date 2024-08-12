
# InnovShop Backend

## Description

Ce projet représente la partie backend de l'application InnovShop, une plateforme e-commerce spécialisée dans la vente de produits technologiques innovants. Le backend est développé en Node.js avec Express et utilise MongoDB comme base de données.

## Fonctionnalités

- Authentification des utilisateurs (inscription, connexion, gestion des rôles)
- Gestion des produits (ajout, modification, suppression, affichage)
- Gestion des catégories de produits
- Gestion des paniers (ajout d'articles, suppression d'articles, sauvegarde du panier)
- Gestion des commandes
- Gestion des adresses utilisateurs
- Gestion des rôles et permissions des utilisateurs (admin, employé, utilisateur)

## Prérequis

- Node.js v22.4.1 ou supérieur
- MongoDB (Atlas ou local)
- Yarn

## Installation

1. Clonez le dépôt :
   ```
   git clone https://github.com/PouliSG/InnovShop.git
   ```

2. Accédez au dossier backend :
   ```
   cd InnovShop/backend
   ```

3. Installez les dépendances :
   ```
   yarn install
   ```

4. Créez un fichier `.env` à la racine du dossier backend et ajoutez-y les variables d'environnement suivantes :
   ```
   PORT=5000
   MONGO_URI=<votre_URI_MongoDB>
   JWT_SECRET=<votre_clé_secrète_JWT>
   ```

5. Lancez le serveur :
   ```
   yarn start
   ```

## Structure du Projet

- **models/** : Contient les modèles Mongoose pour MongoDB.
- **controllers/** : Contient les logiques métiers pour chaque fonctionnalité.
- **routes/** : Contient les routes pour chaque entité de l'application (produits, utilisateurs, commandes, etc.).
- **middlewares/** : Contient les middlewares pour la gestion des authentifications, des autorisations, etc.
- **config/** : Contient les fichiers de configuration comme la connexion à la base de données.

## Utilisation

Le backend de l'application peut être utilisé pour gérer les utilisateurs, les produits, les commandes, etc., via des requêtes API. Les routes sont définies dans le dossier `routes`.

## Tests

Des tests unitaires seront bientôt disponibles pour vérifier la validité des différentes fonctionnalités.

## Contribuer

Les contributions sont les bienvenues. Pour contribuer, veuillez forker le dépôt, créer une branche pour votre fonctionnalité ou correction de bug, puis soumettre une pull request.
