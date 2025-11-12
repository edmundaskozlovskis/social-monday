fetch('http://javascript-pirma-pamoka.local/wp-json/wp/v2/pages/61')
    .then(response => {
        if (!response.ok) { // Patikriname HTTP klaidas, pvz., 404
            throw new Error(`HTTP klaida! statusas: ${response.status}`);
        }
        return response.json(); // Konvertuoja atsakymą į JSON formatą
    })
    .then(data => {

        let userProfile = "";
        userProfile = data.content.rendered  
        
        document.getElementById('user-profile').innerHTML = userProfile
    })
    .catch(error => {
        console.error('Klaida gaunant duomenis:', error); // Tvarkome tinklo klaidas
    });