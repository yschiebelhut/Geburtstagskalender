<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>

        <head>
            <meta charset="utf-8" />
            <title>Birthday calendar</title>

            <link href="frontend/css/default.css" type="text/css" rel="stylesheet" />
            <link href="frontend/css/addview.css" type="text/css" rel="stylesheet" />

            <script type="text/javascript" src="/frontend/js/popup.js"></script>
        </head>

        <body>
            <div class="menue"> <!-- header on the page with title and buttons -->
                <div class="menue-box" id="menue-div-buttons">
                    <a href="/calendarview"><button type="button" height="200px" class="button">Calendar</button></a>
                    <a href="/listview"><button type="button" height="200px" class="button">List</button></a>
                </div>
                <div class="menue-box">
                    <h1>My Calendar</h1>
                </div>
                <div class="menue-button-box">
                    <div class="plus">
                        <a href="/createEntry" class="plus"><img src="/frontend/images/plus_v2.png" width="auto"
                                height="70%" /></a>
                    </div>
                </div>
            </div>

            <div class="content-area"> <!-- container for the interaction field of the page -->
                <h1>
                    <xsl:value-of select="/birthdays/bday/name" />'s Birthday <!-- get the name of the person by xslt and display as content title -->
                </h1>
                <p>
                    <input id="name" type="text" name="name" placeholder="Name">
                    <xsl:attribute name="value">
                        <xsl:value-of select="/birthdays/bday/name" /> <!-- input field for the name that gets automatically filled by xslt -->
                    </xsl:attribute>
                    </input>
                </p>
                <p>
                    <input id="date" type="date" name="date" placeholder="Date">
                    <xsl:attribute name="value">
                        <xsl:value-of select="/birthdays/bday/fulldate" /> <!-- date picker that initially is set with the person's day of birth -->
                    </xsl:attribute>
                    </input>
                </p>
                <p>
                    <textarea id="notes" type="text" name="message" rows="8" cols="60" placeholder="Note">
                    <xsl:attribute name="text">
                        <xsl:value-of select="/birthdays/bday/notes"/> <!-- textbox that contains all notes that are written for this birthday entry -->
                    </xsl:attribute>
                    </textarea>
                </p>

                <div class="button-box">
                    <input id="submit" class="form-button" type="submit" value="Delete" /> <!-- the birthday entry will be deleted from the database if the button gets clicked -->
                    <input id="submit" class="form-button" type="submit" value="Change" onclick="sendData()" /> <!-- if data gets changed then the butto will trigger an UPDATE-SQL statement to update the database entry -->
                    <a href="/back"><input id="cancel" class="form-button" type="reset" value="Cancel" /></a> <!-- button leads back to the origin view (list view or calendar view) -->
                </div>
            </div>
        </body>

        </html>
    </xsl:template>
</xsl:stylesheet>