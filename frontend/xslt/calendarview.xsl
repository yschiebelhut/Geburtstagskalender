<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Birthday calendar</title>
            <link href="/frontend/css/default.css" type="text/css" rel="stylesheet" />
            <link href="/frontend/css/calendarview.css" type="text/css" rel="stylesheet" />
            <script src="/frontend/js/calendarview.js"></script>
        </head>

        <body onload = "showToday()">
            <!-- header on the page with title and buttons -->
			<div class="menue">
				<div class="menue-box">
					<h1 id="calendar_title" >My Calendar</h1>
				</div>
				<div class="menue-box">
					<a href="/today"><h3>6 July 2021</h3></a>
				</div>
				<div class="menue-button-box">
					<div class="plus">
						<div id="menue-div-buttons">
						<a href="/listview"><img height="70%" class="list" src="/frontend/images/icon/List.png"></img></a>
						<a ><img class="calendar" height="70%" src="/frontend/images/icon/marked_Calendar.png" ></img></a> 
					    </div>
					<a href="/createEntry" class="plus-btn"><img src="/frontend/images/icon/Add.png" width="auto" height="70%" /></a>
					</div>
				</div>
			</div>
			<!-- Header/Menu End-->

            <header>
                <div class="today-area">
                     
                    <a onclick="previousMonth()" ><img height="40%" class="next-previous-button" src="/frontend/images/icon/Previous.png"></img></a>
                  
                    <h1><xsl:value-of select="calendar/monthname" />&#160;<xsl:value-of select="calendar/year" /></h1>
                    <!-- <a href="/today" ><button class="changeMonth-button" id="today-button">today</button></a> -->
                    <a onclick="nextMonth()" ><img height="40%" class="next-previous-button" src="/frontend/images/icon/Next.png"></img></a>
                    
                </div>

            </header>

            <div id="calendar-wrap">

                

                <!-- calendar header line with all weekdays -->
                <div id="calendar">
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
                    <xsl:for-each select="/calendar/row"> <!-- xsl loop for the calendar's rows -->
                        <ul class="days">
                            <xsl:for-each select="entry"> <!-- xsl loop for the calendar's day -->
                                <xsl:if test="inMonth = 'true'"> <!-- xsl if statement that checks value 'inMonth'; if inMonth=true then the day will be formatted as a day of the current month  -->
                                    <li class="day">
                                        <div class="date">
                                          <xsl:attribute name = "id">
                                            <xsl:value-of select="index" /> <!-- write the day's date in the correspondent calendar field  -->
                                          </xsl:attribute>
                                          <xsl:value-of select="index" />
                                        </div>

                                        <xsl:for-each select="bday"> <!-- xsl loop to get all birthday entries for the displayed days -->
                                            <a>
                                                <xsl:attribute name="href">/popup?id=<xsl:value-of select="id" /></xsl:attribute> <!-- birthday entry is designed as a link to the popupview by a /popup route in addition to the birthdays id -->
                                                <div class="details">
                                                    <xsl:value-of select="name" />
                                                </div>
                                            </a>
                                        </xsl:for-each>
                                    </li>
                                </xsl:if>

                                <xsl:if test="inMonth = 'false'"> <!-- xsl if statemnt that checks the value 'inMonth'; if inMonth=false then the affected day will be formatted as a day of another month -->
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
