function previousMonth(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/previousMonth', true);

  xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("-1")
      }
    }
  xhr.send();

  xhr = new XMLHttpRequest();
  xhr.open("GET", '/', true);
  xhr.send();
}

function nextMonth(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/nextMonth', true);

  xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("+1")
      }
    }
  xhr.send("{}");

  xhr = new XMLHttpRequest();
  xhr.open("GET", '/', true);
  xhr.send();
}
