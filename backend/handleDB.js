const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite')
const fs = require('fs');
const { callbackify } = require('util');
var db;

(async () => {
	db = await new sqlite3.Database('db.sqlite', (err) => {
		if (err) {
			console.error(err.message)
		}
		console.log('Connected successfully')
	})

	// await db.getDatabaseInstance().serialize(async () => {
	await db.serialize(async () => {
		await createDBAndTable()
		await createEntriesFromJSON()
	})
})()

module.exports.getDataForMonth = function (month) {
	var result
	db.all("SELECT * FROM birthdays WHERE month=?", month, (err, rows) => {
		if (err) {
			throw err
		}
		rows.forEach((row) => {
			console.log(row)
		})
		console.log(rows[0])
		result = rows
		console.log(result[0])
	})
	// console.log(result[1])
	return result
}

function createDbConnection(filename) {
	return open({
		filename,
		driver: sqlite3.Database
	})
}

function createDBAndTable() {
	console.log('[i] checking or creating creating table')
	db.run('CREATE TABLE IF NOT EXISTS birthdays (\
		id INTEGER PRIMARY KEY,\
		name TEXT NOT NULL,\
		day INTEGER NOT NULL,\
		month INTEGER NOT NULL,\
		year INTEGER,\
		notes TEXT DEFAULT ""\
		)')
	console.log('[i] table checked or created')
}

function createEntriesFromJSON() {
	console.log('[i] start reading table data from JSON')
	let rawdata = fs.readFileSync('testdata.json')
	let data = JSON.parse(rawdata)
	data.forEach(entry => {
		console.log(`Inserting ${entry.id} into DB`)
		if (entry.year) {
			if (entry.notes) {
				db.run('INSERT OR REPLACE INTO birthdays (id, name, day, month, year, notes) VALUES(?,?,?,?,?,?)', entry.id, entry.name, entry.day, entry.month, entry.year, entry.notes)
			} else {
				db.run('INSERT OR REPLACE INTO birthdays (id, name, day, month, year) VALUES(?,?,?,?,?)', entry.id, entry.name, entry.day, entry.month, entry.year)
			}
		} else if (entry.notes) {
			db.run('INSERT OR REPLACE INTO birthdays (id, name, day, month, notes) VALUES(?,?,?,?,?)', entry.id, entry.name, entry.day, entry.month, entry.notes)
		} else {
			db.run('INSERT OR REPLACE INTO birthdays (id, name, day, month) VALUES(?,?,?,?)', entry.id, entry.name, entry.day, entry.month)
		}
	})
	console.log('[i] finished reading table data from JSON')
}