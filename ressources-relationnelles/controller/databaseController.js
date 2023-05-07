const { Pool } = require('pg');

function getDB() {
  // Configuration de la connexion à la base de données ressourcesRelationnelles
  const pool = new Pool({
    user: 'www-data',
    host: 'localhost',
    database: 'ressourcesRelationnelles',
    password: '',
    port: 5432,
  });

  // Test de la connexion
  pool.connect((err, client, done) => {
    if (err) throw err;
    console.log('Connecté avec succès à la base de données PostgreSQL');
    done();
  });

  return pool;
}

module.exports = connectToDatabase;

