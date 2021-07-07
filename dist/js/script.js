"use strict";

let movieYear = document.querySelector("#year");
let genreDropdown = document.querySelector("#genre");
let initialMovieRequestButton = document.querySelector("#navigation__submit");
let nextMovieButton = document.querySelector("#navigation__next");
let previousMovieButton = document.querySelector("#navigation__previous");
let pageSearchResults = 1;
let movieIndex = 0;
let searchResults = [];
let numberOfResultsCurrentPage;
let numberOfPages;
let movieLanguageFilter = "en"; // use 'any' for no language filter.
let numberOfStars = 3;

window.addEventListener("load", (e) => {
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
      jsonResponse.data.genres.forEach((genreItem) => {
        const option = document.createElement("option");
        option.text = genreItem.name;
        option.value = genreItem.id;
        genreDropdown.appendChild(option);
      });
    });
});

const initialMovieRequest = () => {
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
      searchResults = [];
      movieIndex = 0;
      filterMovieLanguage(jsonResponse);
      numberOfResultsCurrentPage = findLengthOfObject(searchResults);
      numberOfPages = jsonResponse.data.total_pages;
      movieCredits();
      populateMovieCard(searchResults);
    });
};

initialMovieRequestButton.addEventListener("click", initialMovieRequest);

const filterMovieLanguage = (object) => {
  // this actually won't work for "any" as is. I think searchResults would be empty.
  if (movieLanguageFilter !== "any") {
    for (let i = 0; i < object.data.results.length; i++) {
      if (object.data.results[i].original_language === movieLanguageFilter) {
        searchResults.push(object.data.results[i]);
      }
    }
  }
};

const movieCredits = () => {
  for (let i = movieIndex; i < searchResults.length; i++) {
    let movieId = searchResults[i].id;
    const url = `http://localhost:5001/api/movies/${movieId}/credits`;
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
        searchResults[i].directors = filterDirectors(jsonResponse.data);
        searchResults[i].writers = filterWriters(jsonResponse.data);
        searchResults[i].stars = filterStars(jsonResponse.data);
      });
  }
};

const filterDirectors = (currentMovieCredits) => {
  let directors = [];
  for (let i = 0; i < currentMovieCredits.crew.length; i++) {
    if (currentMovieCredits.crew[i].job === "Director") {
      directors.push(currentMovieCredits.crew[i].name);
    }
  }
  return directors;
};

const filterWriters = (currentMovieCredits) => {
  let writers = [];
  for (let i = 0; i < currentMovieCredits.crew.length; i++) {
    if (
      currentMovieCredits.crew[i].job === "Writer" ||
      currentMovieCredits.crew[i].job === "Screenplay"
    ) {
      writers.push(currentMovieCredits.crew[i].name);
    }
  }
  return writers;
};

const filterStars = (currentMovieCredits) => {
  let stars = [];
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(currentMovieCredits.cast[i].name);
  }
  return stars;
};

const findLengthOfObject = (object) => {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
};

const populateMovieCard = (object) => {
  document.getElementById("current-movie-title").innerHTML =
    searchResults[movieIndex].original_title;
  document.getElementById("details__rating--number").innerHTML =
    searchResults[movieIndex].vote_average;
  document.getElementById("details__summary--body").innerHTML =
    searchResults[movieIndex].overview;
  document.getElementById(
    "details__img"
  ).src = `https://image.tmdb.org/t/p/w500${searchResults[movieIndex].poster_path}`;
};

const nextPageMovieRequest = (event) => {
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
      movieIndex++;
      filterMovieLanguage(jsonResponse);
      numberOfResultsCurrentPage = findLengthOfObject(searchResults);
      numberOfPages = jsonResponse.data.total_pages;
      movieCredits();
      populateMovieCard(searchResults);
    });
};

const nextMovie = () => {
  if (movieIndex < searchResults.length - 1) {
    movieIndex++;
    populateMovieCard(searchResults);
  } else if (
    movieIndex === searchResults.length - 1 &&
    pageSearchResults < numberOfPages
  ) {
    pageSearchResults++;
    nextPageMovieRequest();
  }
};

nextMovieButton.addEventListener("click", nextMovie);

const previousMovie = () => {
  if (movieIndex > 0) {
    movieIndex--;
  }
  populateMovieCard(searchResults);
};

previousMovieButton.addEventListener("click", previousMovie);
