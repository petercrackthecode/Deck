var express = require('express');
var app = express();
const dotenv = require('dotenv');
// var db = require('./db');

dotenv.config();
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=> console.log(err))
var UserController = require('./user/UserController'); 
app.use('/users', UserController);
var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;