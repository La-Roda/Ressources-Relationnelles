const express = require('express');
const app = express();
const cors = require('cors');

const client = require('./controller/connectionDatabase.js')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const connectionController = require('./controller/connectionController.js');
dotenv.config();


app.use(cors())
app.use('/authentication', connectionController);



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
  if (email === 'test' && password === 'test') {
    login('test', 'test');
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


client.connect((err) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL database:', err);
  } else {
    console.log('Successfully connected to PostgreSQL database');
  }
});

// Utilisation de la connexion pour exécuter une requête


function login(email, password) {
  const query = "SELECT * FROM public.users WHERE login = '$1' AND password = '$2';";
  const params = [email, password];
  client.query(query, params, (err, res) => {
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