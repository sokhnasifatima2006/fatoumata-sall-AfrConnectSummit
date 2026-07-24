# AfriConnect Summit 2026 — Site vitrine

**Étudiante :** Sall Fatoumata — L1 DSBD (Data Science & Big Data), UNCHK
**Projet :** Examen Web — site vitrine d'une conférence tech panafricaine fictive

## Description

Site vitrine complet (4 pages) pour « AfriConnect Summit », une conférence tech
panafricaine fictive réunissant développeurs, entrepreneurs et investisseurs.
Design moderne, responsive, dark/light mode, dans un style web épuré 2026.

## Pages

- `index.html` — Accueil (hero + compte à rebours, chiffres clés animés, pourquoi participer, intervenants vedettes, sponsors)
- `programme.html` — Programme (onglets 3 jours, thématiques)
- `intervenants.html` — Intervenants (filtrage dynamique par thématique, 9 fiches)
- `contact.html` — Inscription & Contact (formulaire validé en JS, FAQ en accordéon CSS pur, carte)

## Technologies utilisées

- **HTML5** sémantique (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — variables CSS, Flexbox, Grid, animations, media queries (375px / 768px / 1200px)
- **JavaScript vanilla** — aucun framework, aucune librairie type jQuery
- **Google Fonts** — Space Grotesk (titres) / Inter (texte courant)
- **Bootstrap Icons** (CDN, icônes uniquement — pas de framework CSS Bootstrap)

## Fonctionnalités JavaScript implémentées

1. Dark / Light mode avec sauvegarde `localStorage`, persistant entre les pages
2. Navbar dynamique (changement au scroll + menu hamburger mobile)
3. Animations au scroll via `IntersectionObserver` (fade-in, zoom-in, slide-in)
4. Compte à rebours en temps réel jusqu'au 15 octobre 2026
5. Compteurs animés sur les chiffres clés
6. Onglets du programme (3 jours, sans rechargement)
7. Filtrage dynamique des intervenants par thématique
8. Validation complète du formulaire de contact (regex email, retour visuel par champ)
9. Bouton retour en haut (apparaît après 300px, `scrollTo` smooth)
10. Année dynamique dans le footer (`new Date().getFullYear()`)

## Lien GitHub Pages

 https://sokhnasifatima2006.github.io/fatoumata-sall-AfrConnectSummit/

## Ressources consultées

MDN Web Docs, W3Schools, CSS-Tricks, Google Fonts, Bootstrap Icons, Unsplash (photos libres), Coolors, W3C Validator.