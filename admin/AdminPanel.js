var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
const { response } = require('express');
const DomainSchema = require('../company_domain_list/DomainSchema');

const isAdmin = (req,res,next) => {
var userId = req.body._id;
User.findOne({_id:userId}, (err,doc)=>{
  console.log(doc)
  if(doc.admin!==true)
  {
    res.send('Access Denied')
  }
  else{
    next();
  }
})
}
router.post('/list-all',(req,res)=>{
  User.findOne({_id:req.body._id})
  .then((comp)=>{
    User.find({company_name:comp.company_name})
    .then((data)=>{
      res.send(data)
    })
  })
  .catch(err=>res.send(err))
})
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

router.post('/list-by-service', (req,res) => {
  DomainSchema.findOne({company_name:req.body.company_name})
  .then(comp => {
    User.find({company_name:comp.company_name}, (err,doc) => {
      var status = 'pending'
      var arr = [];
      doc.map(item => {
        item.domains.map(data=> {
          if(req.body.service_name===data.name)
            status=data.status
        })
        if(status==='active')
        {
          arr.push(item.name)
        }
      })
      res.send(arr)
    }) 

  })
})

module.exports = router;
