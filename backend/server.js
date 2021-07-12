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
	var lastPage = "/listview"
	var resetDate = function () { // function to reset date to current month and year
		curMonth = new Date().getMonth() + 1
		curYear = new Date().getFullYear()
	}

	resetDate() // server should start with data for current month
	const handleDBJS = require('./handleDB') // 'import' the functions of handleDB.js to server.js to make them usable in this file

	app.use(express.static('../'))
	app.use(bodyParser.json())

	var getXMLBody = async function () { // function to build the xml structure for the birthday entries
		var data = await handleDBJS.getListData()
		var output = ''
		output += '<birthdays>' + '\n'
		output += '<day>' + new Date().getDate() + '</day>' + '\n'
		output += '<monthname>' + months[new Date().getMonth() + 1] + '</monthname>' + '\n'
		output += '<year>' + new Date().getFullYear() + '</year>' + '\n'
		data.forEach((entry) => {

			output += '<bday>'
			var bdDate = new Date()
			bdDate.setHours(0, 0, 0, 0)
			bdDate.setMonth(entry["month"] - 1)
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

	app.get('/', async (req, res) => { //root-route gets redirected to the /listview route
		res.redirect('/listview')
	})

	app.get('/listview', async (req, res) => { // this route opens listview.xsl with birthdays.dtd as .dtd
		lastPage = "/listview"
		res.set('Content-Type', 'text/xml')
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/listview.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/birthdays.dtd">' + '\n'
		xmlres += await getXMLBody()

		res.send(xmlres)
	})


	app.get('/calendarview', async (req, res) => { // this route opens calendarview.xsl with calendar.dtd as .dtd

		lastPage = "/calendarview"
		var date = new Date(), y = curYear, m = curMonth - 1;
		var firstDay = new Date(y, m, 1);
		var lastDay = new Date(y, m + 1, 0);

		var firstDayDay = firstDay.getDay() // weekday -> 0 - 6 (Sunday is 0)
		var lastDayDate = lastDay.getDate() // date of the last day in month -> 29, 30, 31
		var lastDayDay = lastDay.getDay() // weekday of the last day in month -> 0-6

		if (firstDayDay === 0) firstDayDay = 7

		var index = 2 - firstDayDay

		res.set('Content-Type', 'text/xml')
		var xmlres = '<calendar>' + '\n'
		xmlres += '<now>' + '\n'
		xmlres += '<day>' + new Date().getDate() + '</day>' + '\n'
		xmlres += '<monthname>' + months[new Date().getMonth() + 1] + '</monthname>'
		xmlres += '<year>' + new Date().getFullYear() + '</year>' + '\n'
		xmlres += '</now>'
		xmlres += '<monthname>' + months[curMonth] + '</monthname>'
		xmlres += '<year>' + curYear + '</year>'

		var abort = false

		while (!abort) { // these loops create the xml for the 2-dimensional calendar

			xmlres += '<row>' + '\n'

			for (let j = 0; j < 7; j++) { // to display all date successfully the calendar is created with 6 possible weeks per month

				xmlres += '<entry>' + '\n'
				if (index >= 1 && index <= lastDayDate) {
					xmlres += '<index>' + index + '</index>' + '\n'
					xmlres += '<inMonth>true</inMonth>' + '\n'

					if (new Date().getFullYear() == curYear && new Date().getMonth() + 1 == curMonth && new Date().getDate() == index) {
						var today = 'true'
					} else {
						var today = 'false'
					}

					xmlres += '<today>' + today + '</today>\n'

					var data = await handleDBJS.getDataForDay(curMonth, index)

					data.forEach(entry => {
						xmlres += '<bday>'

						var bdDate = new Date()
						bdDate.setHours(0, 0, 0, 0)
						bdDate.setMonth(curMonth - 1)
						bdDate.setDate(entry["day"])
						if (entry["month"] < curMonth) bdDate.setFullYear(bdDate.getFullYear() + 1)

						var curDate = new Date()
						curDate.setHours(0, 0, 0, 0)
						var timeDiff = bdDate.getTime() - curDate.getTime()
						var diffDays = timeDiff / (1000 * 3600 * 24)

						xmlres += "<daysleft>" + diffDays + "</daysleft>"
						xmlres += convert.json2xml(entry, json2xmlOptions)
						xmlres += '</bday>'
					});
				}

				else xmlres += '<inMonth>false</inMonth>' + '\n'

				xmlres += '</entry>' + '\n'
				index++

				if (index > lastDayDate) abort = true // due to the 6 possible weeks it can happen that one month only has 5 filled week and one week is completely empty, in this case the empty row won't created by this if statement
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

	app.get("/back", (req, res) => { // route that leads back to the origin page
		res.redirect(lastPage)
	})

	app.post('/nextMonth', (req, res) => { // route that get's activated by the 'next' button in calendarview.xsl to get the data for the next month
		curMonth++
		if (curMonth === 13) {
			curYear++
			curMonth = 1
		}
		res.send("")
	})

	app.post('/previousMonth', (req, res) => { // route that get's activated by the 'previous' button in calendarview.xsl to get the data for the previous month
		curMonth--
		if (curMonth === 0) {
			curMonth = 12
			curYear--
		}
		res.send("")
	})

	app.get('/today', (req, res) => { // route that get's activated by the today button in calendarview.xsl to get the data to jump back to the current month and date
		resetDate()
		res.redirect("/calendarview")
	})

	app.get("/popup", async (req, res) => { // route that redirects to the popup.xsl; it receives the id of the selected entry and uses the id to build the xml information based on the id
		var id = req.query.id
		res.set('Content-Type', 'text/xml')
		var data = await handleDBJS.getDataForID(id)
		if (data.month < 10) data.month = "0" + data.month
		if (data.day < 10) data.day = "0" + data.day
		data.fulldate = data.year + "-" + data.month + "-" + data.day

		var age = curYear - data.year

		var output = ''
		output += '<birthdays>'
		output += '<day>' + new Date().getDate() + '</day>' + '\n'
		output += '<monthname>' + months[new Date().getMonth() + 1] + '</monthname>'
		output += '<year>' + new Date().getFullYear() + '</year>' + '\n'
		output += '<bday>'
		output += convert.json2xml(data, json2xmlOptions)
		output += '<age>' + age + '</age>'
		output += '</bday>'
		output += '</birthdays>'
		output = prettifyXml(output, xmlFormat)

		res.set('Content-Type', 'text/xml')
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/popup.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/popup.dtd">' + '\n'
		xmlres += output

		res.send(xmlres)
	})

	app.post('/createEntry', (req, res) => { // route that
		handleDBJS.createNewEntry(req.body)
		res.send("")
	})

	app.get('/createEntry', (req, res) => { // route that redirects to the addview.html
		res.set('Content-Type', 'text/xml')
		var output = ''
		output += '<birthdays>'
		output += '<day>' + new Date().getDate() + '</day>' + '\n'
		output += '<monthname>' + months[new Date().getMonth() + 1] + '</monthname>'
		output += '<year>' + new Date().getFullYear() + '</year>' + '\n'
		output += '</birthdays>'
		output = prettifyXml(output, xmlFormat)

		res.set('Content-Type', 'text/xml')
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/addview.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/birthdays.dtd">' + '\n'
		xmlres += output

		res.send(xmlres)
	})

	app.post('/editEntry', (req, res) => { // route that
		handleDBJS.editEntry(req.body)
		res.send("")
	})

	app.get('/delete', (req, res) => {
		handleDBJS.deleteEntry(req.query.id)
		res.redirect('/back')
	})

	app.listen(port, () => {
		console.log(`App is listening at http://localhost:${port}`)
	})
})()
