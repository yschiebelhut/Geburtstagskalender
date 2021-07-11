<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<meta charset="utf-8" />
				<title>Birthday Calendar</title>
				<link href="/frontend/css/default.css" type="text/css" rel="stylesheet" />
				<link href="/frontend/css/listview.css" type="text/css" rel="stylesheet" />
			</head>

			<body>
				<!-- menu bar -->
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
								<a>
									<img class="list" height="70%" src="/frontend/images/icon/marked_List.png"></img>
								</a>

								<a href="/calendarview">
									<img class="calendar" height="70%" src="/frontend/images/icon/Calendar.png"></img>
								</a>
							</div>
							<a href="/createEntry" class="plus-btn">
								<img src="/frontend/images/icon/Add.png" width="auto" height="70%" />
							</a>
						</div>
					</div>
				</div>
				<!-- Header/menu end-->

				<!-- list container-->
				<div class="bdaylist">
					<xsl:for-each select="birthdays/bday">
						<!-- xsl loop to display all birthday entries for the coming year -->
						<a>
							<xsl:attribute name="href">/popup?id=<xsl:value-of select="id" />
							</xsl:attribute>
							<div class="birthdate-element">
								<div class="subdiv">
									<xsl:value-of select="day" />.<xsl:value-of select="month" />.<xsl:value-of select="year" />
								</div>
								<div class="name subdiv">
									<xsl:value-of select="name" />
								</div>
								<div class="countdown subdiv">
									<xsl:value-of select="daysleft" />&#160;days
								</div>
							</div>
						</a>
					</xsl:for-each>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>