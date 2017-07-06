const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',router)

module.exports = app;
