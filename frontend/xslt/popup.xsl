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
            <!-- Header/Menu Start-->
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
							<a href="/calendarview"><img class="calendar" height="70%" src="/frontend/images/icon/Calendar.png" ></img></a> 
					</div>
					<a href="/createEntry" class="plus-btn"><img src="/frontend/images/icon/Add.png" width="auto" height="70%" /></a>
					</div>
				</div>
			</div>
			<!-- Header/Menu End-->

            <!-- Formular-Container-->
            <div class="content-area">
                <h1>
                    <xsl:value-of select="/birthdays/bday/name" />'s Birthday
                </h1>
                <p>
                    <input id="name" type="text" name="name" placeholder="Name">
                    <xsl:attribute name="value">
                        <xsl:value-of select="/birthdays/bday/name" />
                    </xsl:attribute>
                    </input>
                </p>
                <p>
                    <input id="date" type="date" name="date" placeholder="Date">
                    <xsl:attribute name="value">
                        <xsl:value-of select="/birthdays/bday/fulldate" />
                    </xsl:attribute>
                    </input>
                </p>
                <p>
                    <textarea id="notes" type="text" name="message" rows="8" cols="60" placeholder="Note">
                    <xsl:attribute name="text">
                        <xsl:value-of select="/birthdays/bday/notes"/>
                    </xsl:attribute>
                    </textarea>
                </p>

                <div class="button-box">
                    <input id="submit" class="form-button" type="submit" value="Delete" />
                    <input id="submit" class="form-button" type="submit" value="Change" onclick="sendData()" />
                    <a href="/back"><input id="cancel" class="form-button" type="reset" value="Cancel" /></a>
                </div>
            </div>
        </body>

        </html>
    </xsl:template>
</xsl:stylesheet>