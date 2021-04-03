var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
var VerifyToken = require('./VerifyToken');

router.post('/register', (req, res) => {

    User.findOne({email:req.body.email}, async(error,doc)=>{
      if(doc)
      return res.send({error:'Email already exists! Sign in instead.',user:null,token:null});

      //Hash Passwords
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password,salt);
      const user = new User({
          name:req.body.name,
          email:req.body.email,
          password:hashedPassword
      })
      user.save()
      .then((resp)=>{
          const token = jwt.sign({_id: resp._id}, process.env.TOKEN_SECRET)
          console.log(resp);
          res.send({user:resp,token:token,error:null})
      }).catch((err)=>res.status(400).send(err))
      
  })
  });

  router.get('/me', VerifyToken, (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      console.log(decoded);
      User.findById(decoded._id, 
        { password: 0 }, // projection
        (err, user) => {
          if (err) return res.status(500).send("There was a problem finding the user.");
          if (!user) return res.status(404).send("No user found.");
          
          res.status(200).send(user);
      });
    });
  });

  router.post('/login', (req, res) => {
    User.findOne({email:req.body.email},async (err,doc)=>{
      console.log('doc', doc)
      if(!doc){
          return res.send({error:'Email unregistered. Signup now!',auth:false, user:null,token:null});//{user,error}
      }
      const checkPassword = await bcrypt.compare(req.body.password,doc.password)
      if(!checkPassword){
          return res.send({error:'Password is incorrect!',user:null, auth:false ,token:null});
      }
      //token
      const token = jwt.sign({_id: doc._id}, process.env.TOKEN_SECRET, {
        expiresIn:86400
      })
      res.header('auth-token',token).send({error:null, auth:true,user:doc,token:token})//user data error null
  })
    
  });


  module.exports = router;
