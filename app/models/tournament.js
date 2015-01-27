// app/models/tournaments.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pthSchema = new Schema({
	name: String,
	startDate : Date, 
	endDate: Date,
	tour: String,
	location: String
})

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Tournament', pthSchema);