function sendData() {
	//collecting data from inputs
	var name = document.getElementById("name").value
	var date = document.getElementById("date").value.split("-")
	var day = date[2]
	var month = date[1]
	var year = date[0]
	var notes = document.getElementById("notes").value

	if (name && day && month && year) {
		var data = {
			name: name,
			day: day,
			month: month,
			year: year,
			notes: notes
		}

		data = JSON.stringify(data)
		console.log(data)
		//send data to backend
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/createEntry', true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				console.log("sent data")
				window.location.href = "/back"
			}
		}
		xhr.send(data);
	} else {
		alert("Please enter at least the name and the birthday of the person.")
	}
}
