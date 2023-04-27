const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/customers', (req, res) => {
    res.send('Liste de mes clients !');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});