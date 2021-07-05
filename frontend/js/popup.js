function navToEdit(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/edit', true);

  xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("+1")
      window.location.href="/edit"
    }
  }
  xhr.send();

}
