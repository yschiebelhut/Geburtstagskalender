<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
  <head>
    <title>
      <xsl:value-of select="test"/>
    </title>
    <script type="text/javascript" scr="frontend\js\createEntry.js"></script>
  </head>
  <body>
    <form>
      name
      <input type="text" id="name" name="name" />
      <br />
      day
      <input type="number" id="day" name="day" />
      <br />
      <input type="number" id="month" name="month" />
      <input type="number" id="year" name="year" />
      <input type="text" id="notes" name="notes" />
      <input type="button" id="submit" value="Save" onclick="sendData()" />
      <input type="button" id="cancel" value="Back" onclick="cancel()" />
    </form>
  </body>
</html>
</xsl:template>
</xsl:stylesheet>
