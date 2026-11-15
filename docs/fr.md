# Électricité de Strasbourg

Les offres vertes à prix fixe d'ÉS (Électricité de Strasbourg) pour le suivi de l'énergie de Gladys : Base,
Heures Creuses et les options Week-end, avec ou sans l'option 100 % régionale.

## Ce que fait l'intégration

Elle ajoute huit modèles de contrat à l'assistant de création de contrat de Gladys, et fournit à Gladys
les jours fériés nationaux, dont les options Week-end ont besoin. Gladys calcule ensuite le coût de votre
consommation tout seul, à partir du compteur que vous suivez déjà (Linky, TIC, pince ampèremétrique…).

L'intégration ne se connecte à rien : ni à votre Espace client ÉS, ni à Internet. Il n'y a aucun
identifiant à saisir.

## Les contrats proposés

| Modèle dans Gladys                                              | Contrat ÉS                                               | Prix du kWh           |
| --------------------------------------------------------------- | -------------------------------------------------------- | --------------------- |
| ÉS Offre verte prix fixe 1 an – Base                            | Offre verte à prix fixe 1 an                             | Ceux de votre contrat |
| ÉS Offre verte prix fixe 1 an – Heures Creuses                  | Offre verte à prix fixe 1 an                             | Ceux de votre contrat |
| ÉS Offre verte prix fixe 1 an – Week-end                        | Offre verte, option Week-end Base                        | Ceux de votre contrat |
| ÉS Offre verte prix fixe 1 an – Week-end + Heures Creuses       | Offre verte, option Week-end et Heures Creuses           | Ceux de votre contrat |
| ÉS Offre verte 100 % régionale 1 an – Base                      | Offre électricité verte 100 % régionale                  | Ceux de votre contrat |
| ÉS Offre verte 100 % régionale 1 an – Heures Creuses            | Offre électricité verte 100 % régionale                  | Ceux de votre contrat |
| ÉS Offre verte 100 % régionale 1 an – Week-end                  | Offre 100 % régionale, option Week-end Base              | Ceux de votre contrat |
| ÉS Offre verte 100 % régionale 1 an – Week-end + Heures Creuses | Offre 100 % régionale, option Week-end et Heures Creuses | Ceux de votre contrat |

Le nom de votre contrat et son option figurent au recto de votre facture ÉS, rubrique « option
tarifaire ».

**Vous êtes au Tarif Bleu (tarif réglementé) ?** Il n'est pas dans cette intégration : choisissez les
modèles « Électricité de Strasbourg » du catalogue communautaire de Gladys, dans le même assistant. Ils
existent pour chaque puissance, avec l'historique des prix.

Les offres réservées aux professionnels ne sont pas couvertes.

## Créer un contrat

1. Ouvrez **Intégrations → Suivi de l'énergie → Contrats** et créez un contrat pour votre compteur.
2. Choisissez le modèle « ÉS » qui correspond à votre facture.
3. Vérifiez les valeurs proposées :
   - **Abonnement mensuel** : il est pré-rempli pour 6 kVA. La
     grille par puissance est rappelée sous le champ : saisissez le montant de la vôtre.
   - **Heures creuses** : celles de votre compteur, fixées par Strasbourg Électricité Réseaux (8 heures
     par jour, souvent de 22 h à 6 h). Elles sont sur votre facture.
   - **Prix du kWh** : ces offres sont à prix fixe pendant un an à partir de
     votre souscription. Les champs sont pré-remplis avec la grille en cours : remplacez-les par les
     prix de votre contrat s'ils sont différents.
4. Choisissez la date de début du contrat, regardez l'aperçu, enregistrez.

Tous les prix sont TTC.

Au renouvellement annuel, ÉS vous communique de nouveaux prix : créez alors un nouveau contrat dans
Gladys à cette date, avec ces prix.

## Les options Week-end et les jours fériés

Avec les options Week-end, le prix réduit s'applique du samedi 0 h au dimanche minuit et les jours
fériés nationaux. Le Vendredi saint et le 26 décembre, fériés en Alsace seulement, sont facturés par ÉS
comme des jours de semaine : l'intégration fait de même.

L'intégration publie ces jours fériés dans le calendrier `holidays-fr` de Gladys. Si une autre
intégration fournit déjà ce calendrier, c'est elle qui le garde et les modèles ÉS lisent ses valeurs.
Vérifiez alors qu'elle ne compte pas les jours fériés d'Alsace-Moselle.

## Sources des prix

- Offres vertes : grilles ÉS du 1er novembre 2026 (INF-1186 et INF-1192).

Les grilles en vigueur sont publiées sur [particuliers.es.fr](https://particuliers.es.fr/electricite-gaz/electricite/choisir-la-bonne-offre-delectricite).

## Mentions légales

Site officiel d'ÉS : [www.es.fr](https://www.es.fr/).

Cette intégration est un projet communautaire indépendant. Elle n'est ni éditée, ni validée, ni
soutenue par ÉS Énergies Strasbourg, Électricité de Strasbourg ou le groupe ÉS, et n'a aucun lien
commercial avec eux. Elle n'est pas non plus un produit officiel de Gladys Assistant.

Les noms « ÉS », « Électricité de Strasbourg » et « ÉS Énergies Strasbourg », ainsi que
le logo ÉS, sont des marques et des éléments graphiques appartenant à leurs propriétaires respectifs.
Ils ne sont utilisés ici que pour désigner le fournisseur et ses contrats, sans intention de laisser
croire à un partenariat. Ils seront retirés à la première demande de leur titulaire.

Les prix sont recopiés des grilles publiées par ÉS, à titre indicatif et sans garantie d'exactitude ni
de mise à jour. Seuls votre contrat et vos factures ÉS font foi : les coûts affichés par Gladys sont
des estimations.
