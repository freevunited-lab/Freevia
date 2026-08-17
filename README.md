# Freevia

## Organisation des images

Chaque jeu possède son propre dossier dans `images/`, nommé avec le même slug
que son dossier dans `downloads/` :

```
images/
  cyberpunk-2077/
    cover.jpg        → jaquette affichée sur la carte du catalogue
    gallery-01.jpg   → visuels de la galerie (fiche détaillée)
    gallery-02.jpg
    gallery-03.jpg
    gallery-04.jpg
    thumb-01.webp    → miniatures WebP correspondant aux visuels
    thumb-02.webp
    thumb-03.webp
    thumb-04.webp
```

### Ajouter un jeu

1. Créer `images/<slug>/` et y déposer `cover.jpg`, `gallery-01..04.jpg` et
   `thumb-01..04.webp`.
2. Ajouter l'entrée correspondante dans le tableau `games` de `app.js` : la
   carte, la recherche et la collection se mettent à jour automatiquement.
