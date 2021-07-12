// need whole server in async function to enable static database connection
(async () => {
	const express = require('express') // framework used to deploy the web app
	const app = express()
	const port = 3000
	const path = require('path')
	const bodyParser = require('body-parser')

	// options used for xml generation
	const convert = require('xml-js')
	const json2xmlOptions = { compact: true, ignoreComment: true, spaces: 4 }
	const prettifyXml = require('prettify-xml')
	const xmlFormat = { indent: 4, newline: '\n' }

	// legend to translate month indexes to human readable names
	const months = {
		1: 'January',
		2: 'February',
		3: 'March',
		4: 'April',
		5: 'May',
		6: 'June',
		7: 'July',
		8: 'August',
		9: 'September',
		10: 'October',
		11: 'November',
		12: 'December'
	}

	// init working variables for server
	var curMonth
	var curYear
	var lastPage = '/listview'

	// function to reset date to current month and year
	var resetDate = function () {
		curMonth = new Date().getMonth() + 1 // getMonth() returns an index from 0 to 11, in our structure we have the index 1 to 12 
		curYear = new Date().getFullYear()
	}

	// server should start with data for current month
	resetDate()

	// establish connection to database backend
	const handleDBJS = require('./handleDB')

	app.use(express.static('../')) // set root folder used for linking between pages
	app.use(bodyParser.json())


	// configure routes of express server

	// root route gets redirected to the /listview route
	app.get('/', async (req, res) => {
		res.redirect('/listview')
	})

	// generate and serve listview
	app.get('/listview', async (req, res) => {
		lastPage = '/listview' // set lastpage for navigation from popup
		res.set('Content-Type', 'text/xml') // will return requested page as xml with styling info

		// fetch data from db and build xml body according to dtd
		var data = await handleDBJS.getListData()
		var body = ''
		body += '<birthdays>' + '\n'
		body += '<day>' + new Date().getDate() + '</day>' + '\n'
		body += '<monthname>' + months[new Date().getMonth() + 1] + '</monthname>' + '\n'
		body += '<year>' + new Date().getFullYear() + '</year>' + '\n'

		// create an <bday> element for each entry
		data.forEach((entry) => {

			body += '<bday>'
			var bdDate = new Date()
			bdDate.setHours(0, 0, 0, 0)
			bdDate.setMonth(entry['month'] - 1)
			bdDate.setDate(entry['day'])
			bdDate.setFullYear(entry['year'])

			var curDate = new Date()
			curDate.setHours(0, 0, 0, 0)
			var timeDiff = bdDate.getTime() - curDate.getTime()
			var diffDays = timeDiff / (1000 * 3600 * 24)

			body += '<daysleft>' + Math.floor(diffDays) + '</daysleft>'
			body += convert.json2xml(entry, json2xmlOptions)
			body += '</bday>'
		})

		body += '</birthdays>'
		body = prettifyXml(body, xmlFormat) // format xml to be not only valid but human readable

		// build xml response combining the body with a valid header
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/listview.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/dtd/birthdays.dtd">' + '\n'
		xmlres += body
		// somehow cannot do formatting here, result is just ugly

		res.send(xmlres)
	})

	// generate and serve calendarview
	app.get('/calendarview', async (req, res) => {
		lastPage = '/calendarview' // set lastpage for navigation from popup
		res.set('Content-Type', 'text/xml') // will return requested page as xml with styling info

		// calculate dates that have to be displayed
		var date = new Date(), y = curYear, m = curMonth - 1;
		var firstDay = new Date(y, m, 1);
		var lastDay = new Date(y, m + 1, 0);

		var firstDayDay = firstDay.getDay() // weekday -> 0 - 6 (Sunday is 0)
		var lastDayDate = lastDay.getDate() // date of the last day in month -> 29, 30, 31
		var lastDayDay = lastDay.getDay() // weekday of the last day in month -> 0-6

		if (firstDayDay === 0) firstDayDay = 7 // fix starting of the month, map monday to one week later

		var index = 2 - firstDayDay // calculate start offset, value 2 found by trial and error

		// start building xml body
		var xmlres = '<calendar>' + '\n'
		xmlres += '<now>' + '\n'
		xmlres += '<day>' + new Date().getDate() + '</day>' + '\n'
		xmlres += '<monthname>' + months[new Date().getMonth() + 1] + '</monthname>'
		xmlres += '<year>' + new Date().getFullYear() + '</year>' + '\n'
		xmlres += '</now>'
		xmlres += '<monthname>' + months[curMonth] + '</monthname>'
		xmlres += '<year>' + curYear + '</year>'

		var abort = false
		// create the xml for the 2-dimensional calendar
		while (!abort) {
			xmlres += '<row>' + '\n'
			// to display all possible months correctly, a maximum of 6 weeks is needed
			for (let j = 0; j < 7; j++) {
				xmlres += '<entry>' + '\n'
				// check if day is part of current month
				if (index >= 1 && index <= lastDayDate) {
					xmlres += '<index>' + index + '</index>' + '\n'
					xmlres += '<inMonth>true</inMonth>' + '\n'

					if (new Date().getFullYear() == curYear && new Date().getMonth() + 1 == curMonth && new Date().getDate() == index) {
						var today = 'true'
					} else {
						var today = 'false'
					}

					xmlres += '<today>' + today + '</today>' + '\n'

					// fetch data for current day and build corresponding <bday> elements
					var data = await handleDBJS.getDataForDay(curMonth, index)
					data.forEach(entry => {
						xmlres += '<bday>'

						var bdDate = new Date()
						bdDate.setHours(0, 0, 0, 0)
						bdDate.setMonth(curMonth - 1)
						bdDate.setDate(entry['day'])
						if (entry['month'] < curMonth) bdDate.setFullYear(bdDate.getFullYear() + 1)

						var curDate = new Date()
						curDate.setHours(0, 0, 0, 0)
						var timeDiff = bdDate.getTime() - curDate.getTime()
						var diffDays = timeDiff / (1000 * 3600 * 24)

						xmlres += '<daysleft>' + diffDays + '</daysleft>'
						xmlres += convert.json2xml(entry, json2xmlOptions)
						xmlres += '</bday>'
					});
				} else {
					xmlres += '<inMonth>false</inMonth>' + '\n'
				}

				xmlres += '</entry>' + '\n'
				index++

				if (index > lastDayDate) abort = true // due to the 6 possible weeks it can happen that one month only has 5 filled week and one week is completely empty, in this case the empty row won't be created
			}
			xmlres += '</row>' + '\n'
		}

		xmlres += '</calendar>' + '\n'
		xmlres = prettifyXml(xmlres, xmlFormat) // format xml to be not only valid but human readable

		var xmlhead = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlhead += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/calendarview.xsl"?>' + '\n'
		xmlhead += '<!DOCTYPE calendar SYSTEM "/backend/dtd/calendar.dtd">' + '\n'

		xmlres = xmlhead + xmlres
		res.send(xmlres)
	})

	// route that leads back to the prior page
	app.get('/back', (req, res) => {
		res.redirect(lastPage)
	})

	// increase month to be displayed in calendarview, necessary page reload is initiated by browser
	app.post('/nextMonth', (req, res) => {
		curMonth++
		// if month gets bigger than 12 we reached the next year
		if (curMonth === 13) {
			curYear++
			curMonth = 1
		}
		res.send('')
	})

	// decrease month to be displayed in calendarview, necessary page reload is initiated by browser
	app.post('/previousMonth', (req, res) => {
		curMonth--
		// if month gets smaller than 0 we reached the previous year
		if (curMonth === 0) {
			curMonth = 12
			curYear--
		}
		res.send('')
	})

	// jump back to the current month in calendarview
	app.get('/today', (req, res) => {
		resetDate()
		res.redirect('/calendarview')
	})

	// generate and serve popup for specific id passed as url query
	app.get('/popup', async (req, res) => {
		var id = req.query.id
		res.set('Content-Type', 'text/xml') // will return requested page as xml with styling info

		// fetch data for specified id
		var data = await handleDBJS.getDataForID(id)

		// format date to be two digits in length for day and month and include full year
		if (data.month < 10) data.month = '0' + data.month
		if (data.day < 10) data.day = '0' + data.day
		data.fulldate = data.year + '-' + data.month + '-' + data.day

		var age = curYear - data.year

		// build xml body according to dtd
		var body = ''
		body += '<birthdays>'
		body += '<day>' + new Date().getDate() + '</day>' + '\n'
		body += '<monthname>' + months[new Date().getMonth() + 1] + '</monthname>'
		body += '<year>' + new Date().getFullYear() + '</year>' + '\n'
		body += '<bday>'
		body += convert.json2xml(data, json2xmlOptions)
		body += '<age>' + age + '</age>'
		body += '</bday>'
		body += '</birthdays>'

		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/popup.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/dtd/popup.dtd">' + '\n'
		xmlres += body

		res.send(xmlres)
	})

	// receive new birthday and save in database
	app.post('/createEntry', (req, res) => {
		handleDBJS.createNewEntry(req.body)
		res.send('')
	})

	// page to add new birthdays
	app.get('/createEntry', (req, res) => {
		res.set('Content-Type', 'text/xml') // will return requested page as xml with styling info
		var body = ''
		body += '<birthdays>'
		body += '<day>' + new Date().getDate() + '</day>' + '\n'
		body += '<monthname>' + months[new Date().getMonth() + 1] + '</monthname>'
		body += '<year>' + new Date().getFullYear() + '</year>' + '\n'
		body += '</birthdays>'
		body = prettifyXml(body, xmlFormat) // format xml to be not only valid but human readable

		var xmlres = '<?xml version="1.0" encoding="UTF-8"?>' + '\n'
		xmlres += '<?xml-stylesheet type="text/xsl" href="/frontend/xslt/addview.xsl"?>' + '\n'
		xmlres += '<!DOCTYPE birthdays SYSTEM "/backend/dtd/birthdays.dtd">' + '\n'
		xmlres += body

		res.send(xmlres)
	})

	// receive changes of an entry and save in database
	app.post('/editEntry', (req, res) => {
		handleDBJS.editEntry(req.body)
		res.send('')
	})

	// delete specified entry
	app.get('/delete', (req, res) => {
		handleDBJS.deleteEntry(req.query.id)
		res.redirect('/back')
	})

	// serve app on network port 3000
	app.listen(port, () => {
		console.log(`[i] App is listening at http://localhost:${port}`)
	})
})()
