// nodemon restarts server automatically after changes
const express = require('express');
const app = express();
const ipAddress = '127.0.0.1';
const port = 8124;
const vision = require('@google-cloud/vision');

async function runOCR() {
  // Imports the Google Cloud client library

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './gcp/APIKey.json',
  });

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./resources/ball.jpg');
  const [textResult] = await client.textDetection('./resources/pdf-files.jpg');
  const text = textResult.textAnnotations;
  const labels = result.labelAnnotations;
  //console.log('Labels:');
  //labels.forEach((label) => console.log(label.description));
  //console.log('Text Detection:');
  // text.forEach((item) => console.log(item.description));

  const data = [text, labels];
  console.log(data[0]);
  return data;
}

app.get('/', (req, res) => {
  res.send('homepage route');
});

app.get('/scanner', (req, res) => {
  res.send('Scanner route');
  data = runOCR();
  console.log(typeof data, data, 'data in scanner route');
});

app.listen(port, ipAddress, () => {
  console.log(`listening on http://localhost:${port}`);
});
