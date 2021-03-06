require('dotenv').config();
const sec = process.env.TOKEN_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fancy-todo');

var login = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email }, function(err, user) {
    if(err) res.send(err);
    if(user) {
      bcrypt.compare(password, user.password)
      .then(result => {
        if(result) {
          var token = jwt.sign({id: user.id, name: user.name, email: user.email }, sec);
          res.send(token);
        } else {
          res.send("Wrong password");
        }
      })
      .catch(err => console.log(err))
    } else res.send('No such user')
  })
}

var loginFB = function(req, res, next) {
  var email = req.body.email;
  User.findOne({ email: email }, function(err, user) {
    if(err) {
      res.send(err);
    } else {
      if(user) {
        var token = jwt.sign({id: user.id, name: user.name, email: user.email }, sec);
        res.send(token);
      } else {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync('fbaccount', salt);

        var newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          fb_account: true
        })

        newUser.save((err, user) => {
          if(err) {
            res.send(err.errors)
          } else {
            var token = jwt.sign({id: user.id, name: user.name, email: user.email }, sec);
            res.send(token);
          }
        })
      }
    }
  })
}

var signup = function(req, res, next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    fb_account: false
  })

  newUser.save((err, user) => {
    if(err) {
      res.send(err.errors)
    } else res.send(user)
  })
}

var authUser = function(req, res, next) {
  var token = req.body.token;
  jwt.verify(token, sec, (err, decoded) => {
    res.send(decoded)
  })
}

var allUser = function(req, res, next) {
  jwt.verify(token, sec, (err, decoded) => {
    if(decoded) {
      req.body.token = token;
      next()
    } else {
      res.send(err)
    }
  })
}

module.exports = {
  login, loginFB, signup, authUser, allUser
};