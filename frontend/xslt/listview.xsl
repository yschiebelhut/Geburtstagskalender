<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">

    <html>

        <head>
            <meta charset="utf-8" />
            <title>Birthday calendar</title>
            <link href="/frontend/css/default.css" type="text/css" rel="stylesheet" />
            <link href="/frontend/css/listview.css" type="text/css" rel="stylesheet" />
        </head>

        <body>
            <!-- Menue-Leiste -->
            <div class="menue">
                <div class="menue-box" id="div-logo">
                    <img src="/frontend/images/logo.png" id="logo" />
                </div>
                <div class="menue-box">
                    <h1>My Calendar</h1>
                </div>
                <div class="menue-button-box">
                    <a href="/calendar"><button type="button" height="200px" class="button">Calendar</button></a>
                    <div class="plus">
                        <a href="/createEntry" class="plus"><img src="/frontend/images/plus.png" width="auto" height="70%" /></a>
                    </div>
                </div>
            </div>
            

            <!-- Listen-Container-->
            <div class="list">
                <a href="/frontend/html/popup.html">
                    <div class="list-element">
                        <div class="date">
                            24.05
                        </div>
                        <div class="name">
                            Tim Köppfel
                        </div>
                        <div class="countdown">
                            3 days
                        </div>
                    </div>
                </a>
                <a href="/frontend/html/popup.html">
                    <div class="list-element">
                        <div class="date">
                            24.05
                        </div>
                        <div class="name">
                            Tim Köppfel
                        </div>
                        <div class="countdown">
                            3 days
                        </div>
                    </div>
                </a>
                <a href="/frontend/html/popup.html">
                    <div class="list-element">
                        <div class="date">
                            24.05
                        </div>
                        <div class="name">
                            Tim Köppfel
                        </div>
                        <div class="countdown">
                            3 days
                        </div>
                    </div>
                </a>
                <a href="/frontend/html/popup.html">
                    <div class="list-element">
                        <div class="date">
                            24.05
                        </div>
                        <div class="name">
                            Tim Köppfel
                        </div>
                        <div class="countdown">
                            3 days
                        </div>
                    </div>
                </a>
            </div>
        </body>

    </html>

</xsl:template>
</xsl:stylesheet>