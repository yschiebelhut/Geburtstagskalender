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

        <body>
            <div class="menue">
                <div class="menue-box" id="div-logo">
                    <img src="/frontend/images/logo.png" id="logo" />
                </div>
                <div class="menue-box">
                    <h1>My Calendar</h1>
                </div>
                <div class="menue-button-box">
                    <a href="/listview"><button type="button" height="200px" class="button">List</button></a>
                    <div class="plus">
                        <a href="/createEntry" class="plus"><img src="/frontend/images/plus.png" width="auto" height="70%" /></a>
                    </div>
                </div>
            </div>

            <header>
                <h1><xsl:value-of select="calendar/monthname" />&#160;<xsl:value-of select="calendar/year" /></h1>
            </header>

            <div id="calendar-wrap">

                <div class="button-div">
                    <button class="nextPrivious-button" onclick="previousMonth()">previous</button>
                </div>

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

                    <!-- Days from previous month -->

                    <xsl:for-each select="/calendar/row">
                        
                        <ul class="days">
                        
                            <xsl:for-each select="entry">

                                <xsl:if test="inMonth = 'true'">
                                    <li class="day">
                                        <div class="date"><xsl:value-of select="index" /></div>

                                        <xsl:for-each select="bday">

                                            <a>
                                                <xsl:attribute name="href">/popup?id=<xsl:value-of select="id" /></xsl:attribute>
                                                <div class="details">
                                                    <xsl:value-of select="name" />
                                                </div>
                                            </a>

                                        </xsl:for-each>

                                    </li>
                                </xsl:if>
                                
                                <xsl:if test="inMonth = 'false'">
                                    <li class="day other-month"></li>
                                </xsl:if>


                            </xsl:for-each>

                        </ul>
                    </xsl:for-each>

                </div>

                <div class="button-div">
                    <button class="nextPrivious-button" onclick="nextMonth()">next</button>
                </div>
            </div>
        </body>

    </html>
</xsl:template>
</xsl:stylesheet>