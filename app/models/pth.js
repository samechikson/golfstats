// app/models/pth.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pthSchema = new Schema({
	distance: Number, 
	pth : Number, 
	direction: String,
	tournament: Schema.Types.ObjectId,
	date: Date
});

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Pth', pthSchema);