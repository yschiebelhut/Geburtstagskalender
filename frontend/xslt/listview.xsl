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
            <!-- header on the page with title and buttons -->
            <div class="menue">
                <div class="menue-box" id="menue-div-buttons">
                    <a href="/calendarview"><button type="button" height="200px" class="button">Calendar</button></a>
                </div>
                <div class="menue-box">
                    <h1>My Calendar</h1>
                </div>
                <div class="menue-button-box">
                    <div class="plus">
                        <a href="/createEntry" class="plus"><img src="/frontend/images/plus_v2.png" width="auto" height="70%" /></a>
                    </div>
                </div>
            </div>
            
            <div class="list">
                <h2><xsl:value-of select="birthdays/day" />&#160;<xsl:value-of select="birthdays/monthname" />&#160;<xsl:value-of select="birthdays/year"/></h2> <!-- displays the current date by getting the data via xslt -->

                <xsl:for-each select="birthdays/bday"> <!-- xsl loop to display all birthday entries for the coming year -->

                    <a>
                        <xsl:attribute name="href">/popup?id=<xsl:value-of select="id" /></xsl:attribute> <!-- every birthday entry is build as a link to the detail and update page while passing the entry's id -->
                        
                        <div class="list-element"> <!-- birthday entry contains the name of a person, the date of the next birthday and the days left until the birthday -->
                            <div class="date">
                                <xsl:value-of select="day" />.<xsl:value-of select="month" />.<xsl:value-of select="year" />
                            </div>
                            <div class="name">
                                <xsl:value-of select="name" />
                            </div>
                            <div class="countdown">
                                <xsl:value-of select="daysleft" /> days
                            </div>
                        </div>
                    </a>

                </xsl:for-each>
            </div>
        </body>

    </html>

</xsl:template>
</xsl:stylesheet>