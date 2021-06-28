(async () => {
	const express = require('express')
	const app = express()
	const port = 3000

	var curMonth = new Date().getMonth() + 1
	
	const handleDBJS = require('./handleDB')

	app.use(express.static('../frontend'))
	
	app.get('/', async (req, res) => {
		res.set("Content-Type", "text/xml")
		var convert = require('xml-js')
		var data = await handleDBJS.getDataForMonth(curMonth)
		var options = {compact: true, ignoreComment: true, spaces: 4};
		var output = ""
		data.forEach((entry) => {
			// does each XML doc need an root-tag? then I propose surrounding with <entries> tag
			output += "<entry>"
			output += convert.json2xml(entry, options)
			output += "</entry>"
		})
		const prettifyXml = require('prettify-xml')
		var format = {indent: 4, newline:'\n'}
		output = prettifyXml(output, format)
		var xmlres = '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="xslt/test.xsl"?>' + '\n' + output
		console.log(xmlres)
		res.send(xmlres)
	})

	app.post("/createEntry", (req, res) => {
		console.log(req.body)
	})

	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})
})()
