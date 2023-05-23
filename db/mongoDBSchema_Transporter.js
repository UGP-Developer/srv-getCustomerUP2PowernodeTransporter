const mongoose = require('mongoose')

var Schema = mongoose.Schema;
var c_TransporterSchema = new Schema({
	c_Transporter_id: 			{ type: Number, index: true, require: true },
	c_Transporter_name: 			{ type: String, trim: true, index: true, require: true },
	c_Transporter_address: 		{ type: String, trim: true },
	c_Transporter_createddate: { type: Date, default: Date.now },
	c_Transporter_modifydate: 	{ type: Date, default: Date.now }
});

module.exports = mongoose.model('c_Transporter', c_TransporterSchema);