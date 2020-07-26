const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');

const sauceCtlr = require('../Controllers/sauce');

router.post('/', auth, multer, sauceCtlr.CreateSauce);
router.get('/', auth, multer, sauceCtlr.getSauces);
router.get('/:id', auth, multer,sauceCtlr.getOneSauce);
router.put('/:id', auth, multer,sauceCtlr.modifySauce);
router.delete('/:id', auth, multer,sauceCtlr.deleteSauce);
router.post('/:id/like', auth, multer, sauceCtlr.likeSauce);


  module.exports = router;