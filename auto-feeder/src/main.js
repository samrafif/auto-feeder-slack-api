const btn_small = document.getElementById("btn_small");
const btn_medium = document.getElementById("btn_medium");
const btn_big = document.getElementById("btn_big");

btn_small.addEventListener("click", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/feed-now", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    content: "small"
  }));
  alertify.message("Your pet has been fed a small serving 🐈");
});

btn_medium.addEventListener("click", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/feed-now", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    content: "medium"
  }));
  alertify.message("Your pet has been fed a medium serving 😺");
});

btn_big.addEventListener("click", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/feed-now", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    content: "large"
  }));
  alertify.message("Your pet has been fed a large serving 😸");
});