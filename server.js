const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
//AuthRoutes
var UserController = require('./user/UserController'); 
var AuthController = require('./auth/AuthController');
var AdminPanel = require('./admin/AdminPanel');

const app = express();
app.use(cors());

//connect to DB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=> console.log(err))
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/admin', AdminPanel);

app.use('/api/auth', AuthController);
app.use('/users', UserController);

const Port = 5000;
app.listen(Port, ()=>console.log('Server up and running'));