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
        const select_query = "SELECT article.id, title, field, users.username FROM article INNER JOIN users ON article.id_users = users.id;";
        client.query(select_query)
            .then(select_result => {
                res.json(select_result.rows);
            })
            .catch(err => {
                console.error('Failed to execute query:', err);
                return res.status(401).send("Erreur côté serveur.")
            })
    });

// Route pour récupérer tous les articles
app.get('/getlikes', (req, res) => {
    const { id_user } = req.query
    console.log(id_user)
    const select_query = "SELECT article.id FROM article INNER JOIN likes ON article.id = likes.id_article WHERE likes.id_users = $1;";
    const params = [id_user]
    client.query(select_query, params)
        .then(select_result => {
            res.json(select_result.rows);
        })
});

// Route pour récupérer tous les articles aimés
app.get('/myposts', (req, res) => {
    const { id_user } = req.query
    console.log(id_user)
    const select_query = "SELECT article.id, title, field, users.username FROM article INNER JOIN users ON article.id_users = users.id WHERE id_users = $1;";
    const params = [id_user]
    client.query(select_query, params)
        .then(select_result => {
            res.json(select_result.rows);
        })
        .catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        })
});
app.post('/create', (req, res) => {
    // Récupération des données envoyées dans la requête POST
    const { id, title, description } = req.body;
    const insert_query = "INSERT INTO article(id_users, title, field, post_date) VALUES($1, $2, $3, to_timestamp($4 / 1000.0)) RETURNING *";
    const insert_params = [id, title, description, Date.now()]
    //TODO: Insert dans la table article
    client.query(insert_query, insert_params)
        .then(insert_result => {
            res.json(console.log(insert_result.rows));
        })
        .catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        })
    // Réponse de la requête avec le nouvel article créé
    //res.json(newArticle);
});
app.post('/delete', (req, res) => {
    // Récupération de l'ID de l'article à supprimer

    const { id_post } = req.body;

    // TODO: INSERT dans la table archive
    const archive_query = "INSERT INTO archives SELECT * FROM article WHERE id = $1";
    const delete_query = "DELETE FROM article WHERE id = $1";

    client.query(delete_query, [id_post])
        .then(() => {
            // TODO: DELETE sur la table article
            // const delete_query = "DELETE FROM article WHERE id = $1";
            // return client.query(delete_query, [id_post]);
        })
        .then(() => {
            res.send('Post supprimé avec succès.');
        })
        .catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        });
});
app.put('/update', (req, res) => {
    // Récupération de l'ID de l'article à modifier

    const { id_user, id_post, title, field } = req.body;

    // TODO: UPDATE sur la table article
    const update_query = "UPDATE article SET id_users=$1 , title = $2, field = $3 WHERE id = $4 RETURNING *";
    const update_params = [id_user, title, field, id_post];
    client.query(update_query, update_params)
        .then(update_result => {
            res.json(update_result.rows[0]);
        })
        .catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        });
});
app.post('/like', (req, res) => {
    const { id_post, id_user } = req.body;

    const insert_query = "INSERT INTO likes(id_users, id_article, like_date, likesType) VALUES($1, $2, to_timestamp($3 / 1000.0), $4) RETURNING *";
    const insert_params = [id_user, id_post, Date.now(), '1']

    client.query(insert_query, insert_params)
        .then(insert_result => {
            res.json(insert_result.rows[0]);
        })
        .catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        });
});
app.post('/dislike', (req, res) => {
    const { id_post, id_user } = req.body;

    const insert_query = "DELETE FROM likes WHERE id_users = $1 AND id_article = $2";
    const insert_params = [id_user, id_post]

    client.query(insert_query, insert_params)
        .then(insert_result => {
            res.json(insert_result.rows[0]);
        })
        .catch(err => {
            console.error('Failed to execute query:', err);
            return res.status(401).send("Erreur côté serveur.")
        });
});


// Route pour créer un nouvel article
