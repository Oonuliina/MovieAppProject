let searchButton = document.getElementById("search-btn");
let inputField = document.getElementById("searchinput");
let displayMovies = document.getElementById("movielist");
let displayDetails = document.getElementById("moviedetails");

//kuuntelija haku-napille
searchButton.addEventListener('click', getMovieName);

//kysytään käyttäjältä minkä nimistä elokuvaa/sarjaa haetaan
function getMovieName() {
    displayDetails.style.display = 'none';
    var movieName = inputField.value;
    loadMovies(movieName);
}

//haetaan elokuva(t) OMdb tietokannasta
async function loadMovies(movieName) {
    const resultst = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=a8025d49`);
    const data = await resultst.json();
    if(data.Response == "True") {
        addMovie(data.Search);
    } else {
        alert("Try something else!");
    }
}    
// lisätään löydetyt elokuvat ja tietoja niistä hakutuloksiin
function addMovie(movie) {
    displayMovies.innerHTML = "";
    inputField.value = "";
    for(var i = 0; i < 8; i++)  {
        movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");
        movieInfo.dataset.id = movie[i].imdbID;
        
        if(movie[i].Poster === "N/A") {
            poster = "placeholder.png";
        } else {
            poster = movie[i].Poster;
        }
    
        movieInfo.innerHTML = `
        <img src="${poster}"/>
        <p><b>Movie title:</b> ${movie[i].Title}</p>
        <p><b>Year:</b> ${movie[i].Year}</p>
        <p><b>Type:</b> ${movie[i].Type}</p>
        `;

        if(movie[i].Type === "movie" || movie[i].Type === "series") {
            displayMovies.appendChild(movieInfo);

        } 
    }
   getDetailedInfo();
}
// Kun elokuvasta klikkaa, siitä saa lisätietoja, haetaan lisätiedot elokuvan ID:n perusteella tietokanssasta
function getDetailedInfo() {
    const movies = displayMovies.querySelectorAll('.movie-info');
        movies.forEach(movie => {
            movie.addEventListener('click', async () => {
                const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=a8025d49`);
                const data = await result.json();
                displayDetailedInfo(data);
            });
        });
}
// näytetään halutun elokuvan lisätiedot
function displayDetailedInfo(movieDetails) {
    displayDetails.style.display = 'block';
    displayDetails.style.backgroundColor = "#1B1B1B";
    displayDetails.innerHTML = "";
    displayInfo = document.createElement("div");
    displayInfo.classList.add("detailed-info");

    if(movieDetails.Poster === "N/A") {
        poster = "placeholder.png";
    } else {
        poster = movieDetails.Poster;
    }

    displayDetails.innerHTML = `
        <div class="poster-container">
            <img src="${poster}"/>
        <div class="header-container">
            <h1>${movieDetails.Title}</h1>
            <p>${movieDetails.Year} · ${movieDetails.Runtime}  · ${movieDetails.Rated}</p>
            <br>
            <p class="genre"> ${movieDetails.Genre}</p>
            <p class="plot"> ${movieDetails.Plot} </p>
            <p class="language"> ${movieDetails.Language}</p> 
            <p class="rating"> ${movieDetails.Ratings[0].Value}</p>
    `;

    displayDetails.appendChild(displayInfo);
}
