<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">

    <html>

        <head>
            <meta charset="utf-8" />
            <title>Birthday calendar</title>
            <link href="/frontend/css/default.css" type="text/css" rel="stylesheet" />
            <link href="/frontend/css/popup.css" type="text/css" rel="stylesheet" />
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
                    <a href="/calendarview"><button type="button" height="200px" class="button">Calendar</button></a>
                    <a href="/listview"><button type="button" height="200px" class="button">List</button></a>
                    <div class="plus">
                        <a href="/createEntry" class="plus"><img src="/frontend/images/plus.png" width="auto" height="70%" /></a>
                    </div>
                </div>
            </div>

            <div class="content-area">
                <h1><xsl:value-of select="/birthdays/bday/name" />'s Birthday</h1>
                <p>Date:&#160;<xsl:value-of select="/birthdays/bday/day" />.<xsl:value-of select="/birthdays/bday/month" />.</p>
                <p>Note:<br /><xsl:value-of select="/birthdays/bday/notes" /></p>
            </div>
        </body>

    </html>

</xsl:template>
</xsl:stylesheet>