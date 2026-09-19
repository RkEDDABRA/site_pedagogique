# Cours Biologie cellulaire — Laboratoire S1

## Objectif
Créer la page complète du chapitre à partir du document fourni, sans modifier les cours déjà présents.

## Mise en œuvre
- Extraire le texte, les figures et les tableaux du document Word dans leur ordre d’origine.
- Créer une page dédiée « Biologie cellulaire » reliée au cours Laboratoire et protégée par le code existant `BC2026`.
- Reproduire les titres, sous-titres, légendes, listes et tableaux sans résumé ni réorganisation.
- Placer chaque figure à son emplacement source, en pleine largeur lisible, avec agrandissement plein écran et texte alternatif.
- Ajouter un sommaire fixe, des liens d’ancrage, un défilement doux et le suivi automatique de la section active.
- Conserver les autres onglets et cours existants sans changement de contenu.

## Détails techniques
- Nouvelle route : `/laboratoire/biologie-cellulaire`.
- Images extraites du DOCX et enregistrées comme ressources locales du cours, sans compression supplémentaire.
- Tableaux HTML accessibles avec légendes, en-têtes et défilement horizontal sur petits écrans.
- Contrôle visuel aux largeurs 375, 768 et 1440 px, puis comparaison section par section avec le document.
