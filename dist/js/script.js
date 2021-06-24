let movieYear = document.querySelector("#year");
let genreDropdown = document.querySelector("#genre");
let searchMovieButton = document.querySelector("#navigation__submit");
let nextMovieButton = document.querySelector("#navigation__next");
let previousMovieButton = document.querySelector("#navigation__previous");
let pageSearchResults = 1;
let movieIndexPerPage = 0;
let searchResults;
let numberOfResultsCurrentPage;
let numberOfPages;

const populateCard = (object) => {
  document.getElementById("current-movie-title").innerHTML =
    object.data.results[movieIndexPerPage].original_title;
  document.getElementById("details__rating--number").innerHTML =
    object.data.results[movieIndexPerPage].vote_average;
  document.getElementById("details__summary--body").innerHTML =
    object.data.results[movieIndexPerPage].overview;
  document.getElementById(
    "details__img"
  ).src = `https://image.tmdb.org/t/p/w500${object.data.results[movieIndexPerPage].poster_path}`;
};

const lengthFinder = (object) => {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
};

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
      movieIndexPerPage = 0;
      populateCard(jsonResponse);
      searchResults = jsonResponse;
      numberOfResultsCurrentPage = lengthFinder(jsonResponse.data.results);
      numberOfPages = jsonResponse.data.total_pages;
    });
};

searchMovieButton.addEventListener("click", searchMovie);

const nextMovie = () => {
  if (movieIndexPerPage < numberOfResultsCurrentPage - 1) {
    movieIndexPerPage += 1;
    populateCard(searchResults);
  } else if (pageSearchResults < numberOfPages) {
    pageSearchResults += 1;
    searchMovie();
  }
};

nextMovieButton.addEventListener("click", nextMovie);

const previousMovie = () => {
  if (movieIndexPerPage > 0) {
    movieIndexPerPage -= 1;
  }
  populateCard(searchResults);
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
