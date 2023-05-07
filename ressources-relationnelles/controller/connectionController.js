const client = require('./connectionDatabase');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Users = require('../model/users.js');

app.use(bodyParser.json());

module.exports = 
    app.post('/login', async (req, res) => {
        // Recherche de l'utilisateur correspondant à l'adresse email
        const query = `SELECT * FROM users WHERE lower(email) = lower($1);`;
        const params = [req.body.email];

        client.query(query, params).then(result => {
            const user_json = result.rows[0];
            try{
                // Essai d'encapsulation
                const user_obj = new Users(user_json.id, user_json.firstname, user_json.lastname, user_json.username, user_json.email, user_json.password, user_json.permissions_level, user_json.birthday, user_json.sex);

                // Vérification du mot de passe
                const isPasswordValid = user_obj.checkPassword(req.body.password);
                if (!isPasswordValid) {
                    throw "incorrect_pass"
                }
                res.json(user_obj.toJSON());

            }catch(e){
                return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect.');
            }
        }).catch(err => {
            console.error('Failed to execute query:', err);
        }).finally(() => {
            //
        });
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

