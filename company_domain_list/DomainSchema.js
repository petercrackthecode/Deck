var mongoose = require("mongoose");
var DomainSchema = new mongoose.Schema({
  company_name:String,
  domain_list:[String]
});
mongoose.model("Domain", DomainSchema);

module.exports = mongoose.model("Domain");


// var domainsallowed=[
//   {
//     name
//     status
//   },
//   {
//     name,
//     status
//   } 
// ]

// domainsallowed.map(item=> if(item.name===e.target.name) item.status==='disabled'?item.status='enabled':item.status='disabled')

// domainsallosallowed