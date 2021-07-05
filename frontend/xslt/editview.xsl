<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
	<html>
		<head>
			<meta charset="utf-8" />
			<title>Birthday calendar</title>

			<link href="frontend/css/default.css" type="text/css" rel="stylesheet" />
			<link href="frontend/css/addview.css" type="text/css" rel="stylesheet" />

			<script type="text/javascript" src="/frontend/js/createEntry.js"></script>
		</head>

		<body>
			<div class="menue">
				<div class="menue-box" id="div-logo">
					<img src="frontend/images/logo.png" id="logo" />
				</div>
				<div class="menue-box">
					<h1>My Calendar</h1>
				</div>
				<div class="menue-button-box">
					<a href="/calendarview"><button type="button" height="200px" class="button">Calendar</button></a>
					<a href="/listview"><button type="button" height="200px" class="button">List</button></a>
					<div class="plus">
						<a href="/createEntry" class="plus"><img src="/frontend/images/plus.png" width="auto" height="70%" /></a>
					</div>
				</div>
			</div>

			<!-- Formular-Container-->
			<div class="content-area">

					<h1>edit birthday</h1>
					<p><input id="name" type="text" name="name" placeholder="Name"/></p>
					<p><input id="date" type="date" name="date" placeholder="Date"/></p>
					<p><textarea id="notes" type="text" name="message" rows="8" cols="60" placeholder="Note" ></textarea></p>
					<p><input type="text" name="reminder" placeholder="Reminder" /></p>

					<div class="button-box">
						<input id="submit" class="form-button" type="submit" value="Save" onclick="sendData()" />
						<a href="/back">
							<input id="cancel" class="form-button" type="reset" value="Cancel" onclick="cancel()"/>
						</a>
					</div>

			</div>
		</body>

	</html>
</xsl:template>
</xsl:stylesheet>
