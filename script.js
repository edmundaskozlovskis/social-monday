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
  var x = document.getElementById("alert-box");
    x.style.display = "none";
}



fetch('http://javascript-pirma-pamoka.local/wp-json/wp/v2/users')
    .then(response => {
        if (!response.ok) { // Patikriname HTTP klaidas, pvz., 404
            throw new Error(`HTTP klaida! statusas: ${response.status}`);
        }
        return response.json(); // Konvertuoja atsakymą į JSON formatą
    })
    .then(data => {
        let profileText = "";
        let topAvatart = ''
        let textDescript = data[0].description
        let splitText = textDescript.split("*")
        
        profileText = `<div class="card-container">
                           <h4>My profile</h4>
                           <img width="106" height="106" src="${data[0].simple_local_avatar[128]}" alt="Profile image">
                           <hr>
                           <p>
                               <i class="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>
                               ${splitText[0]}
                           </p>
                           <p>
                               <i class="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>
                               ${splitText[1]}
                           </p>
                           <p>
                               <i class="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i>
                               ${splitText[2]}
                           </p>
                       </div>`  
          
        document.getElementById('profile').innerHTML = profileText

        topAvatart = `<img width="23" height="23" src="${data[0].simple_local_avatar[128]}" alt="Avataro paveiksliukas">`

        document.getElementById('top-avatar').innerHTML = topAvatart
    })
    .catch(error => {
        console.error('Klaida gaunant duomenis:', error); // Tvarkome tinklo klaidas
    });


fetch('http://javascript-pirma-pamoka.local/wp-json/wp/v2/posts?_embed')
    .then(response => {
        if (!response.ok) { // Patikriname HTTP klaidas, pvz., 404
            throw new Error(`HTTP klaida! statusas: ${response.status}`);
        }
        return response.json(); // Konvertuoja atsakymą į JSON formatą
    })
    .then(data => {
        let len = data.length

        let text = "";
        for (let i = 0; i < len; i++) {
          let postDate = data[i].date
          let postDateYear = postDate.split("T")
            text += `<div class="card-container">
                        <br>
                        <div class="post-top">
                            <div>
                                <img class="avatar-img" width="60" height="60" src="${data[i]._embedded['author'][0].simple_local_avatar[64]}" alt="Avatar image">
                                <h4>${data[i]._embedded['author'][0].name}</h4>
                            </div>
                            <span>${postDateYear[0]}</span>
                        </div>
                        <br>
                        <hr>
                        <div id="post-1-content"></div>
                        <h3>${data[i].title.rendered}</h3>
                        <div class="one-img-block">
                            <div>
                                <img alt="${data[i]._embedded['wp:featuredmedia'] ? data[i]._embedded['wp:featuredmedia'][0].title.rendered : '' }" src="${data[i]._embedded['wp:featuredmedia'] ? data[i]._embedded['wp:featuredmedia'][0].source_url : ''}">
                            </div>
                        </div>
                        ${data[i].excerpt.rendered}
                        <button><i class="fa fa-thumbs-up"></i> Like</button>
                        <button><i class="fa fa-comment"></i> Comments</button>
                    </div>`  
          }
        document.getElementById('demo').innerHTML = text
    })
    .catch(error => {
        console.error('Klaida gaunant duomenis:', error); // Tvarkome tinklo klaidas
    });


// Upcoming events
fetch('http://javascript-pirma-pamoka.local/wp-json/wp/v2/event?_embed')
    .then(response => {
        if (!response.ok) { // Patikriname HTTP klaidas, pvz., 404
            throw new Error(`HTTP klaida! statusas: ${response.status}`);
        }
        return response.json(); // Konvertuoja atsakymą į JSON formatą
    })
    .then(data => {
        let upcomingEventText = "";
            upcomingEventText = `<img width="196" src="${data[0].featured_media ? data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : ''}" alt="${data[0].title.rendered} image">
                                <p>
                                    <strong>${data[0].title.rendered}</strong>
                                </p>
                                <p>${data[0].acf.date}</p>
                                `  
        
            document.getElementById('description').innerHTML = data[0].content.rendered

            // Get the button that opens the modal
            var btn = document.getElementById("myBtn");
            // Get the modal
            var modal = document.getElementById("myModal");


            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            btn.onclick = function() {
            modal.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            }
            
        document.getElementById('upcoming-events').innerHTML = upcomingEventText
    })
    .catch(error => {
        console.error('Klaida gaunant duomenis:', error); // Tvarkome tinklo klaidas
    });


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    let lat = position.coords.latitude 
    let lon = position.coords.longitude

    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon +'&appid=984cf4449f9bcbfb1c23f16997544f79&units=metric')
        .then(response => {
            if (!response.ok) { // Patikriname HTTP klaidas, pvz., 404
                throw new Error(`HTTP klaida! statusas: ${response.status}`);
            }
            return response.json(); // Konvertuoja atsakymą į JSON formatą
        })
        .then(data => {
            let weatherInfo = "";
            let temp = data.main.temp
            weatherInfo = `<img src="images/${data.weather[0].icon}.png" alt="${data.weather[0].main} image">
                        <p>${data.sys.country}, ${data.name}</p>
                        <p>${temp.toFixed()} °C</p>`  
            
            document.getElementById('weather').innerHTML = weatherInfo
        })
        .catch(error => {
            console.error('Klaida gaunant duomenis:', error); // Tvarkome tinklo klaidas
        });

}

getLocation()


