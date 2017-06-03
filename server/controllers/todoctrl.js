var Todo = require('../models/todo');
var util = require('../helpers/util')

var get = function(req, res) {
  util.userInfo(req.body.token, function(result) {
    Todo.find({ creator: result.id }, (err, todos) => {
      res.send(todos)
    })
  });
}

var create = function(req, res) {
  var task = req.body.task;
  util.userInfo(req.body.token, function(result) {
    var newTodo = new Todo({
      task: task,
      creator: result.id,
      completed: false,
      tags: req.body.tags
    })
    newTodo.save((err, todo) => {
      if(err) {
        res.send(err.errors)
      } else res.send(todo)
    })
  })
}

var getOne = function(req, res) {
  Todo.find({_id: req.params.id}, (err, todo) => {
    res.send(todo)
  })
}

var update = function(req, res) {
  util.userInfo(req.body.token, function(result) {
    Todo.findById(req.params.id, (err, todo) => {
      if(err) {
        res.send(err)
      } else {
        if(todo.creator == result.id) {
          todo.task = req.body.task;
          todo.completed = req.body.completed;
          todo.tags = req.body.tags;
          todo.save((err, newTodo) => {
            if(err) {
              res.send(err.errors)
            } else res.send(newTodo)
          })
        } else {
          res.send(todo)
        }
      }
    })
  })
}

var remove = function(req, res) {
  util.userInfo(req.body.token, function(result) {
    Todo.findById(req.params.id, (err, todo) => {
      if(err) {
        res.send(err)
      } else {
        if(todo.creator == result.id) {
          Todo.remove({_id: req.body.id}, (err, todo) => {
            if(err) {
              res.send(err)
            } else res.send(todo)
          })
        } else {
          res.send(todo)
        }
      }
    })
  })
}

module.exports = {
  get, create, getOne, update, remove
};