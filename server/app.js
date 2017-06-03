const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fancy-todo');

var users = require('./routes/users');
var todos = require('./routes/todos');
var index = require('./routes/index');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', users)
app.use('/api/todos', todos)
app.use('/', index)

app.listen(3000)