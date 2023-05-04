const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Route pour supprimer un article
app.delete('/articles/:id', (req, res) => {
  // Récupération de l'ID de l'article à supprimer
  const id = parseInt(req.params.id);

  // Recherche de l'article correspondant dans le tableau
  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    // Article non trouvé, renvoie une erreur 404
    return res.status(404).send('Article non trouvé.');
  }

  // Suppression de l'article du tableau
  articles.splice(index, 1);

  // Réponse de la requête avec un message de confirmation
  res.send('Article supprimé avec succès.');
});
