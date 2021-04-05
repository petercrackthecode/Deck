var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');


router.get('/search-user', (req,res) => {
  var email = req.body.email;
  User.findOne({email:email},(err,doc)=>{
    if(doc)
    {
      res.send(doc.domains)
    }
  })
})

router.post('/status',(req,res)=>{
  var updatedStatus=req.body.status;
  User.findOneAndUpdate({email:req.body.email},{domains:updatedStatus},{new:true})
  .then(res=>res.send('Data updated successfully'))
  .catch(err=>console.log(err))
})

  module.exports = router;
