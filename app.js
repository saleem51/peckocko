const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit'); // limitation du nombre de requête et la création de compte à partir du même IP
const xss = require("xss");//contre les attaques xss (injections de scripts malveillants)
const html = xss('<script>alert("xss");</script>');
const helmet = require('helmet');

 require("dotenv").config(); //masquage des informations sensibles comme les idantifiants et les mots de passes

const NAME = process.env.NAME;
const PASS = process.env.PASS;


const app = express();


const sauceRoute = require('./Routes/sauces');
const userRoute = require('./Routes/users');

const apiLimiter = rateLimit ( {   
  windowMs : 15 * 60 * 1000 ,     
  max : 100 // limite le nombre de requête par fenêtres
} ) ;

//console.log(html);

//identifiant et mot de passe mongodb masqués(utilisation  de dotenv et du fichier .env)
mongoose.connect(`mongodb+srv://${NAME}:${PASS}@cluster0.mhffo.mongodb.net/piquante?retryWrites=true&w=majority`
,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));  

app.use(helmet());// utilsiation d'helmet pour sécuriser les en-têtes http

app.use((req, res, next) => { // configuration des CORS, pour permettre à différentes adresse localhost de communiquer entre elles
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());//body parser pour convertir les objets JSON des requêtes POST

  app.use('/images', express.static(path.join(__dirname, 'images'))); // indique à Express le chemin pour récupérer les images

  app.use('/api/', apiLimiter); // permet de limiter le nombre de requête et d'inscription à partir du même IP

  app.use('/api/auth/', userRoute); // définition des chemins de nos routes
  app.use('/api/sauces/', sauceRoute);

  
module.exports = app;