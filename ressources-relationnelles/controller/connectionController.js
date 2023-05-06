const client = require('./connectionDatabase');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Users = require('../model/users.js');

app.use(bodyParser.json());
// Tableau pour stocker les utilisateurs créés
const users = [];
module.exports = 
    app.post('/login', async (req, res) => {
        // Récupération des données envoyées dans la requête POST

        // Recherche de l'utilisateur correspondant à l'adresse email
        const query = `SELECT * FROM users WHERE lower(email) = lower($1);`;
        const params = [req.body.email];

        client.query(query, params).then(result => {
            console.log(result.rows[0]);
            const user_obj = new Users(result.rows[0]);

            // Vérification du mot de passe
            const isPasswordValid = user_obj.checkPassword(req.body.password);
            if (!isPasswordValid) {
                return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect.');
            }

            res.json(user_obj.toJSON());

        }).catch(err => {
            console.error('Failed to execute query:', err);
        }).finally(() => {
            //
        });
        
        
        /*
        // Réponse de la requête avec l'utilisateur connecté (sans le mot de passe)
        res.json(user.toJSON());
        if (user == []) {
        return res.status(404).send('Utilisateur non trouvé.');
        } else {
            res.json({
                message: 'Login successful',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
              });
        }*/

    });



app.post('/register', async (req, res) => {
    // Récupération des données envoyées dans la requête POST
    const { firstName, lastName, username, email, password } = req.body;

    // Vérification du format du mot de passe
    const passwordRegex = "/^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]/).{12,}$/";
    if (!passwordRegex.test(password)) {
	return res.status(400).send('Le mot de passe doit contenir au moins 12 caractères avec 2 majuscules, 2 chiffres et un caractère spécial.');
    }

    // Hashage du mot de passe
    const hashedPassword = await User.hashPassword(password);

    // Création d'un nouvel utilisateur
    const newUser = new User(Date.now(), firstName, lastName, username, email, hashedPassword);

    // Ajout de l'utilisateur au tableau
    users.push(newUser);

    // Réponse de la requête avec le nouvel utilisateur créé (sans le mot de passe)
    res.json(newUser.toJSON());
});


// Route pour se connecter

