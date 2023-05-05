const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Route pour modifier un article
app.put('/articles/:id', (req, res) => {
    // Récupération de l'ID de l'article à modifier
    const id = parseInt(req.params.id);

    //TODO: UPDATE sur la table cible (article OU comment)

    // Réponse de la requête avec l'article mis à jour
    res.json(article);
});
