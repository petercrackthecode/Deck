var mongoose = require('mongoose')


var TeamSchema = new mongoose.Schema({
    team_name: String,
    company_name: String,
    domains: [Object]
})

mongoose.model("Team", TeamSchema);

module.exports = mongoose.model("Team")

// [
//     "team-name":{
//         name: [],
//         services=[]
//     }
// ]