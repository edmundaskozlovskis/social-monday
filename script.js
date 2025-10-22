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



fetch('http://javascript-pirma-pamoka.local/wp-json/wp/v2/users')
    .then(response => {
        if (!response.ok) { // Patikriname HTTP klaidas, pvz., 404
            throw new Error(`HTTP klaida! statusas: ${response.status}`);
        }
        return response.json(); // Konvertuoja atsakymą į JSON formatą
    })
    .then(data => {
        let profileText = "";
      let textDescript = data[0].description
      let splitText = textDescript.split("*")
      // console.log(splitText)
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
          // console.log(postDateYear[0])
            // text += '<h2>' + data[i].title.rendered + "</h2><br>" + '<div>' + data[i].excerpt.rendered + '</div><hr>';
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