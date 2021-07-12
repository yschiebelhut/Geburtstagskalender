<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<meta charset="utf-8" />
				<title>Birthday Calendar</title>

				<link href="frontend/css/default.css" type="text/css" rel="stylesheet" />
				<link href="frontend/css/popup.css" type="text/css" rel="stylesheet" />
				<script src="/frontend/js/popup.js"></script>
			</head>

			<body>
				<!-- Header/menu start-->
				<div class="menu">
					<div class="menu-box">
						<h1>My Calendar</h1>
					</div>
					<div class="menu-box">
						<a href="/today">
							<h3>
								<xsl:value-of select="birthdays/day" />&#160;<xsl:value-of select="birthdays/monthname" />&#160;<xsl:value-of select="birthdays/year" />
							</h3>
						</a>
					</div>
					<div class="menu-btn-box">
						<div class="plus">
							<div class="menu-div-btns">
								<a href="/listview">
									<img height="70%" class="list" src="/frontend/images/icon/List.png" />
								</a>
								<a href="/calendarview">
									<img class="calendar" height="70%" src="/frontend/images/icon/Calendar.png" />
								</a>
							</div>
							<a href="/createEntry" class="plus-btn">
								<img src="/frontend/images/icon/Add.png" width="auto" height="70%" />
							</a>
						</div>
					</div>
				</div>
				<!-- Header/menu end-->

				<div class="content-area">  <!-- container for the interaction field of the page -->
					<a href="/back">
						<img class="close" src="/frontend/images/icon/Close.png" />
					</a>    <!-- button that leads back to the origin page -->
					<h1>
						Birthday of <xsl:value-of select="/birthdays/bday/name" />
					<!-- get the name of the person by xslt and display as content title -->
					</h1>
					<h3>Age: <xsl:value-of select="/birthdays/bday/age" />
					</h3>
					<p>
						<input class="input" id="name" type="text" name="name" placeholder="Name">
							<xsl:attribute name="value">
								<xsl:value-of select="/birthdays/bday/name" />
								<!-- input field for the name that gets automatically filled by xslt -->
							</xsl:attribute>
						</input>
					</p>
					<p>
						<input class="input" id="date" type="date" name="date" placeholder="Date">
							<xsl:attribute name="value">
								<xsl:value-of select="/birthdays/bday/fulldate" />
								<!-- date picker that initially is set with the person's day of birth -->
							</xsl:attribute>
						</input>
					</p>
					<p>
						<textarea id="notes" type="text" name="message" rows="8" cols="60" placeholder="Note">
							<xsl:value-of select="/birthdays/bday/notes"/>
							<!-- textbox that contains all notes that are written for this birthday entry -->
						</textarea>
					</p>
					<input id="update_btn" class="save-btn" type="button" name="save" value="      Save Changes" onclick="sendData()" />
					<!-- if data gets changed then the butto will trigger an UPDATE-SQL statement to update the database entry -->
					<a>
						<xsl:attribute name="href">/delete?id=<xsl:value-of select="birthdays/bday/id" />
						</xsl:attribute>
						<input class="delete-btn" type="button" name="save" value="        Delete" />
						<!-- <input id="submit" class="form-button" type="submit" value="Delete" />-->
					</a>    <!-- the birthday entry will be deleted from the database if the button gets clicked -->
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>