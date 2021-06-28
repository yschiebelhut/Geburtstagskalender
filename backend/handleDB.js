const sqlite3 = require('sqlite3').verbose()
let db

main()

async function main() {
	db = await new sqlite3.Database('db.sqlite', (err) =>  {
		if(err) {
			console.error(err.message)
		}
		console.log('Connected successfully')
	})

	await db.serialize(async () => {
		await createDBAndTable()
		await createEntries()
	})

	await db.close((err) => {
		if (err) {
			return console.error(err.message)
		}
		console.log('Close the database connection.')
	})
}

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

function createEntries() {
	const fs = require('fs')
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
}