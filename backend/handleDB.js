const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite')
const fs = require('fs');
var db;

(async () => {
	db = await new sqlite3.Database('db.sqlite', (err) => {
		if (err) {
			console.error(err.message)
		}
		console.log('Connected successfully')
	})

	await db.serialize(async () => {
		await createDBAndTable()
		await createEntriesFromJSON()
	})
})()

module.exports.getDataForID = async function (id) {
	return new Promise(function (resolve, reject) {
		db.get("SELECT * FROM birthdays WHERE id=?", id, (err, row) => {
			if (err) {
				reject(err)
			}
			resolve(row)
		})
	})
}

module.exports.getListData = async function () {
	return new Promise(function (resolve, reject) {
		db.all("SELECT * FROM birthdays ORDER BY month, day ASC", (err, rows) => {
			if (err) {
				reject(err)
			}
			const curDay = new Date().getDay() + 1
			const curMonth = new Date().getMonth() + 1
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

module.exports.getDataForDay = async function (month, day) {
	return new Promise(function (resolve, reject) {
		db.all("SELECT * FROM birthdays WHERE month=? AND day =? ORDER BY day ASC", month, day, (err, rows) => {
			if (err) {
				reject(err)
			}
			resolve(rows)
		})
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

module.exports.createNewEntry = function (data) {
	db.run("INSERT INTO birthdays (name, day, month, notes) VALUES(?,?,?,?)", data.name, data.day, data.month, data.notes)
}

module.exports.deleteEntry = function(id) {
	db.run("DELETE FROM birthdays WHERE id=?", id)
	console.log("deleted entry successfully")
}

module.exports.editEntry = function(data){
	db.run("UPDATE birthdays SET name=?, day =?, month=?, year=?, notes=? WHERE id=?", data.name, data.day, data.month, data.year, data.notes, data.id)
}

