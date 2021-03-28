let apiKey = 'ad65f3f346cc7869630deac544b0f1f7';
let baseURL = 'https://api.themoviedb.org/3/';
let detailsURL = 'movie/{movie_id}';
let searchURL = 'search/';
let topRatedURL = 'movie/top_rated';
let searchResults = [];
let index = 0;


let buildSearchURL = (searchQuery) => {
    
    return encodeURI(`${baseURL}${searchURL}movie?api_key=${apiKey}&query=${searchQuery}`);
   
} ;
//console.log(buildSearchURL('the room'));

// https://api.themoviedb.org/3/search/movie?api_key=ad65f3f346cc7869630deac544b0f1f7&query=the room

let getMoviesBySearchTerm = (searchTerm) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       searchResults = JSON.parse(xhttp.responseText); 
       console.log(searchResults);    
       if (searchResults.results.length === 0) {
            displayNoResultsFound();
       } else {
            displayCurrentMovie();
       }
    }
    };
    xhttp.open("GET", buildSearchURL(searchTerm), true);
    xhttp.send();
};

// buildSearchURL('the rock');
getMoviesBySearchTerm('the rock');

let goNext = () => {
    index++; 
    displayCurrentMovie();
};

let displayCurrentMovie = () => {
    let movieTitle = document.getElementById('movieTitle');     //
    movieTitle.innerHTML = searchResults.results[index].title;
    let releaseDate = document.getElementById('releaseDate');
    releaseDate.innerHTML = searchResults.results[index].release_date; //innerHTML sets text on webset
};

let search = () => {
    let movieSearch = document.getElementById('search');  //text box
    index = 0;
    getMoviesBySearchTerm(movieSearch.value);
}

let displayNoResultsFound = () => {
    let movieTitle = document.getElementById('movieTitle');
    movieTitle.innerHTML = 'No results found.'; 
}
// let getMoviesByDetails()
