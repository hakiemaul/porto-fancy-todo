var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var userctrl = require('../controllers/userctrl');

// Route to get all user
router.get('/', auth.allUser, userctrl.get);

// Route to create new user
router.post('/', auth.allUser, userctrl.create);

// Route to get one user
router.get('/:id', auth.authUser, userctrl.getOne);

// Route to update user data
router.put('/:id', auth.authUser, userctrl.update);

// Route to remove user data
router.delete('/:id', auth.authUser, userctrl.remove);

module.exports = router;