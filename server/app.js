const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/test',(req,res)=>{
  res.send({message:"Welcome to programming"});
});
app.use('/', router);

module.exports = app;
