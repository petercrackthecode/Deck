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

//list by services
const findUsers = async(company_name,service) => {
 const doc = await User.find({company_name:company_name})
    const activeUsers = []
    doc.map(item=>{

      item.domains.map(data => {
        if(data.name === service && data.status==='active')
        {
          activeUsers.push(item.name)
        }
      })
      
    })
    const objTemp={};
    objTemp['service']=service;
    objTemp['users']=activeUsers
    return objTemp;
  }

router.post('/list-by-service', (req,res) => {
  DomainSchema.findOne({company_name:req.body.company_name})
  .then(async comp => {
        let totalServicesList=[]
        comp.domain_list.map(service => {
          //console.log(service)
        const objTemp = findUsers(req.body.company_name,service)
        //console.log(objTemp)
        totalServicesList.push(objTemp)
        })
        totalServicesList = await Promise.all(totalServicesList)
        res.send(totalServicesList)

 })
})

module.exports = router;
