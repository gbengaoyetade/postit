const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/test',(req,res)=>{
  res.send({message:"Welcome to programming"});
});
app.use('/api', router);
app.all('*', (req, res) => {
  res.status(404).json({message: 'Page not found'});
})
module.exports = app;
