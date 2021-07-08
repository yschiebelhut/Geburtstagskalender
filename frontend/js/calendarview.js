function previousMonth(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/previousMonth', true);

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.href="/calendarview"
        }
    }
    xhr.send()
}

function nextMonth(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/nextMonth', true);

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.href="/calendarview"
        }
    }
    xhr.send();
}

function showToday(){
    var requested = window.location.search
    var today = new Date()
    var day = Math.floor(today.toDateString().split(" ")[2])
    var month=today.getMonth()
    {
        document.getElementById(day).setAttribute("style", "border:2px white;  background-color: white; color: rgba(255, 0, 76, 1);;")
    }
}