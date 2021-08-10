"use strict";

let movieYear = document.querySelector("#year");
let genreDropdown = document.querySelector("#genre");
let initialMovieRequestButton = document.querySelector("#navigation__submit");
let nextMovieButtonMobile = document.querySelector("#navigation__next--mobile");
let nextMovieButtonDesktop = document.querySelector("#next__desktop");
let previousMovieButtonMobile = document.querySelector(
  "#navigation__previous--mobile"
);
let previousMovieButtonDesktop = document.querySelector("#previous__desktop");
let pageSearchResults = 1;
let movieIndex = 0;
let searchResults = [];
let numberOfResultsCurrentPage;
let numberOfPages;
let movieLanguageFilter = "en"; // use 'any' for no language filter.
let numberOfStars = 3;
//let baseURL = "https://reels-movie-app.herokuapp.com" // PRODUCTION
let baseURL = "http://localhost:5001"; // DEVELOPMENT

window.addEventListener("load", (e) => {
  const url = `${baseURL}/api/genres`;
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
  const url = `${baseURL}/api/discover/${movieYear.value}/${genreDropdown.value}/${pageSearchResults}`;
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
      filterMovieLanguage(jsonResponse); // searchResults is created here.
      numberOfResultsCurrentPage = findLengthOfObject(searchResults);
      numberOfPages = jsonResponse.data.total_pages;
      return movieCredits();
    })
    .then(() => {
      populateMovieCard(searchResults);
    })
    .then(() => {
      document.getElementById("home-screen").style.display = "none";
      document.getElementById("details-container").style.display = "block";
    });
};

initialMovieRequestButton.addEventListener("click", initialMovieRequest);

const filterMovieLanguage = (object) => {
  // TO DO: this actually won't work for "any" as is. I think searchResults would be empty.
  if (movieLanguageFilter !== "any") {
    for (let i = 0; i < object.data.results.length; i++) {
      if (object.data.results[i].original_language === movieLanguageFilter) {
        searchResults.push(object.data.results[i]);
      }
    }
  }
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

const movieCredits = () => {
  let promiseArray = [];
  for (let i = movieIndex; i < searchResults.length; i++) {
    let movieId = searchResults[i].id;
    const url = `${baseURL}/api/movies/${movieId}/credits`;
    const promiseVariable = fetch(url)
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
    promiseArray.push(promiseVariable);
  }
  return Promise.all(promiseArray);
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

const populateMovieCard = (object) => {
  document.getElementById("current-movie-title").innerHTML =
    searchResults[movieIndex].original_title;
  document.getElementById("details__rating--number").innerHTML =
    searchResults[movieIndex].vote_average;
  document.getElementById("details__summary--body").innerHTML =
    searchResults[movieIndex].overview;
  document.getElementById(
    "details__img--desktop"
  ).src = `https://image.tmdb.org/t/p/w500${searchResults[movieIndex].poster_path}`;
  document.getElementById(
    "details__img--mobile"
  ).src = `https://image.tmdb.org/t/p/w500${searchResults[movieIndex].poster_path}`;

  document.getElementById("details__directors--body").innerHTML =
    generateListString(searchResults[movieIndex].directors);
  document.getElementById("details__writers--body").innerHTML =
    generateListString(searchResults[movieIndex].writers);
  document.getElementById("details__stars--body").innerHTML =
    generateListString(searchResults[movieIndex].stars);
};

const generateListString = (array) => {
  let string;
  if (array.length === 0) {
    string = "Unknown";
  } else {
    for (let i = 0; i < array.length; i++) {
      if (i === 0) {
        string = `${array[i]}`;
      } else if (i < array.length - 1) {
        string += `, ${array[i]}`;
      } else if (i == array.length - 1) {
        string += `, and ${array[i]}`;
      }
    }
  }
  return string;
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

nextMovieButtonMobile.addEventListener("click", nextMovie);
nextMovieButtonDesktop.addEventListener("click", nextMovie);

const nextPageMovieRequest = (event) => {
  const url = `${baseURL}/api/discover/${movieYear.value}/${genreDropdown.value}/${pageSearchResults}`;
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

const previousMovie = () => {
  if (movieIndex > 0) {
    movieIndex--;
  }
  populateMovieCard(searchResults);
};

previousMovieButtonMobile.addEventListener("click", previousMovie);
previousMovieButtonDesktop.addEventListener("click", previousMovie);

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37 && searchResults.length > 0) {
    previousMovie();
  } else if (event.keyCode === 39 && searchResults.length > 0) {
    nextMovie();
  }
});
