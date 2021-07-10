function previousMonth() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/previousMonth', true);

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.href = "/calendarview"
        }
    }
    xhr.send()
}

function nextMonth() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/nextMonth', true);

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.href = "/calendarview"
        }
    }
    xhr.send();
}
