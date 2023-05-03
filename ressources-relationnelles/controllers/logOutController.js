const express = require('express');

const app = express();

// Middleware pour vérifier si l'utilisateur est connecté
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  return res.status(401).send('Non autorisé');
};

// Route pour se déconnecter
app.post('/logout', isAuthenticated, (req, res) => {
  // Suppression de l'utilisateur de la session
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Erreur de déconnexion');
    }

    res.send('Déconnecté');
  });
});
