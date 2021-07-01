(async () => {
	const express = require('express')
	const app = express()
	const port = 3000
	const path = require('path')
	const bodyParser = require("body-parser")

	var curMonth = new Date().getMonth() + 1

	const handleDBJS = require('./handleDB')

	app.use(express.static('../'))
	app.use(bodyParser.json())

	var getXMLBody = async function() {
		var convert = require('xml-js')
		var data = await handleDBJS.getDataForMonth(curMonth)
		var options = { compact: true, ignoreComment: true, spaces: 4 };
		var output = ''
		output += '<birthdays>'
		data.forEach((entry) => {
			output += '<bday>'
			output += convert.json2xml(entry, options)
			output += '</bday>'
		})
		output += '</birthdays>'

		const prettifyXml = require('prettify-xml')
		var format = { indent: 4, newline: '\n' }
		output = prettifyXml(output, format)
		return output
	}

	app.get('/', async (req, res) => {
		res.redirect('/listview')
	})

	app.get('/listview', async (req, res) => {
		res.set('Content-Type', 'text/xml')
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/listview.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/birthdays.dtd">' + '\n'
		xmlres += await getXMLBody()

		console.log(xmlres)
		res.send(xmlres)
	})

	app.get('/calendarview', async (req, res) => {
		res.set('Content-Type', 'text/xml')
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/calendarview.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/birthdays.dtd">' + '\n'
		xmlres += await getXMLBody()

		console.log(xmlres)
		res.send(xmlres)
	})

	app.post('/nextMonth', (req, res) => {
		curMonth = (curMonth % 12) + 1
		res.send("")
	})

	app.post('/previousMonth', (req, res) => {
		curMonth = curMonth - 1
		if (curMonth === 0) {
			curMonth = 12
		}
		res.send("")
	})

	app.post('/createEntry', (req, res) => {
		console.log(req.body)
		handleDBJS.createNewEntry(req.body)
		console.log("finished")
	})

	app.get('/createEntry', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/html/addview.html'))
	})

	app.get("/Calendar", (req,res)=>{
		res.sendFile(path.join(__dirname,"../frontend/html/calendarview.html"))
	})

	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})
})()
