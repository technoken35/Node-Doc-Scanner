// nodemon restarts server automatically after changes
const express = require('express');
const app = express();
const ipAddress = '127.0.0.1';
const port = 8124;
var cors = require('cors');
var bodyParser = require('body-parser');

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: './gcp/APIKey.json',
});

async function runOCR() {
  // Performs label detection on the image file
  const [result] = await client.labelDetection('./resources/ball.jpg');
  [textResult] = await client.textDetection('./resources/pdf-files.jpg');
  const text = textResult.textAnnotations;
  const labels = result.labelAnnotations;

  const data = [text, labels];
  console.log(data[0][0]);
  // pass quickbooks data
  //callback(data);
  //return data;
}

// allow CORS from all origins
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json. Parse response/requests bodies to JSON
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('homepage route');
});

app.post('/upload', (req, res) => {
  res.send(req.body);
});

app.get('/scanner', async (req, res) => {
  console.log(req);
  const [asyncData] = await client.labelDetection('./resources/nodejs.jpg');
  const data = asyncData.labelAnnotations;
  res.send(data);
});

app.listen(port, ipAddress, () => {
  console.log(`listening on http://localhost:${port}`);
});
