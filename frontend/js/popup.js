function navToEdit(){

  var id = window.location.search.split("=")[1]
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/edit', true);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("+1")
      window.location.href="/edit"
    }
  }
  xhr.send(JSON.stringify({id:id}));

}
