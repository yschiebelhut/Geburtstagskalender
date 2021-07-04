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

            </div> <!-- /. header -->

            <header>
                <h1>July 2021</h1>
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

                    <ul class="days">
                        <li class="day other-month">
                            <div class="date">28</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">29</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">30</div>
                        </li>

                        <!-- Days in current month -->

                        <li class="day">
                            <div class="date">1</div>
                        </li>
                        <li class="day">
                            <div class="date">2</div>
                            <a href="popup.html">
                                <div class="details">
                                    Tim
                                </div>
                            </a>
                        </li>
                        <li class="day">
                            <div class="date">3</div>
                        </li>
                        <li class="day">
                            <div class="date">4</div>
                        </li>
                    </ul>

                    <!-- Row #2 -->

                    <ul class="days">
                        <li class="day">
                            <div class="date">5</div>
                        </li>
                        <li class="day">
                            <div class="date">6</div>
                        </li>
                        <li class="day">
                            <div class="date">7</div>
                        </li>
                        <li class="day">
                            <div class="date">8</div>
                        </li>
                        <li class="day">
                            <div class="date">9</div>
                        </li>
                        <li class="day">
                            <div class="date">10</div>
                        </li>
                        <li class="day">
                            <div class="date">11</div>
                        </li>
                    </ul>

                    <!-- Row #3 -->

                    <ul class="days">
                        <li class="day">
                            <div class="date">12</div>
                        </li>
                        <li class="day">
                            <div class="date">13</div>
                        </li>
                        <li class="day">
                            <div class="date">14</div>
                        </li>
                        <li class="day">
                            <div class="date">15</div>
                        </li>
                        <li class="day">
                            <div class="date">16</div>
                        </li>
                        <li class="day">
                            <div class="date">17</div>
                        </li>
                        <li class="day">
                            <div class="date">18</div>
                        </li>
                    </ul>

                    <!-- Row #4 -->

                    <ul class="days">
                        <li class="day">
                            <div class="date">19</div>
                        </li>
                        <li class="day">
                            <div class="date">20</div>
                        </li>
                        <li class="day">
                            <div class="date">21</div>
                        </li>
                        <li class="day">
                            <div class="date">22</div>
                        </li>
                        <li class="day">
                            <div class="date">23</div>
                        </li>
                        <li class="day">
                            <div class="date">24</div>
                        </li>
                        <li class="day">
                            <div class="date">25</div>
                        </li>
                    </ul>

                    <!-- Row #5 -->

                    <ul class="days">
                        <li class="day">
                            <div class="date">26</div>
                        </li>
                        <li class="day">
                            <div class="date">27</div>

                        </li>
                        <li class="day">
                            <div class="date">28</div>
                        </li>
                        <li class="day">
                            <div class="date">29</div>
                        </li>
                        <li class="day">
                            <div class="date">30</div>
                        </li>
                        <li class="day">
                            <div class="date">31</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">1</div> <!-- Next Month-->
                        </li>
                    </ul>

                    <!-- Row #6 -->

                    <ul class="days">
                        <li class="day other-month">
                            <div class="date">2</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">3</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">4</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">5</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">6</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">7</div>
                        </li>
                        <li class="day other-month">
                            <div class="date">8</div>
                        </li>
                    </ul>
                </div>

                <div class="button-div">
                    <button class="nextPrivious-button" onclick="nextMonth()">next</button>
                </div>
            </div>
        </body>

    </html>
</xsl:template>
</xsl:stylesheet>