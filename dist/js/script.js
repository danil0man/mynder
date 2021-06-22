let movieYear = document.querySelector("#year");
let genreDropdown = document.querySelector("#genre");
let searchMovieButton = document.querySelector("#navigation__submit");
let nextMovieButton = document.querySelector("#navigation__next");
let previousMovieButton = document.querySelector("#navigation__previous");
let pageSearchResults = 1;
let movieIndexPerPage = 0;

// thinking about "clean code" I think we want to break this up into
// multiple functions if possible. "Each function should do just 1 thing"
const searchMovie = (event) => {
  const url = `http://localhost:5001/api/discover/${movieYear.value}/${genreDropdown.value}/${pageSearchResults}`;
  fetch(url)
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed");
      },
      (networkError) => console.log(networkError.message)
    )
    .then((jsonResponse) => {
      document.getElementById("current-movie-title").innerHTML =
        jsonResponse.data.results[movieIndexPerPage].original_title;
      document.getElementById("details__rating--number").innerHTML =
        jsonResponse.data.results[movieIndexPerPage].vote_average;
      document.getElementById("details__summary--body").innerHTML =
        jsonResponse.data.results[movieIndexPerPage].overview;
      // get proper url for movie poster and insert below.
      // document.getElementById("details__img").src = ??? ;
    });
};

searchMovieButton.addEventListener("click", searchMovie);

// the current functionality below for nextMovie() and previousMovie()
// is to call searchMovie() again, but I'm realizing this is probably
// a non-optimized solution, as it re-sends our fetch request every time
// you go back or forth. Our requests are limited right? We could instead
// save the full request results into a JS object locally, then query that
// object for our next and previous buttons.
const nextMovie = () => {
  if (movieIndexPerPage < 19) {
    movieIndexPerPage += 1;
  }
  searchMovie();
};

nextMovieButton.addEventListener("click", nextMovie);

const previousMovie = () => {
  if (movieIndexPerPage > 0) {
    movieIndexPerPage -= 1;
  }
  searchMovie();
};

previousMovieButton.addEventListener("click", previousMovie);

window.addEventListener("load", (e) => {
  //on load, popluate/fetch genres
  const url = `http://localhost:5001/api/genres`;
  fetch(url)
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed");
      },
      (networkError) => console.log(networkError.message)
    )
    .then((jsonResponse) => {
      // do something with data, list of genres
      jsonResponse.data.genres.forEach((genreItem) => {
        const option = document.createElement("option");
        option.text = genreItem.name;
        option.value = genreItem.id;
        genreDropdown.appendChild(option);
      });
    });
});
