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
        const select_query = "SELECT title, field, users.username FROM article INNER JOIN users ON article.id_users = users.id;";
        client.query(select_query).then(select_result => {
            res.json(select_result.rows);
        }).catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        })
    });
    app.post('/create', (req, res) => {
        // Récupération des données envoyées dans la requête POST
        const { id_users, title, field } = req.body;
        const insert_query = "INSERT INTO article(id_users, title, field, post_date) VALUES($1, $2, $3, to_timestamp($4 / 1000.0)) RETURNING *";
        const insert_params = [req.body.id, req.body.title, req.body.description, Date.now()]
        //TODO: Insert dans la table article
        client.query(insert_query, insert_params).then(insert_result => {
            res.json(console.log(insert_result.rows));
        }).catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        })
        // Réponse de la requête avec le nouvel article créé
        //res.json(newArticle);
    });
    app.delete('/delete/:id', (req, res) => {
        // Récupération de l'ID de l'article à supprimer
        const id = parseInt(req.params.id);
      
        // TODO: INSERT dans la table archive
        const archive_query = "INSERT INTO archive SELECT * FROM article WHERE id = $1";
        client.query(archive_query, [id])
          .then(() => {
            // TODO: DELETE sur la table article
            const delete_query = "DELETE FROM article WHERE id = $1";
            return client.query(delete_query, [id]);
          })
          .then(() => {
            res.send('Post supprimé avec succès.');
          })
          .catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
          });
      });
      app.put('/update/:id', (req, res) => {
        // Récupération de l'ID de l'article à modifier
        const id = parseInt(req.params.id);
        
        const { title, field } = req.body;
      
        // TODO: UPDATE sur la table article
        const update_query = "UPDATE article SET title = $1, field = $2 WHERE id = $3 RETURNING *";
        const update_params = [title, field, id];
        client.query(update_query, update_params)
          .then(update_result => {
            res.json(update_result.rows[0]);
          })
          .catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
          });
      });
        

// Route pour créer un nouvel article
