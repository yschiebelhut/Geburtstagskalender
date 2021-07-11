<?xml version="1.0" encoding="UTF-8"?>
	<xsl:stylesheet version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
		<xsl:template match="/">
			<html>
				 <!-- Header/menu start-->
				<head>
					<meta charset="utf-8" />
					<title>Birthday Calendar</title>

					<link href="/frontend/css/default.css" type="text/css" rel="stylesheet" />
					<link href="/frontend/css/addview.css" type="text/css" rel="stylesheet" />

					<script type="text/javascript" src="/frontend/js/createEntry.js" />
				</head>

				<body>
					<div class="menu">	<!-- header on the page with title and buttons -->
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
										<img height="70%" class="list" src="/frontend/images/icon/List.png"></img>
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
					<div class="content-area">	<!-- content area of the page -->
						<a href="/back">
							<img class="close" src="/frontend/images/icon/Close.png" />
						</a>	<!-- button that leads back to the origin page -->
						<div class="heading-area">
							<h1>Create new Birthday</h1>
						</div>
						<!-- input fields to create a brithday entry: name, date of birth and notes -->
						<p>
							<input class="input" id="name" type="text" name="name" placeholder="Name" />
						</p>
						<p>
							<input class="input" id="date" type="date" name="date" placeholder="Date" />
						</p>
						<p>
							<textarea id="notes" type="text" name="message" placeholder="Note" />
						</p>
						<input class="create-btn" type="submit" name="save" value="    Create" onclick="sendData()" />
						<!-- create button that triggers and INSERT-SQL statement to create a brithday entry in the database -->
					</div>
				</body>
			</html>
	</xsl:template>
</xsl:stylesheet>