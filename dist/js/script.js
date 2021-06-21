let movieYear = document.querySelector("#year");
let genreDropdown = document.querySelector("#genre");
let searchMovieButton = document.querySelector("#navigation__submit");
let pageSearchResults = 1;

searchMovieButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(movieYear.value);

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
      console.log(jsonResponse.data.results[pageSearchResults].vote_average);
      document.getElementById("details__rating-number").innerHTML =
        jsonResponse.data.results[pageSearchResults].vote_average;
    });
});

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
