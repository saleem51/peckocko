const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require("xss");
const html = xss('<script>alert("xss");</script>');
const helmet = require('helmet');


const app = express();


const sauceRoute = require('./Routes/sauces');
const userRoute = require('./Routes/users');

const apiLimiter = rateLimit ( {   
  windowMs : 15 * 60 * 1000 ,     
  max : 100 
} ) ;

//console.log(html);

mongoose.connect('mongodb+srv://salim:tutrouverapa@cluster0.mhffo.mongodb.net/piquante?retryWrites=true&w=majority'
,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));  

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/', apiLimiter);

  app.use('/api/auth/', userRoute);
  app.use('/api/sauces/', sauceRoute);

  
module.exports = app;