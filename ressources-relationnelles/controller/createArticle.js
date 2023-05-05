const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuration du middleware body-parser pour traiter les données POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tableau pour stocker les articles créés
const articles = [];

// Route pour créer un nouvel article
app.post('/articles', (req, res) => {
    // Récupération des données envoyées dans la requête POST
    const { id_users, title, field } = req.body;

    //TODO: Insert dans la table article

    // Réponse de la requête avec le nouvel article créé
    res.json(newArticle);
});
