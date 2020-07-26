const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');``
const jwt = require('jsonwebtoken');
const multer = require('multer');
const auth = require('../middelware/auth')

const userCtlr = require('../Controllers/user');

router.post('/signup', userCtlr.signUp);
router.post('/login',  userCtlr.login);

  module.exports = router;