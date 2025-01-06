# EcoTrack

**EcoTrack** est une application construite avec Next.js qui extrait des fichiers JSON générés par Lighthouse pour présenter des données de performance web sous forme de graphiques évolutifs. L'application calcule également un éco-score basé sur les résultats de Lighthouse et valide l'adhérence aux bonnes pratiques définies dans un référentiel spécifique de France Travail.

## Fonctionnalités Principales

- **Analyse de Performance :** Importez des fichiers JSON issus de Lighthouse et visualisez les résultats sous forme de graphiques interactifs.
- **Évolution des Métriques :** Suivez l'évolution des métriques de performance web au fil du temps.
- **Éco-score :** Évaluez l'impact écologique de votre site web grâce à notre système de notation innovant.
- **Validation des Bonnes Pratiques :** Vérifiez si votre site respecte les standards de qualité définis par le référentiel de France Travail.
- **Interface Intuitive :** Naviguez facilement dans vos données à l'aide d'une interface utilisateur réactive construite avec React.

## Prérequis

- Node.js
- npm
- Créer un bucket S3 sur AWS

**Note:** Pour utiliser un autre systeme de stockage qu'un bucket S3 d'AWS, il faut créer une classe qui implémente les interfaces de `lib/folder-services/interfaces.ts` et modifier le fichier `lib/folder-services/factories.ts` pour que la factory retourne votre classe.

## Installation

1. Clonez le dépôt : `git clone https://github.com/AlexTraveylan/EcoTrack.git`
2. Accédez au dossier du projet : `cd EcoTrack`
3. Créez un fichier `.env.local` à la racine du projet et ajoutez les variables d'environnement suivantes :

```
S3_REGION=<REGION_DE_VOTRE_BUCKET_S3>
S3_ENDPOINT=<ENDPOINT_DE_VOTRE_BUCKET_S3>
S3_ACCES_KEY_ID=<ID_DE_VOTRE_ACCES_KEY_S3>
S3_SECRET_ACCESS_KEY=<CLEF_SECRETE_DE_VOTRE_ACCES_S3>
S3_BUCKET_NAME=<NOM_DE_VOTRE_BUCKET_S3>
BASE_URL=<DOMAINE_DE_VOTRE_APPLICATION>
FILE_EXTRACT_STRATEGY=<Au choix: public-folder | s3-bucket >
```

4. Installez les dépendances : `npm install`
5. Lancez l'application : `npm run dev`

## Récupérer automatiquement un json avec lighthouse

Un exemple d'utilisation serait celui la

```bash
npm i -g lighthouse
lighthouse https://www.francetravail.fr/accueil/ --output="json" --output-path=".\public\home-page\accueil\4.json" --only-categories="performance" --chrome-flags="--headless" --preset="desktop"
```

## Comment Contribuer

Nous accueillons chaleureusement les contributions ! Veuillez consulter notre [guide de contribution](CONTRIBUTING.md) pour des informations sur la façon de soumettre des pull requests, signaler des problèmes, ou proposer de nouvelles fonctionnalités.

## Licence

Ce projet est sous licence [MIT](LICENSE).

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir un problème sur ce dépôt ou à nous contacter par mail à timothee.demares@gmail.com.
