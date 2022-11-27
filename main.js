let searchButton = document.getElementById("search-btn");
let inputField = document.getElementById("searchinput");
let displayMovies = document.getElementById("movielist");
let displayDetails = document.getElementById("moviedetails");

searchButton.addEventListener('click', getMovieName);

function getMovieName() {
    displayDetails.style.display = 'none';
    var movieName = inputField.value;
    loadMovies(movieName);
}

async function loadMovies(movieName) {
    const resultst = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=a8025d49`);
    const data = await resultst.json();
    console.log(data.Response);
    if(data.Response == "True") {
        addMovie(data.Search);
    } else {
        alert("Try something else!");
    }
}    

function addMovie(movieDetails) {
    displayMovies.innerHTML = "";
    inputField.value = "";
    for(var i = 0; i < movieDetails.length; i++)  {
        movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");
        movieInfo.dataset.id = movieDetails[i].imdbID;
        movieInfo.innerHTML = `
        <img src="${movieDetails[i].Poster}"/>
        <p><b>Movie title:</b> ${movieDetails[i].Title}</p>
        <p><b>Year:</b> ${movieDetails[i].Year}</p>
        <p><b>Type:</b> ${movieDetails[i].Type}</p>
        `;
        
        displayMovies.appendChild(movieInfo);
    }
   getDetailedInfo();
}

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

function displayDetailedInfo(movieDetails) {
    displayDetails.style.display = 'block';
    displayDetails.innerHTML = "";
    displayInfo = document.createElement("div");
    displayInfo.classList.add("detailed-info");
    
    displayPoster = document.createElement("div");
    displayPoster.classList.add("movie-poster");
    displayPoster.style.backgroundImage = `<img src="${movieDetails.Poster}"/>`;
    
    displayPoster.innerHTML = `
        <img src="${movieDetails.Poster}"/>
        <div class="header-container">
            <h1>${movieDetails.Title}</h1>
            <p>${movieDetails.Year} · ${movieDetails.Runtime}</p>
            <br><br>
            <p><b>Genre:</b> ${movieDetails.Genre}</p>
            <p><b>Plot:</b> ${movieDetails.Plot} </p>
            <br> 
    `;

    displayDetails.appendChild(displayPoster);
    displayDetails.appendChild(displayInfo);
}
