let searchButton = document.getElementById("search-btn");
let inputField = document.getElementById("searchinput");
let displayMovies = document.getElementById("movielist");

searchButton.addEventListener('click', getMovieName);



//const apikey = "a8025d49";
//let url = "http://www.omdbapi.com/?apikey=" + apikey;
function getMovieName() {
    var movieName = inputField.value;
    loadMovies(movieName);
}

async function loadMovies(movieName) {
    const URL = `http://www.omdbapi.com/?s=${movieName}&apikey=a8025d49`;
    const resultst = await fetch(URL);
    const data = await resultst.json();
    const obj = data.Search;
    addMovie(obj);

/*      if(data.Response = "True") {
        showMovies(data.Search);
    }  */
}



function addMovie(movieDetails) {
    inputField.value = "";
    for(var i = 0; i < movieDetails.length; i++)  {
        movieInfo = document.createElement("div");
        movieInfo.innerHTML = `
        <p>${movieDetails[i].Title}</p>
        <p>${movieDetails[i].Year}</p>
        <p>${movieDetails[i].Type}</p>
        <img src="${movieDetails[i].Poster}"/>
        `;
        displayMovies.appendChild(movieInfo);
    }
}

/* function clearSearch(resultst) {
    while(resultst.length > 0) {

    }
}  */








/* function showMovies(movies) {
    inputField.innerHTML = "";
    for(let i = 0; i < movies.length; i++) {
        let movieDiv = document.createElement("div");
        console.log(movieDiv);
    }
} */






