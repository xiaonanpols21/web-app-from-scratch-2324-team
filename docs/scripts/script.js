// loading state
document.addEventListener("DOMContentLoaded", function () {
  //Laat de DOM eerst inladen
  setTimeout(function () {
    hideLoading();
  }, 1000); // 1 sec wachten tot we hideLoading functie aanroepen
});

function hideLoading() {
  // functie voor hideLoading
  var loadingContainer = document.getElementById("loadingContainer"); // defineer de loading container met de id: loading container
  var content = document.querySelector("main"); // haal de content "main" op

  loadingContainer.style.display = "none"; // verberg dan de loading container
  content.style.display = "grid"; // toon de content in grid stijl
}

async function siteInfo() {
  //Functie die de JSON file gaat ophalen en waardes gaat veranderen
  const response = await fetch("team.json"); //Maakt de variabele response aan door het JSON bestand te fetchen (en te wachten tot het binnen is doormiddel van await)
  const siteJson = await response.json(); //Zet het JSON bestand wat binnen komt als text om naar een JSON
  // document.getElementById('namePlaceholder').innerText = siteJson.name; //Zoekt het element met de Id namePlaceholder op en past de waarde aan gebaseerd op wat er in de variabele siteJson staat met de key (idk of het ook zo heet in JSON) name
  // console.log(siteJson)

  //Voer de functie uit als de data is ingeladen

  // Plaats dit op een plek zoals een functie die de data kan ontvangen of al heeft bijv listenSort()
  document.getElementById("sort").addEventListener("change", function () {
    const sortBy = this.value;
    const filterBy = document.getElementById("filter").value;
    muziekData(siteJson, sortBy, filterBy);
  });
  document.getElementById("filter").addEventListener("change", function () {
    const filterBy = this.value;
    const sortBy = document.getElementById("sort").value;
    muziekData(siteJson, sortBy, filterBy);
  });
  
  personalInfoData(siteJson);
  muziekData(siteJson);
}
togglePlayPauze()

// Bron: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
function personalInfoData(siteJson) {
  //Maak een functie met als parameter de data.
  const personalInfoSection = document.querySelector(".personalInfo"); // Select de dom van waar de content moet omen

  Object.values(siteJson.members).forEach((item) => {
    // Doe een foreach op de mensen array

    // Maak variables aan met de juiste data die opgehaald moet worden
    const name = item.name;
    const img = item.image;
    const date = item.geboortedatum;
    const city = item.woonplaats;
    const genre = item.favoriet_genre;

    // Maak een variable html aan om een soort van template te maken can de dom.
    const html = `
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
}

// Bron: Chatgpt
// Zie prompts: https://chemical-bunny-323.notion.site/Chat-GPT-Documentatie-d93ea570990b4754bec559e9bfcc2217#0c8f89c5cf764153b708b3542425c72f
function muziekData(siteJson, sortBy, filterBy) {
  const songsSection = document.querySelector(".songList"); // Kies een element waar de songs in moeten en zorg dat die semantisch beschrijft wat het moet zijn

  //localiseer de plek waar de nummers moeten staan
  const allTracks = siteJson.members.flatMap((user) => user.tracks); //alle tracks worden opgehaald uit de Json
  const sortedTracks = sortTracks(allTracks, sortBy);
  const sortedFilteredTracks = filterTracks(sortedTracks, filterBy);
  //console.log("Songs sorted by " + sortBy + " and filtered by " + filterBy);

  songsSection.innerHTML = "";
  console.log(sortedFilteredTracks);
  sortedFilteredTracks.forEach((item) => {
    //forEach loop om van elk nummer de benodigde info op te halen
    const name = item.name;
    const artist = item.artists[0].name;
    const album = item.album.name;
    const year = item.album.release_date;
    const img = item.album.images[1].url;
    const genre = item.album.genre;
    const user = siteJson.members.find((member) =>
      member.tracks.includes(item)
    ); // de users worden opgehaald om bij elk nummer de user weer te geven
    const userImg = user.image;
    const userName = user.name;
    const previewUrl = item.preview_url

    const html = ` 
            <article class="song">
            <audio id="audioPreview" src=${previewUrl} preload="auto"></audio>
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
            `; // de info van de nummers worden geplaatst in de html
    songsSection.insertAdjacentHTML("beforeend", html);
  });
}

function sortTracks(tracks, sortBy) {
  //functie om de tracks te sorteren
  if (sortBy === "releasedate") {
    return tracks.sort((a, b) =>
      a.album.release_date.localeCompare(b.album.release_date)
    ); //maakt een nieuwe array aan gesorteerd op release
  } else if (sortBy === "streams") {
    //door de popularity te vergelijken kan je sorteren op streams
    return tracks.sort((a, b) => {
      const popularityA = String(a.popularity); //van beide waardes moet een string gemaakt worden
      const popularityB = String(b.popularity);
      return popularityB.localeCompare(popularityA); //waardes omgedraaid zodat meest populair bovenaan staat
    });
  } else {
    return tracks.sort((a, b) => a.name.localeCompare(b.name)); // anders op alfabet sorteren
  }
}

function filterTracks(sortedTracks, filterBy) {
  //functie om de tracks te filteren
  if (filterBy === "hiphop") {
    // if statements per genre
    const sortedFilteredTracks = sortedTracks.filter(
      (track) => track.album.genre === "Hip-hop" //de tracks worden gefilterd en gereturned
    );
    return sortedFilteredTracks;
  }
  if (filterBy === "kpop") {
    const sortedFilteredTracks = sortedTracks.filter(
      (track) => track.album.genre === "K-pop"
    );
    return sortedFilteredTracks;
  }
  if (filterBy === "latin") {
    const sortedFilteredTracks = sortedTracks.filter(
      (track) => track.album.genre === "Latin"
    );
    return sortedFilteredTracks;
  }
  if (filterBy === "pop") {
    const sortedFilteredTracks = sortedTracks.filter(
      (track) => track.album.genre === "Pop"
    );
    return sortedFilteredTracks;
  }
  if (filterBy === "techno") {
    const sortedFilteredTracks = sortedTracks.filter(
      (track) => track.album.genre === "Techno"
    );
    return sortedFilteredTracks;
  } else {
    return sortedTracks; //geen filter geselecteerd betekent alle nummers tonen
  }
}

async function togglePlayPauze(){ //Functie om de muziek af te spelen, te pauzeren en de class playing toe te voegen of te verwijderen.
  await siteInfo(); //Wacht tot de siteInfo functie is uitgevoerd zodat alle html is ingeladen
  const allSongs = document.querySelectorAll('.song'); //selecteerd alle items met de class song
  allSongs.forEach(song => { //Loopt door alle items heen
      song.addEventListener("click", function(){ //Voegt een eventlistener toe aan elk item
          const audio = song.querySelector('audio'); //Selecteerd de audio van het item
          if(audio.paused){  //Als de audio gepauzeerd is
              allSongs.forEach(s => { //Loopt nog een keer door alle songs heen
                  s.classList.remove('playing'); //Verwijderd de class playing van alle songs zodat alleen de song die afgespeeld wordt de class playing heeft
                  s.querySelector('audio').pause(); //Pauzeerd alle audio
              });
              audio.play(); //Speelt de audio waar op geklikt is af
              song.classList.add('playing'); //Voegt de class playing toe aan de song waar op geklikt is
          }else{
              audio.pause(); //Pauzeerd de audio waar op geklikt is
              song.classList.remove('playing'); //Verwijderd de class playing van de song waar op geklikt is
          }
      })
  });
}
