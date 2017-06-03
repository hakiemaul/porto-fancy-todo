var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

// Login route
router.post('/login', auth.login)

//Login with FB
router.post('/fblogin', auth.loginFB)

// Signup route
router.post('/signup', auth.signup)

module.exports = router;