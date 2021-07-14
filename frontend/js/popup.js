function sendData() {
  //collecting necessary data
	var url = location.search;

	var name = document.getElementById("name").value
	var date = document.getElementById("date").value.split("-")
	var day = date[2]
	var month = date[1]
	var year = date[0]
	var notes = document.getElementById("notes").value
	var id = url.substring(1).split('=')[1]

	if (name && day && month && year) {
		var data = {
			name: name,
			day: day,
			month: month,
			year: year,
			notes: notes,
			id: id
		}

		data = JSON.stringify(data)
    //request to the backend to edit the entry
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/editEntry', true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				window.location.href = "/back"
			}
		}

		xhr.send(data);
	} else {
		alert("Please enter at least the name and the birthday of the person.")
	}
}
