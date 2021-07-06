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
            <div class="menue"> <!-- header on the page with title and buttons -->
                <div class="menue-box" id="menue-div-buttons">
                    <a href="/listview"><button type="button" height="200px" class="button">List</button></a>
                </div>
                <div class="menue-box">
                    <h1>My Calendar</h1>
                </div>
                <div class="menue-button-box">
                    <div class="plus"> 
                        <a href="/createEntry" class="plus"><img src="/frontend/images/plus_v2.png" width="auto" height="70%" /></a> <!-- button to create a new entry for the birthday calendar by linking to the /createEntry route -->
                    </div>
                </div>
            </div>

            <header>
                <div class="today-area">
                    <h1><xsl:value-of select="calendar/monthname" />&#160;<xsl:value-of select="calendar/year" /></h1> <!-- displays the month the calendar is currently showing -->
                    <a href="/today" ><button class="changeMonth-button" id="today-button">today</button></a> <!-- button that always leads back to the month of the current date in calendarview when being clicked -->
                </div>

            </header>

            <div id="calendar-wrap">
                <div class="button-div"> <!-- button to switch to the calendarview for the previous month  -->
                    <button class="changeMonth-button next-previous-button" onclick="previousMonth()"><img src="/frontend/images/previous.png" width="100px" height="auto"/></button>
                </div>

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

                <div class="button-div"> <!-- button to switch to the calendarview for the next month -->
                    <button class="changeMonth-button next-previous-button" onclick="nextMonth()"><img src="/frontend/images/next.png" width="100px" height="auto"/></button>
                </div>
            </div>
        </body>
    </html>
</xsl:template>
</xsl:stylesheet>
