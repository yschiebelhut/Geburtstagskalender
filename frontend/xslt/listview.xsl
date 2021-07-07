<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">

		<html>
			<head>
				<meta charset="utf-8" />
				<title>Birthday Calendar</title>
				<link href="/frontend/css/default.css" type="text/css" rel="stylesheet" />
				<link href="/frontend/css/listview.css" type="text/css" rel="stylesheet" />
			</head>

			<body>
				<!-- Menue-Leiste -->
				<!-- Header/Menu Start-->
				<div class="menue">
					<div class="menue-box">
						<h1 id="calendar_title">My Calendar</h1>
					</div>
					<div class="menue-box">
						<a href="/today">
							<h3>
								<xsl:value-of select="birthdays/day" />
								&#160;
								<xsl:value-of select="birthdays/monthname" />
								&#160;
								<xsl:value-of select="birthdays/year" />
							</h3>
						</a>
					</div>
					<div class="menue-button-box">
						<div class="plus">
							<div id="menue-div-buttons">
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
				<!-- Header/Menu End-->


				<!-- Listen-Container-->
				<div class="liste">
					<xsl:for-each select="birthdays/bday">
						<!-- xsl loop to display all birthday entries for the coming year -->

						<a>
							<xsl:attribute name="href">/popup?id=<xsl:value-of select="id" /></xsl:attribute>
							<!-- <div class="list-element"> -->
								<div class="birthdate-element">
									<div class="date"><xsl:value-of select="day" />.<xsl:value-of select="month" />.<xsl:value-of select="year" /></div>
									<div class="name"><xsl:value-of select="name" /></div>
									<div class="countdown">
										<xsl:value-of select="daysleft" />&#160;days
										<div class="absolut">
											<a class="delete-link">
												<xsl:attribute name="href">/deleteEntry?id=<xsl:value-of select="id" /></xsl:attribute>
												<img class="cross-btn" src="/frontend/images/icon/Delete_Cross.png" />
											</a>
										</div>
									</div>
								</div>
							<!-- </div> -->
						</a>

					</xsl:for-each>
				</div>
			</body>
		</html>
		
	</xsl:template>
</xsl:stylesheet>