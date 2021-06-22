let movieYear = document.querySelector("#year");
let genreDropdown = document.querySelector("#genre");
let searchMovieButton = document.querySelector("#navigation__submit");
let nextMovieButton = document.querySelector("#navigation__next");
let previousMovieButton = document.querySelector("#navigation__previous");
let pageSearchResults = 1;

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
        jsonResponse.data.results[pageSearchResults].original_title;
      document.getElementById("details__rating--number").innerHTML =
        jsonResponse.data.results[pageSearchResults].vote_average;
      document.getElementById("details__summary--body").innerHTML =
        jsonResponse.data.results[pageSearchResults].overview;
      // get proper url for movie poster and insert below.
      // document.getElementById("details__img".src = ;
    });
};

searchMovieButton.addEventListener("click", searchMovie);

const nextMovie = () => {
  console.log("start: " + pageSearchResults);
  if (pageSearchResults < 19) {
    pageSearchResults += 1;
  }
  console.log("end: " + pageSearchResults);
  searchMovie();
};

nextMovieButton.addEventListener("click", nextMovie);

const previousMovie = () => {
  console.log("start: " + pageSearchResults);
  if (pageSearchResults > 1) {
    pageSearchResults -= 1;
  }
  console.log("end: " + pageSearchResults);
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
