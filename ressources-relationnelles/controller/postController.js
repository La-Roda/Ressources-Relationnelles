const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const client = require('./connectionDatabase');


// Configuration du middleware body-parser pour traiter les données POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tableau pour stocker les articles créés
const articles = [];
module.exports = 
app.get('/get', (req, res) => {
    
});
    app.post('/create', (req, res) => {
        // Récupération des données envoyées dans la requête POST
        const { id_users, title, field } = req.body;
        const insert_query = "INSERT INTO article(id, id_users, title, field, post_date) VALUES($1, $2, $3, $4, to_timestamp($5 / 1000.0)) RETURNING *";
        const insert_params = ['1', req.body.id, req.body.title, req.body.description, Date.now()]
        //TODO: Insert dans la table article
        client.query(insert_query, insert_params).then(insert_result => {

            res.json(console.log(insert_result));
        }).catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        })
        // Réponse de la requête avec le nouvel article créé
        //res.json(newArticle);
    });
    app.delete('/delete', (req, res) => {
        // Récupération de l'ID de l'article à supprimer
        const id = parseInt(req.params.id);
    
        //TODO: INSERT dans la table archive
        //DELETE sur la table cible (article OU comment)
    
        // Réponse de la requête avec un message de confirmation
        res.send('Post supprimé avec succès.');
    });
    app.put('/update', (req, res) => {
        // Récupération de l'ID de l'article à modifier
        const id = parseInt(req.params.id);
    
        //TODO: UPDATE sur la table cible (article OU comment)
    
        // Réponse de la requête avec l'article mis à jour
        res.json(article);
    });
        

// Route pour créer un nouvel article
