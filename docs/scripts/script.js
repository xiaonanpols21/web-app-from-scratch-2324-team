// loading state
document.addEventListener("DOMContentLoaded", function () { //Laat de DOM eerst inladen
    setTimeout(function () {
        hideLoading(); 
    }, 1000); // 1 sec wachten tot we hideLoading functie aanroepen
});

function hideLoading() { // functie voor hideLoading
    var loadingContainer = document.getElementById("loadingContainer"); // defineer de loading container met de id: loading container 
    var content = document.querySelector("main"); // haal de content "main" op

    loadingContainer.style.display = "none"; // verberg dan de loading container 
    content.style.display = "grid"; // toon de content in grid stijl
}

async function siteInfo() { //Functie die de JSON file gaat ophalen en waardes gaat veranderen
    const response = await fetch("team.json"); //Maakt de variabele response aan door het JSON bestand te fetchen (en te wachten tot het binnen is doormiddel van await)
    const siteJson = await response.json(); //Zet het JSON bestand wat binnen komt als text om naar een JSON
    // document.getElementById('namePlaceholder').innerText = siteJson.name; //Zoekt het element met de Id namePlaceholder op en past de waarde aan gebaseerd op wat er in de variabele siteJson staat met de key (idk of het ook zo heet in JSON) name
    // console.log(siteJson)

    //Voer de functie uit als de data is ingeladen
    personalInfoData(siteJson); 
    muziekData(siteJson);
}
siteInfo() //Voert de functie uit 

// Bron: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
function personalInfoData(siteJson) { //Maak een functie met als parameter de data.
    const personalInfoSection = document.querySelector(".personalInfo"); // Select de dom van waar de content moet omen

    Object.values(siteJson.members).forEach(item => { // Doe een foreach op de mensen array

        // Maak variables aan met de juiste data die opgehaald moet worden
        const name = item.name;
        const img = item.image;
        const date = item.geboortedatum;
        const city = item.woonplaats;
        const genre = item.favoriet_genre;

        // Maak een variable html aan om een soort van template te maken can de dom.
        const html = 
        `
        <article>
            <h3>${name}</h3>
            <ul>
                <li>${date}</li>
                <li>${city}</li>
                <li>${genre}</li>
            </ul>
            <img src="${img}" alt="${name}">
        </article>
        `;
        personalInfoSection.insertAdjacentHTML("beforeend", html);
    });

    // Met ${} plaats je de data op de juiste plek.
    // insertAdjacentHTML is een methode om html tekst toe te voegen. beforeend is een parameter die zegt waar de html gezet moet worden. 
};

// Bron: Chatgpt
// Zie prompts: https://chemical-bunny-323.notion.site/Chat-GPT-Documentatie-d93ea570990b4754bec559e9bfcc2217#0c8f89c5cf764153b708b3542425c72f
function muziekData(siteJson) {
    const songsSection = document.querySelector(".songs");

    siteJson.members.forEach(user => { // Zoe een foreach op de users
        user.tracks.forEach(item => { // Doe een foreach op tracks van elke user
            const name = item.name;
            const artist = item.artists[0].name;
            const album = item.album.name;
            const year = item.album.release_date;
            const img = item.album.images[1].url;
            const genre = item.album.genre;
            const userImg = user.image; 
            const userName = user.name; 

            const html = 
            ` 
            <article>
                <h2>${name}</h2>
                <ul>
                    <li>Artist: ${artist}</li>
                    <li>Album: ${album} - ${year}</li>
                </ul>
                <h3>${genre}</h3>
                <div>
                    <img src="${img}" alt="${name}">
                    <div>
                        <div></div>
                    </div>
                    <img src="${userImg}" alt="${userName}">
                </div>
                <div></div>
                <img src="${img}" alt="${name}">
            </article>
            `;
            songsSection.insertAdjacentHTML("beforeend", html);
        });
    });
}

