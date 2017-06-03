var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var todoctrl = require('../controllers/todoctrl');

// Route to get all todo
router.get('/', auth.allUser, todoctrl.get);

// Route to create new todo
router.post('/', auth.allUser, todoctrl.create);

// Route to get one todo
router.get('/:id', auth.allUser, todoctrl.getOne);

// Route to update todo data
router.put('/:id', auth.allUser, todoctrl.update);

// Route to remove todo data
router.delete('/:id', auth.allUser, todoctrl.remove);

module.exports = router;