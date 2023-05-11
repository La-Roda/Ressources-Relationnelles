const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const client = require('./connectionDatabase');
const logger = require('../pkg/logger/logger.js')


// Configuration du middleware body-parser pour traiter les données POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports =
    app.get('/get', (req, res) => {
	logger.Applog("d: recuperation des articles");
        const select_query = "SELECT article.id, title, field, users.username FROM article INNER JOIN users ON article.id_users = users.id;";
        client.query(select_query)
            .then(select_result => {
                res.json(select_result.rows);
            })
            .catch(err => {
                logger.Applog("E: Echec d'éxecution de la requếte: ", err);
                return res.status(401).send("Erreur côté serveur.")
            })
	logger.Applog("u: articles récupérés");
    });

// Route pour récupérer tous les articles aimés
app.get('/getlikes', (req, res) => {
    const { id_user } = req.query
    logger.Applog("d: recupération des articles likés par l'utilisateur numéro ", id_user);
    const select_query = "SELECT article.id FROM article INNER JOIN likes ON article.id = likes.id_article WHERE likes.id_users = $1;";
    const params = [id_user]
    client.query(select_query, params)
        .then(select_result => {
            res.json(select_result.rows);
        })
	.catch(err => {
            logger.Applog("E: Echec d'éxecution de la requếte: ", err);
            return res.status(401).send("Erreur côté serveur.")
        })
    logger.Applog("u: likes de l'utilisateur numéro ", id_user, " récupérés");
});

// Route pour récupérer tous les articles de l'utilisateur
app.get('/myposts', (req, res) => {
    const { id_user } = req.query
    logger.Applog("d: recupération des articles mis en ligne par l'utilisateur numéro ", id_user);
    const select_query = "SELECT article.id, title, field, users.username FROM article INNER JOIN users ON article.id_users = users.id WHERE id_users = $1;";
    const params = [id_user]
    client.query(select_query, params)
        .then(select_result => {
            res.json(select_result.rows);
        })
        .catch(err => {
            logger.Applog("E: Echec d'éxecution de la requếte: ", err);
            return res.status(401).send("Erreur côté serveur.")
        })
     logger.Applog("u: articles mis en ligne par l'utilisateur numéro ", id_user, " récupérés");
});

//route pour créer un article
app.post('/create', (req, res) => {
    // Récupération des données envoyées dans la requête POST
    const { id, title, description } = req.body;
    logger.Applog("d: création d'un article par l'utilisateur numéro ", id);
    const insert_query = "INSERT INTO article(id_users, title, field, post_date) VALUES($1, $2, $3, to_timestamp($4 / 1000.0)) RETURNING *";
    const insert_params = [id, title, description, Date.now()]
    client.query(insert_query, insert_params)
        .then(insert_result => {
            res.json(console.log(insert_result.rows));
        })
        .catch(err => {
            logger.Applog("E: Echec d'éxecution de la requếte: ", err);
            return res.status(401).send("Erreur côté serveur.")
        })
    logger.Applog("u: nouvel article mis en ligne par l'utilisateur numéro ", id_user);
});

//route pour supprimer l'un de ses articles
app.post('/delete', (req, res) => {
    // Récupération de l'ID de l'article à supprimer
    const { id_post } = req.body;
    const archive_query = "INSERT INTO archives (id_users, title, field, post_date, archiving_date) VALUES ((SELECT id_users, title, field, post_date  FROM article WHERE id = $1), $2)";
    const delete_query = "DELETE FROM article WHERE id = $1";
    const date = Date.now();

    logger.Applog("d: tentative de suppression de l'article numéro ", id_post)
    client.query(archive_query, [id_post], date)
        .then(archive_result => {
	    logger.Applog("d: article numéro ", id_post, "copié dans la table archives avec succès");
	    //suppression
            client.query(delete_query, [id_post])
		.then(delete_result => {
		    res.send('Post supprimé avec succès.');
		})
		.catch(err => {
		    logger.Applog("E: Echec d'éxecution de la requếte: ", err);
		    return res.status(401).send("Erreur côté serveur.")
		});
        })
        .catch(err => {
            logger.Applog("E: Echec d'éxecution de la requếte: ", err);
            return res.status(401).send("Erreur côté serveur.")
        });
    logger.Applog("u: article numéro ", id_post, " supprimé avec succès");
});

//route de modificaton d'un article
app.put('/update', (req, res) => {
    // Récupération de l'ID de l'article à modifier
    const { id_user, id_post, title, field } = req.body;
    const update_query = "UPDATE article SET id_users=$1 , title = $2, field = $3 WHERE id = $4 RETURNING *";
    const update_params = [id_user, title, field, id_post];

    logger.Applog("d: tentative de modification de l'article numéro ", id_post, "par l'utilisateur numéro ", id_user);
    client.query(update_query, update_params)
        .then(update_result => {
            res.json(update_result.rows[0]);
        })
        .catch(err => {
            logger.Applog("E: Echec d'éxecution de la requếte: ", err);
            return res.status(401).send("Erreur côté serveur.")
        });
    logger.Applog("u: article numéro ", id_post, " modifié avec succès");
});

//route pour like un article
app.post('/like', (req, res) => {
    const { id_post, id_user } = req.body;
    const insert_query = "INSERT INTO likes(id_users, id_article, like_date, likesType) VALUES($1, $2, to_timestamp($3 / 1000.0), $4) RETURNING *";
    const insert_params = [id_user, id_post, Date.now(), '1']

    logger.Applog("d: like de l'article numéro ", id_post, " par l'utilisateur numéro ", id_user);
    client.query(insert_query, insert_params)
        .then(insert_result => {
            res.json(insert_result.rows[0]);
        })
        .catch(err => {
            logger.Applog("E: Echec d'éxecution de la requếte: ", err);
            return res.status(401).send("Erreur côté serveur.")
        });
    logger.Applog("d: article numéro ", id_post, " liké par l'utilisateur numéro ", id_user, " avec succès");
});

//route pour dislike un article
app.post('/dislike', (req, res) => {
    const { id_post, id_user } = req.body;
    const insert_query = "DELETE FROM likes WHERE id_users = $1 AND id_article = $2";
    const insert_params = [id_user, id_post]

    logger.Applog("d: dislike de l'article numéro ", id_post, " par l'utilisateur numéro ", id_user);
    client.query(insert_query, insert_params)
        .then(insert_result => {
            res.json(insert_result.rows[0]);
        })
        .catch(err => {
            logger.Applog("E: Echec d'éxecution de la requếte: ", err);
            return res.status(401).send("Erreur côté serveur.")
        });
    logger.Applog("d: article numéro ", id_post, " disliké par l'utilisateur numéro ", id_user, " avec succès");
});
