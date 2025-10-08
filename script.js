function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function hideAlertBlock() {
  // console.log('veikia')
  var x = document.getElementById("alert-box");
    x.style.display = "none";
}

fetch('http://javascript-pirma-pamoka.local/wp-json/wp/v2/posts/')
    .then(response => {
        if (!response.ok) { // Patikriname HTTP klaidas, pvz., 404
            throw new Error(`HTTP klaida! statusas: ${response.status}`);
        }
        return response.json(); // Konvertuoja atsakymą į JSON formatą
    })
    .then(data => {
        // console.log(data[0].content.rendered); // Naudojame gautus duomenis
        document.getElementById('post-1-content').innerHTML = data[0].content.rendered
        document.getElementById('post-2-content').innerHTML = data[1].content.rendered
    })
    .catch(error => {
        console.error('Klaida gaunant duomenis:', error); // Tvarkome tinklo klaidas
    });