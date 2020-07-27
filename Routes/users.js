const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const userCtlr = require('../Controllers/user');

const createAccountLimiter = rateLimit ( {   
  windowMs : 60 * 60 * 1000 , //  fenêtre de 1 heure      
  max : 5 , //  commence le blocage après 5 requêtes  
  message :
    " Trop de comptes créés à partir de cette adresse IP, veuillez réessayer après une heure "
} ) ;

router.post('/signup', createAccountLimiter, userCtlr.signUp);
router.post('/login',  userCtlr.login);

  module.exports = router;