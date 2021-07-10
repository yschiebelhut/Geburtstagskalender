const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite')
const fs = require('fs');
var db;

(async () => { //function to connect the node server with the database
	db = await new sqlite3.Database('db.sqlite', (err) => {
		if (err) {
			console.error(err.message)
		}
		console.log('Connected successfully')
	})

	await db.serialize(async () => {
		await createDBAndTable()
	})
})()

module.exports.getDataForID = async function (id) { //sql select statement to get the data for a special entry with a specific id
	return new Promise(function (resolve, reject) {
		db.get("SELECT * FROM birthdays WHERE id=?", id, (err, row) => {
			if (err) {
				reject(err)
			}
			resolve(row)
		})
	})
}

module.exports.getListData = async function () { //sql function to get all data for the next 365 days in listview
	return new Promise(function (resolve, reject) {
		db.all("SELECT * FROM birthdays ORDER BY month, day ASC", (err, rows) => {
			if (err) {
				reject(err)
			}
			const curDay = new Date().getDate()
			const curMonth = new Date().getMonth() + 1 //getMonth() returns an index from 0 to 11, in our structure we have the index 1 to 12 
			var movedEntries = 0
			while (true) {
				if (movedEntries == rows.length) {
					break
				}
				let entryDay = rows[0].day
				let entryMonth = rows[0].month
				if ((entryMonth < curMonth) || ((entryMonth === curMonth) && (entryDay < curDay))) {
					var row = rows.splice(0, 1)[0]
					row.year = new Date().getFullYear() + 1
					rows.push(row)
					movedEntries++
				} else {
					break
				}
			}
			for (var i = 0; i < rows.length - movedEntries; i++) {
				rows[i].year = new Date().getFullYear()
			}
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].day < 10) {
					rows[i].day = "0" + rows[i].day
				}
				if (rows[i].month < 10) {
					rows[i].month = "0" + rows[i].month
				}
			}
			resolve(rows)
		})
	})
}

module.exports.getDataForDay = async function (month, day) { //sql select statement to get the data from all entries for a special date
	return new Promise(function (resolve, reject) {
		db.all("SELECT * FROM birthdays WHERE month=? AND day =? ORDER BY day ASC", month, day, (err, rows) => {
			if (err) {
				reject(err)
			}
			resolve(rows)
		})
	})
}

function createDBAndTable() { //sql function that sets up the database structure with all requirements
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

module.exports.createNewEntry = function (data) { //sql function to insert a new entry into the database
	db.run("INSERT INTO birthdays (name, day, month, year, notes) VALUES(?,?,?,?,?)", data.name, data.day, data.month, data.year, data.notes)
}

module.exports.deleteEntry = function (id) { //sql function to delete a birthday entry
	db.run("DELETE FROM birthdays WHERE id=?", id)
	console.log("deleted entry successfully")
}

module.exports.editEntry = function (data) { //sql function to update a birthday entry 
	db.run("UPDATE birthdays SET name=?, day =?, month=?, year=?, notes=? WHERE id=?", data.name, data.day, data.month, data.year, data.notes, data.id)
}