<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<meta charset="utf-8" />
				<title>Birthday Calendar</title>
				<link href="/frontend/css/default.css" type="text/css" rel="stylesheet" />
				<link href="/frontend/css/calendarview.css" type="text/css" rel="stylesheet" />
				<script src="/frontend/js/calendarview.js"></script>
			</head>

			<body>
				<!-- header on the page with title and buttons -->
				<div class="menu">
					<div class="menu-box">
						<h1>My Calendar</h1>
					</div>
					<div class="menu-box">
						<a href="/today">
							<h3>
								<xsl:value-of select="calendar/now/day" />&#160;<xsl:value-of select="calendar/now/monthname" />&#160;<xsl:value-of select="calendar/now/year" />
							</h3>
						</a>
					</div>
					<div class="menu-btn-box">
						<div class="plus">
							<div class="menu-div-btns">
								<a href="/listview">
									<img height="70%" class="list" src="/frontend/images/icon/List.png" />
								</a>
								<a>
									<img class="calendar" height="70%" src="/frontend/images/icon/marked_Calendar.png" />
								</a>
							</div>
							<a href="/createEntry" class="plus-btn">
								<img src="/frontend/images/icon/Add.png" width="auto" height="70%" />
							</a>
						</div>
					</div>
				</div>
				<!-- Header/menu end-->

				<header>
					<div class="month-area">
						<a onclick="previousMonth()">
							<img height="40%" class="next-previous-btn" src="/frontend/images/icon/Previous.png" />
						</a>
						<div class="dateView">
							<h1>
								<xsl:value-of select="calendar/monthname" />
								&#160;<xsl:value-of select="calendar/year" />
							</h1>
						</div>
						<a onclick="nextMonth()">
							<img height="40%" class="next-previous-btn" src="/frontend/images/icon/Next.png" />
						</a>
					</div>
				</header>
				<div class="calendar-wrap">
					<!-- calendar header line with all weekdays -->
					<div class="calendar-div">
						<ul class="weekdays">
							<li>Monday</li>
							<li>Tuesday</li>
							<li>Wednesday</li>
							<li>Thursday</li>
							<li>Friday</li>
							<li>Saturday</li>
							<li>Sunday</li>
						</ul>
						<!-- dynamic calendar with data based on xslt -->
						<xsl:for-each select="/calendar/row">   <!-- xsl loop for the calendar's rows -->
							<ul class="days">
								<xsl:for-each select="entry">   <!-- xsl loop for the calendar's day -->
									<xsl:if test="inMonth = 'true'">    <!-- xsl if statement that checks value 'inMonth'; if inMonth=true then the day will be formatted as a day of the current month  -->
										<li class="day">
											<xsl:if test="today = 'true'">
												<div class="today">
													<xsl:attribute name = "id">
														<xsl:value-of select="index" />
														<!-- write the day's date in the correspondent calendar field  -->
													</xsl:attribute>
													<xsl:value-of select="index" />
												</div>
											</xsl:if>
											<xsl:if test="today = 'false'">
												<div class="date">
													<xsl:attribute name = "id">
														<xsl:value-of select="index" />
														<!-- write the day's date in the correspondent calendar field  -->
													</xsl:attribute>
													<xsl:value-of select="index" />
												</div>
											</xsl:if>
											<xsl:for-each select="bday">    <!-- xsl loop to get all birthday entries for the displayed days -->
												<a>
													<xsl:attribute name="href">/popup?id=<xsl:value-of select="id" />
													</xsl:attribute>    <!-- birthday entry is designed as a link to the popupview by a /popup route in addition to the birthdays id -->
													<div class="details">
														<xsl:value-of select="name" />
													</div>
												</a>
											</xsl:for-each>
										</li>
									</xsl:if>
									<xsl:if test="inMonth = 'false'">   <!-- xsl if statemnt that checks the value 'inMonth'; if inMonth=false then the affected day will be formatted as a day of another month -->
										<li class="day other-month"></li>
									</xsl:if>
								</xsl:for-each>
							</ul>
						</xsl:for-each>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
