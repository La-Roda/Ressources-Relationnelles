const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Route pour supprimer un article
app.delete('/articles/:id', (req, res) => {
    // Récupération de l'ID de l'article à supprimer
    const id = parseInt(req.params.id);

    //TODO: INSERT dans la table archive
    //DELETE sur la table cible (article OU comment)

    // Réponse de la requête avec un message de confirmation
    res.send('Post supprimé avec succès.');
});
