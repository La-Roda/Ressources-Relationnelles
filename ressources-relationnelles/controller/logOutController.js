const express = require('express');

const app = express();

// Middleware pour vérifier si l'utilisateur est connecté
const isAuthenticated = (req, res, next) => {
    logger.Applog("V: vérification si l'utilisateur est connecté");
    if (req.session && req.session.user) {
	logger.Applog("V: utilisateur connecté");
	return next();
    }

    logger.Applog("W: utilisateur non connecté")
    return res.status(401).send('Non autorisé');
};

// Route pour se déconnecter
app.post('/logout', isAuthenticated, (req, res) => {
    logger.Applog("d: déconnexion de la session")
    // Suppression de l'utilisateur de la session
    req.session.destroy(err => {
	if (err) {
	    logger.Applog("E: déconnexion échouée: ", err);
	    return res.status(500).send('Erreur de déconnexion');
	}

	logger.Applog("u: déconnecté avec succès");
	res.send('Déconnecté');
    });
});
