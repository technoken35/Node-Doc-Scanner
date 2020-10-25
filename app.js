const express = require('express');
const app = express();
const port = 8124;

app.get('/', (req, res) => {
  res.send('Hello from node with express framework');
});

app.get('/scanner', (req, res) => {
  res.send('Scanner route');
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
