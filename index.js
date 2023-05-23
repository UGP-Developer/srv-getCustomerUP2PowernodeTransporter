'use strict';
const express = require('express')
const oracledb = require('oracledb')
const mongoDB = require('./db/mongoDB.js')
const session = require('express-session')
const oracleDBConfig = require('./db/oracleDBConfig.js')
const oracleQuery = require('./fncProcess/oracleQuery.js')
const actionData2Siamgasgroup = require('./fncProcess/actionData2Siamgasgroup.js')

var sess = {
	secret: 'secret'
	, lastSiteUseID: '0'
	, resave: true
	, saveUninitialized: true
}

const app = express()
app.use(session(sess))

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

const runProcess = async () => {
	try {
		// get data from OracleDB.
		const dataFromOracle = await oracledb.getConnection(oracleDBConfig).then(function (conn) {
			console.log('OracleDB connection status is established.')
			console.log(" ├────── We just select all transport record and show data.")
			return conn.execute(oracleQuery)
		}).catch(function (err) { console.error(err) })
		console.log(" ├────── So now, We can get data from OracleDB " + dataFromOracle.rows.length + " record.")
		console.log(" └────── After get data, We'll close connection.")
		// insert to siamgasgroup.com
		await mongoDB.connect()
		await actionData2Siamgasgroup.action(dataFromOracle.rows)
	}
	catch (err) { console.error(err) }
	finally {
		// close any connections.
		try { await mongoDB.disConnect() }
		catch (err) { console.error(err) }
	}
}

runProcess()
