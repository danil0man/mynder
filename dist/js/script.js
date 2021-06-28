"use strict";

let movieYear = document.querySelector("#year");
let genreDropdown = document.querySelector("#genre");
let initialMovieRequestButton = document.querySelector("#navigation__submit");
let nextMovieButton = document.querySelector("#navigation__next");
let previousMovieButton = document.querySelector("#navigation__previous");
let pageSearchResults = 1;
let movieIndex = 0;
// will hold all search results until page is reloaded.
let searchResults = [];
let numberOfResultsCurrentPage;
let numberOfPages;
let movieLanguageFilter = "en"; // use 'any' for no language filter.

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

const findLengthOfObject = (object) => {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
};

const filterMovieDataLanguage = (object) => {
  if (movieLanguageFilter !== "any") {
    for (let i = 0; i < object.data.results.length; i++) {
      if (object.data.results[i].original_language === movieLanguageFilter) {
        searchResults.push(object.data.results[i]);
      }
    }
  }
};

const initialMovieRequest = (event) => {
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
      filterMovieDataLanguage(jsonResponse); //creates searchResults.
      numberOfResultsCurrentPage = findLengthOfObject(searchResults);
      numberOfPages = jsonResponse.data.total_pages;
      populateMovieCard(searchResults);
    });
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
      filterMovieDataLanguage(jsonResponse); //creates searchResults.
      numberOfResultsCurrentPage = findLengthOfObject(searchResults);
      numberOfPages = jsonResponse.data.total_pages;
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

const previousMovie = () => {
  if (movieIndex > 0) {
    movieIndex--;
  }
  populateMovieCard(searchResults);
};

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

initialMovieRequestButton.addEventListener("click", initialMovieRequest);

nextMovieButton.addEventListener("click", nextMovie);

previousMovieButton.addEventListener("click", previousMovie);
