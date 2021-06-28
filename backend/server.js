const express = require('express')
const app = express()
const port = 3000

const xml = require("xml")

app.use(express.static('../frontend'))

const today = new Date()
var month = today.getMonth() + 1
console.log(month)

app.get('/', (req, res) => {
	res.set("Content-Type", "text/xml")
	var testobj = { test: "test" }
	var xmlres = '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="xslt/test.xsl"?>' + xml(testobj)
	console.log(xmlres)
	res.send(xmlres)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
