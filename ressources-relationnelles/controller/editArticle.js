const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Route pour modifier un article
app.put('/articles/:id', (req, res) => {
  // Récupération de l'ID de l'article à modifier
  const id = parseInt(req.params.id);

  // Recherche de l'article correspondant dans le tableau
  const article = articles.find(a => a.id === id);

  if (!article) {
    // Article non trouvé, renvoie une erreur 404
    return res.status(404).send('Article non trouvé.');
  }

  // Mise à jour des données de l'article
  article.title = req.body.title || article.title;
  article.content = req.body.content || article.content;

  // Réponse de la requête avec l'article mis à jour
  res.json(article);
});
