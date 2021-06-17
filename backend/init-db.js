const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db.sqlite', (err) =>  {
	if(err) {
		console.error(err.message)
	}
	console.log('Connected successfully')
})

db.run('CREATE TABLE IF NOT EXISTS birthdays (\
	id INTEGER PRIMARY KEY,\
	name TEXT NOT NULL,\
	day INTEGER NOT NULL,\
	month INTEGER NOT NULL,\
	year INTEGER,\
	notes TEXT DEFAULT ""\
	)')

db.close()