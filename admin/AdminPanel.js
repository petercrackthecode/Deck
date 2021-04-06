var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
const { response } = require('express');

const isAdmin = (req,res,next) => {
var userId = req.body._id;
User.findOne({_id:userId}, (err,doc)=>{
  if(doc.admin!==true)
  {
    res.send('Access Denied')
  }
  else{
    next();
  }
  
})
}

router.post('/search-user',isAdmin, (req,res) => {
  var email = req.body.email;
  User.findOne({email:email},(err,doc)=>{
    if(doc)
    {
      res.send(doc.domains)
    }
    else{
      res.send("The Email doesn't exist in the decks database")
    }
  })
})

router.post('/status',isAdmin, (req,res)=>{
  var updatedStatus=req.body.status;
  User.findOneAndUpdate({email:req.body.email},{domains:updatedStatus},{new:true})
  .then(res=>console.log('Data updated successfully',res))
  .catch(err=>console.log(err))
})

module.exports = router;
