// imports to run persistent sqlite database
const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite')
const fs = require('fs');
var db; // somehow semicolon is needed here, DO NOT REMOVE!!!; lol javascript, why!?

// initialize connection to sqlite database and make connection available in db variable
(async () => {
	db = await new sqlite3.Database('db.sqlite', (err) => {
		if (err) {
			console.error(err.message)
		}
		console.log('[i] Database connected successfully')
	})

	// assure that connected db has required table to work with the server
	// create otherwise
	await db.serialize(async () => {
		await createDBAndTable()
	})
})()

// get the data for a specific entry with id provided as parameter
// WARNING: has to be called in async/await context to ensure correct functionality
module.exports.getDataForID = async function (id) {
	// promise needed to await callback function
	return new Promise(function (resolve, reject) {
		db.get("SELECT * FROM birthdays WHERE id=?", id, (err, row) => {
			if (err) {
				reject(err)
			}
			resolve(row)
		})
	})
}

// get all data for the next 365 days in listview
// WARNING: has to be called in async/await context to ensure correct functionality
module.exports.getListData = async function () {
	// promise needed to await callback function
	return new Promise(function (resolve, reject) {
		// get all birthdays chronically sorted from beginning to end of the year
		db.all("SELECT * FROM birthdays ORDER BY month, day ASC", (err, rows) => {
			if (err) {
				reject(err)
			}

			// reorder birthdays so that list starts with current date
			// get current day and month to compare against
			const curDay = new Date().getDate()
			const curMonth = new Date().getMonth() + 1 // getMonth() returns an index from 0 to 11, in our structure we have the index 1 to 12
			var movedEntries = 0 // counter later used to determine the entries where the year still has to be changed
			while (true) {
				// at the latest, abort if all entries have been moved to the end
				if (movedEntries == rows.length) {
					break
				}
				let entryDay = rows[0].day
				let entryMonth = rows[0].month
				// move entry if month is less or
				// if month is equal and day is less than current date
				if ((entryMonth < curMonth) || ((entryMonth === curMonth) && (entryDay < curDay))) {
					// birthday is in next year, so move to end and set year accordingly
					var row = rows.splice(0, 1)[0]
					row.year = new Date().getFullYear() + 1
					rows.push(row)
					movedEntries++
				} else {
					// as dates are sorted, we can abort as soon as an entry doesn't has to be moved
					break
				}
			}

			// overwrite year of birth with current year for remaining entries
			for (var i = 0; i < rows.length - movedEntries; i++) {
				rows[i].year = new Date().getFullYear()
			}

			// format date to be always two digits in length for day and month
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

// get the data for a specific date
// WARNING: has to be called in async/await context to ensure correct functionality
module.exports.getDataForDay = async function (month, day) {
	// promise needed to await callback function
	return new Promise(function (resolve, reject) {
		db.all("SELECT * FROM birthdays WHERE month=? AND day =? ORDER BY day ASC", month, day, (err, rows) => {
			if (err) {
				reject(err)
			}
			resolve(rows)
		})
	})
}

// sql function that sets up the database structure with all requirements
function createDBAndTable() {
	db.run('CREATE TABLE IF NOT EXISTS birthdays (\
		id INTEGER PRIMARY KEY,\
		name TEXT NOT NULL,\
		day INTEGER NOT NULL,\
		month INTEGER NOT NULL,\
		year INTEGER,\
		notes TEXT DEFAULT ""\
		)')
}

// sql function to insert a new entry into the database
module.exports.createNewEntry = function (data) {
	db.run("INSERT INTO birthdays (name, day, month, year, notes) VALUES(?, ?, ?, ?, ?)", data.name, data.day, data.month, data.year, data.notes)
}

// sql function to delete a birthday entry
module.exports.deleteEntry = function (id) {
	db.run("DELETE FROM birthdays WHERE id=?", id)
}

// sql function to update a birthday entry
module.exports.editEntry = function (data) {
	db.run("UPDATE birthdays SET name=?, day=?, month=?, year=?, notes=? WHERE id=?", data.name, data.day, data.month, data.year, data.notes, data.id)
}