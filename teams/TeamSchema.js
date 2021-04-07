var mongoose = require('mongoose')


var TeamSchema = new mongoose.Schema({

})

mongoose.model("Team", TeamSchema);

module.exports = mongoose.model("Team")

// [
//     "team-name":{
//         name: [],
//         services=[]
//     }
// ]