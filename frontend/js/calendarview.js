function previousMonth() {
  //request sever to change month
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/previousMonth', true);

	xhr.onreadystatechange = function () {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      //request to show new month
			window.location.href = "/calendarview"
		}
	}
	xhr.send()
}

function nextMonth() {
  //request sever to change month
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/nextMonth', true);

	xhr.onreadystatechange = function () {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      //request to show new month
			window.location.href = "/calendarview"
		}
	}
	xhr.send();
}
