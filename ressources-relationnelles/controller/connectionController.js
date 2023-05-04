const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

// Configuration du middleware body-parser pour traiter les données POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tableau pour stocker les utilisateurs créés
const users = [];

// Route pour s'inscrire
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
app.post('/login', async (req, res) => {
    // Récupération des données envoyées dans la requête POST
    const { email, password } = req.body;

    // Recherche de l'utilisateur correspondant à l'adresse email
    const user = users.find(u => u.email === email);

    if (!user) {
	return res.status(404).send('Utilisateur non trouvé.');
    }

    // Vérification du mot de passe
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
	return res.status(401).send('Mot de passe incorrect.');
    }

    // Réponse de la requête avec l'utilisateur connecté (sans le mot de passe)
    res.json(user.toJSON());
});
