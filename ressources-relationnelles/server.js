const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config();

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/customers', (req, res) => {
    res.send({
        'methode': 'test',
        'login': 'vue'
    });
});
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are valid
  if (email === 'user@example.com' && password === 'password123') {
    login('adrien', 'la_pute');
    // Return a success message and a token
    res.json({
      message: 'Login successful',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    });
  } else {
    // Return an error message
    res.status(401).json({
      message: 'Invalid email or password'
    });
  }
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

client.connect((err) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL database:', err);
  } else {
    console.log('Successfully connected to PostgreSQL database');
  }
});

// Utilisation de la connexion pour exécuter une requête


function login(email, password) {
    console.log("test")
    client.query('SELECT * FROM public.users WHERE login = \''+email+'\' AND password = \''+password+'\';', (err, res) => {
        if (err) {
          console.error('Failed to execute query:', err);
        } else {
          console.log(res.rows);
        }
      });
}
// Fermeture de la connexion
// client.end((err) => {
//   if (err) {
//     console.error('Failed to close PostgreSQL database connection:', err);
//   } else {
//     console.log('Successfully closed PostgreSQL database connection');
//   }
// });