
const client = require('./connectionDatabase')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// Tableau pour stocker les utilisateurs créés
const users = [];
module.exports = 
    app.post('/login', async (req, res) => {
        // Récupération des données envoyées dans la requête POST
    
        // Recherche de l'utilisateur correspondant à l'adresse email
        const query = "SELECT * FROM public.users WHERE email = $1 AND pwd = $2;";
        const params = [req.body.email, req.body.password];
        const user = client.query(query, params, (err, res) => {
          if (err) {
            console.error('Failed to execute query:', err);
          } else {
            
          }
        });

    
        if (user == []) {
        return res.status(404).send('Utilisateur non trouvé.');
        } else {
            res.json({
                message: 'Login successful',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
              });
        }

        
    
        // Vérification du mot de passe
        const isPasswordValid = await user.checkPassword(password);
        if (!isPasswordValid) {
        return res.status(401).send('Mot de passe incorrect.');
        }
    
        // Réponse de la requête avec l'utilisateur connecté (sans le mot de passe)
        res.json(user.toJSON());
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

