const mongoose = require('mongoose')

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
	console.log('MongoDB connection status is established.')
	console.log(' └────── So now, Socket for MongoDB is opening.')
})

mongoose.connection.on('reconnected', () => {
	console.log('MongoDB connection status is reestablished.')
})

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB connection status is disconnected.')
})

mongoose.connection.on('close', () => {
	console.log('MongoDB connection status is closed.')
})

mongoose.connection.on('error', (error) => {
	console.log('MongoDB errors: ' + error)
})

const connect = async () => {
	let authSource = "admin"
	let userAccess = "poweradmin"
	let userPass = "lr03tabn"
	let serverIP = "siamgasgroup.com"
	let port = "27017"
	let dbName = "powernodedb"
	await mongoose.connect(`mongodb://${userAccess}:${userPass}@${serverIP}:${port}/${dbName}?authSource=${authSource}`, {
		useNewUrlParser: true
		, useCreateIndex: true
		, useUnifiedTopology: true
	})
}

const disConnect = async () => {
	await mongoose.connection.close()
}

module.exports = {
	connect
	, disConnect
}
