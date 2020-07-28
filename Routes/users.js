const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const userCtlr = require('../Controllers/user');

// les deux routes pour l'inscription et la connexion

const createAccountLimiter = rateLimit ( { // limitation du nombre de création de comptes à partir de la même adress IP, limitation fixée à 5 mais modulables
  windowMs : 60 * 60 * 1000 , //  fenêtre de 1 heure      
  max : 5 , //  commence le blocage après 5 requêtes  
  message :
    " Trop de comptes créés à partir de cette adresse IP, veuillez réessayer après une heure "
} ) ;

router.post('/signup', createAccountLimiter, userCtlr.signUp);
router.post('/login',  userCtlr.login);

module.exports = router;