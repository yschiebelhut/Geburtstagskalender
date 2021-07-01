function sendData(){
  var name = document.getElementById("name").value
  var day = document.getElementById("day").value
  var month = document.getElementById("name").value
  var year = document.getElementById("day").value
  var notes = document.getElementById("name").value

  var data = {
    name : name,
    day : day,
    month : month,
    year : year,
    notes : notes
  }
  data = JSON.stringify(data)
  console.log(data)

  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/createEntry', true);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("sent data")
      }
    }
    xhr.send(data);
}
