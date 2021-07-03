(async () => {
	const express = require('express')
	const app = express()
	const port = 3000
	const path = require('path')
	const bodyParser = require("body-parser")
	const convert = require('xml-js')
	const json2xmlOptions = { compact: true, ignoreComment: true, spaces: 4 };
	const prettifyXml = require('prettify-xml')
	const xmlFormat = { indent: 4, newline: '\n' }

	const months = {
		1: "January",
		2: "February",
		3: "March",
		4: "April",
		5: "May",
		6: "June",
		7: "July",
		8: "August",
		9: "September",
		10: "October",
		11: "November",
		12: "December"
	}

	var curMonth = new Date().getMonth() + 1

	const handleDBJS = require('./handleDB')

	app.use(express.static('../'))
	app.use(bodyParser.json())

	app.get('/popup', async (req, res) => {
		var convert = require('xml-js')
		var data = await handleDBJS.getDataForID(req.query.id)
		var output = ''
		output += '<birthdays>'
		output += '<monthname>' + months[data.month] + '</monthname>'
		output += '<bday>'
		output += convert.json2xml(data, json2xmlOptions)
		output += '</bday>'
		output += '</birthdays>'
		output = prettifyXml(output, xmlFormat)

		res.set('Content-Type', 'text/xml')
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/popup.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/birthdays.dtd">' + '\n'
		xmlres += output

		console.log(xmlres)
		res.send(xmlres)
	})

	var getXMLBody = async function () {
		var data = await handleDBJS.getDataForMonth(curMonth)
		var output = ''
		output += '<birthdays>'
		output += "<monthname>" + months[curMonth] + "</monthname>"
		data.forEach((entry) => {
			output += '<bday>'

			var bdDate = new Date()
			bdDate.setHours(0,0,0,0)
			bdDate.setMonth(curMonth-1)
			bdDate.setDate(entry["day"])
			if(entry["month"]<curMonth){
				bdDate.setFullYear(bdDate.getFullYear()+1)
			}
			var curDate = new Date()
			curDate.setHours(0,0,0,0)
			var timeDiff =bdDate.getTime()-curDate.getTime()
			var diffDays = timeDiff / (1000*3600*24)

			output+= "<daysleft>" + diffDays + "</daysleft>"

			output += convert.json2xml(entry, json2xmlOptions)
			output += '</bday>'
		})
		output += '</birthdays>'

		output = prettifyXml(output, xmlFormat)
		return output
	}

	function getCalendarDate () {
		var date = new Date(), y = date.getFullYear(), m = curMonth - 1;
		var firstDay = new Date(y, m, 1);
		var lastDay = new Date(y, m + 1, 0);

		console.log(curMonth)
		console.log("First Day: " + firstDay.getDay())
		console.log("Last Day: " + lastDay.getDay())
	}

	app.get('/', async (req, res) => {
		res.redirect('/listview')
	})

	app.get("/test", async (req, res) => {
		getCalendarDate()
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
		res.send("")
	})

	app.get('/createEntry', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/html/addview.html'))
	})

	app.get("/calendar", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend/html/calendarview.html"))
	})

	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})
})()
