<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">

    <html>

        <head>
            <meta charset="utf-8" />
            <title>Birthday calendar</title>
            <link href="../css/default.css" type="text/css" rel="stylesheet" />
            <link href="../css/popup.css" type="text/css" rel="stylesheet" />
        </head>

        <body>
            <div class="menue">
                <div class="menue-box" id="div-logo">
                    <img src="../images/logo.png" id="logo" />
                </div>
                <div class="menue-box">
                    <h1>My Calendar</h1>
                </div>
                <div class="menue-button-box">
                    <a href="/calendar"><button type="button" height="200px" class="button">Calendar</button></a>
                    <a href="/listview"><button type="button" height="200px" class="button">List</button></a>
                    <div class="plus">
                        <a href="/createEntry" class="plus"><img src="../images/plus.png" width="auto" height="70%" /></a>
                    </div>
                </div>
            </div>

            <div class="content-area">
                <h1>Tim's Geburtstag</h1>
                <p>Date: 02.07.</p>
                <p>Note: <br> Geburtstagsfeier am 04.07. <br>Kuchen backen</p>
            </div>
        </body>

    </html>

</xsl:template>
</xsl:stylesheet>