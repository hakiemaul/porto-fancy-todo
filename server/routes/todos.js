var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var todoctrl = require('../controllers/todoctrl');

// Route to get all todo
router.post('/', todoctrl.get);

// Route to create new todo
router.post('/', auth.allUser, todoctrl.create);

router.post('/add', todoctrl.create);

// Route to get one todo
router.get('/:id', auth.allUser, todoctrl.getOne);

// Route to update todo data
router.put('/:id', todoctrl.update);

router.put('/:id/toggle', todoctrl.toggleStatus);

// Route to remove todo data
router.delete('/:id', todoctrl.remove);

module.exports = router;