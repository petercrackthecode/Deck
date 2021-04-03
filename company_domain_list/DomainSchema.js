var mongoose = require("mongoose");
var DomainSchema = new mongoose.Schema({
  company_name:String,
  domain_list:[String]
});
mongoose.model("Domain", DomainSchema);

module.exports = mongoose.model("Domain");
