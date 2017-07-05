const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => {
  res.status(200).send({ message: 'Welcome to Andela PostIt' });
});
module.exports = app;
