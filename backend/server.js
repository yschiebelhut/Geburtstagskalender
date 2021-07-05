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

	var curMonth
	var curYear
	var lastPage ="list"

	// function to reset date to current month and year
	var resetDate = function () {
		curMonth = new Date().getMonth() + 1
		curYear = new Date().getFullYear()
	}
	resetDate() // server should start with data for current month

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

		res.send(xmlres)
	})

	var getXMLBody = async function () {
		var data = await handleDBJS.getListData()
		var output = ''
		output += '<birthdays>' + '\n'
		output += '<day>' + new Date().getDate() + '</day>' + '\n'
		output += '<monthname>' + months[curMonth] + '</monthname>' + '\n'
		output += '<year>' + curYear + '</year>' + '\n'
		data.forEach((entry) => {
			output += '<bday>'

			var bdDate = new Date()
			bdDate.setHours(0, 0, 0, 0)
			bdDate.setMonth(entry["month"]-1)
			bdDate.setDate(entry["day"])
			bdDate.setFullYear(entry["year"])

			var curDate = new Date()
			curDate.setHours(0, 0, 0, 0)
			var timeDiff = bdDate.getTime() - curDate.getTime()
			var diffDays = timeDiff / (1000 * 3600 * 24)

			output += "<daysleft>" + Math.floor(diffDays) + "</daysleft>"

			output += convert.json2xml(entry, json2xmlOptions)
			output += '</bday>'
		})
		output += '</birthdays>'

		output = prettifyXml(output, xmlFormat)
		return output
	}

	app.get('/', async (req, res) => {
		res.redirect('/listview')
	})

	app.get('/listview', async (req, res) => {
		lastPage="list"
		res.set('Content-Type', 'text/xml')
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/listview.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/birthdays.dtd">' + '\n'
		xmlres += await getXMLBody()

		res.send(xmlres)
	})


	app.get('/calendarview', async (req, res) => {

		lastPage="calendar"
		var date = new Date(), y = curYear, m = curMonth - 1;
		var firstDay = new Date(y, m, 1);
		var lastDay = new Date(y, m + 1, 0);

		var firstDayDay = firstDay.getDay() // Erster Monatstag (Wochentag) -> 0 - 6
		var lastDayDate = lastDay.getDate() // Letzter Monatstag (Datum) -> 29, 30, 31
		var lastDayDay = lastDay.getDay() // Letzter Wochentag -> 0-6

		if (firstDayDay === 0) firstDayDay = 7

		var index = 2 - firstDayDay

		res.set('Content-Type', 'text/xml')
		var xmlres = '<calendar>' + '\n'
		xmlres += "<monthname>" + months[curMonth] + "</monthname>" + "\n"
		xmlres += "<year>" + curYear + "</year>" + "\n"
		var abort = false

		while (!abort) {

			xmlres += '<row>' + '\n'

			for (let j = 0; j < 7; j++) {

				xmlres += '<entry>' + '\n'
				if (index >= 1 && index <= lastDayDate) {
					xmlres += '<index>' + index + '</index>' + '\n'
					xmlres += '<inMonth>true</inMonth>' + '\n'

					var data = await handleDBJS.getDataForDay(curMonth, index)

					data.forEach(entry => {
						xmlres += '<bday>'

						var bdDate = new Date()
						bdDate.setHours(0, 0, 0, 0)
						bdDate.setMonth(curMonth - 1)
						bdDate.setDate(entry["day"])
						if (entry["month"] < curMonth) {
							bdDate.setFullYear(bdDate.getFullYear() + 1)
						}
						var curDate = new Date()
						curDate.setHours(0, 0, 0, 0)
						var timeDiff = bdDate.getTime() - curDate.getTime()
						var diffDays = timeDiff / (1000 * 3600 * 24)

						xmlres += "<daysleft>" + diffDays + "</daysleft>"

						xmlres += convert.json2xml(entry, json2xmlOptions)
						xmlres += '</bday>'
					});
				}

				else {
					xmlres += '<inMonth>false</inMonth>' + '\n'
				}

				xmlres += '</entry>' + '\n'
				index++

				if (index > lastDayDate) abort = true
			}

			xmlres += '</row>' + '\n'

		}

		xmlres += '</calendar>' + '\n'
		xmlres = prettifyXml(xmlres, xmlFormat)

		var xmlhead = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlhead += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/calendarview.xsl"?>' + '\n'
		xmlhead += '<!DOCTYPE calendar SYSTEM "/backend/calendar.dtd">' + '\n'

		xmlres = xmlhead + xmlres
		res.send(xmlres)
	})

	app.get("/back", (req,res)=>{
		if(lastPage=="list"){
			res.redirect('/listview')
		}else{
			res.redirect('/calendarview')
		}
	})

	app.post('/nextMonth', (req, res) => {
		curMonth++
		if (curMonth === 13) {
			curYear++
			curMonth = 1
		}
		res.send("")
	})

	app.post('/previousMonth', (req, res) => {
		curMonth--
		if (curMonth === 0) {
			curMonth = 12
			curYear--
		}
		res.send("")
	})

	app.post('/today', (req, res) => {
		resetDate()
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

	/*
	Um den Kalender aufzurufen wird eine Zuordnung der Daten zu den Divs benötigt
	done -> getDay Funktion für den ersten des Monats ausführen
	-> Basierend auf getDay die restlichen Tage berechnen und zum XML hinzufügen
	-> Die Geburtstage müssen ebenfalls die Information enthalten in welchem Div sie angezeigt werden
	*/

	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})
})()
