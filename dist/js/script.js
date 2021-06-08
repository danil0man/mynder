let movieYear = document.querySelector('#year');
let genreDropdown = document.querySelector('#genre');
let searchMovieButton = document.querySelector('#navigation__submit');
let pageSearchResults = 1


searchMovieButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(movieYear.value);

    const url = `http://localhost:5001/api/discover/${movieYear.value}/${genreDropdown.value}/${pageSearchResults}`;
    fetch(url).then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Request failed');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        // do something with data; store values in variable in HTML

    });
});

window.addEventListener('load', (e) => {
    //on load, popluate/fetch genres
    const url = `http://localhost:5001/api/genres`;
    fetch(url).then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Request failed');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        // do something with data, list of genres
        jsonResponse.data.genres.forEach(genreItem => {
            const option = document.createElement('option');
            option.text = genreItem.name;
            option.value = genreItem.id;
            genreDropdown.appendChild(option);

        });

    });
})