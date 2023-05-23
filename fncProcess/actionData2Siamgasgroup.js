const moment = require('moment')
const c_Transporter = require('../db/mongoDBSchema_Transporter.js');
var _actionStatus_=0

const commit2InsertOrUpdate = async (oracleData) => {
	var _updateStatus = 0
	var _c_transporter_id = oracleData.FLEX_VALUE_ID
	var _c_transporter_name = oracleData.FLEX_VALUE
	var _c_transporter_address = oracleData.DESCRIPTION

	await c_Transporter
		.findOne({ c_Transporter_id: _c_transporter_id })
		.then(async function (result) {
			if (result) {
				if (result.c_Transporter_name != _c_transporter_name) {
					_updateStatus = 1
				}
				else if (result.c_Transporter_address != _c_transporter_address) {
					_updateStatus = 1
				}
				if (_updateStatus == 1) {
					console.log(' [/] We detect this TransporterID : ' + _c_transporter_id + ' is already exists in your database.')
					console.log('  ├─ But, We found something of data is change. We\'ll make data for up to date.')
					console.log('  ├──── Action for TransporterID : ' + _c_transporter_id + '.')
					console.log('  ├──── Transporter Name         : ' + _c_transporter_name)
					console.log('  ├──── Transporter Address      : ' + _c_transporter_address)
					await c_Transporter.updateOne({ c_Transporter_id: _c_transporter_id },
						{
							c_Transporter_name: _c_transporter_name,
							c_Transporter_address: _c_transporter_address,
							c_Transporter_createddate: moment(),
							c_Transporter_modifydate: moment()
						},
						{ upsert: true },
						async function (err, countdata) {
							if (err) {
								console.log("Errors on not having result condition is => " + err)
							}
							else {
								console.log("  ├──── Status is done on not having result is => " + JSON.stringify(countdata))
							}
						}
					)
					_actionStatus_+=1
				}
			}
			else {
				console.log(' [X] We detect this TransporterID   : ' + _c_transporter_id + ' is not have in database.')
				console.log('  ├─ We just add this TransporterID : ' + _c_transporter_id + ' into database.')
				console.log('  ├──── Transporter ID      : ' + _c_transporter_id)
				console.log('  ├──── Transporter Name    : ' + _c_transporter_name)
				console.log('  ├──── Transporter Address : ' + _c_transporter_address)
				await c_Transporter.updateOne({ c_Transporter_id: _c_transporter_id },
					{
						c_Transporter_id: _c_transporter_id,
						c_Transporter_name: _c_transporter_name,
						c_Transporter_address: _c_transporter_address,
						c_Transporter_createddate: moment(),
						c_Transporter_modifydate: moment()
					},
					{ upsert: true },
					async function (err, countdata) {
						if (err) {
							console.log("Errors on not having result condition is => " + err)
						}
						else {
							console.log("  ├──── Status is done on not having result is => " + JSON.stringify(countdata))
						}
					}
				)
				_actionStatus_+=1
			}
		})
}

const action = async (data) => {
	console.log("Action details.")
	console.log(" ├────── Commit data to insert or update.")
	for (var record in data) {
		oracleData = data[record]
		await commit2InsertOrUpdate(oracleData)
	}
	if(_actionStatus_ == 0)
		console.log(" └────── Don't actions with data, Because data is up to date.")
}

module.exports = {
	action
}