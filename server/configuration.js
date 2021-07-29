const express = require('express');
const configurationRouter = express.Router();
const MovieDB = require('node-themoviedb');
const APIKEY = require('./apikey');
const mdb = new MovieDB(APIKEY);

module.exports = configurationRouter;

configurationRouter.get('/', async (req, res, next) => {
    try {
        const args = {
            pathParameters: {

            },
            query: {
                // query string, i.e. session_id
                // NOTE: api_key and language will be added to query by default, don't need specify these values
            },
        };
        const movie = await mdb.configuration.getAPIConfiguration(args);
        res.status(200).send(movie);
        /*
        {
            data: Object. Parsed json data of response
            headers: Object. Headers of response
        }
        */
    } catch (err) {
        res.status(500).json({ message: err });
    }
});



// `http://localhost:5001/api/config/${movieYear.value}/${genreDropdown.value}/${pageSearchResults}`


// let APIKEY = 'ad65f3f346cc7869630deac544b0f1f7';
// let baseURL = 'https://api.themoviedb.org/3/';
// let configData = null;
// let baseImageURL = null;

// let getConfig = function () {
//     let url = "".concat(baseURL, 'configuration?api_key=', APIKEY);
//     fetch(url)
//     .then((result)) => {
//         return result.json();
//     })
//     .then((data) => {
//         baseImageURL = data.images.secure_base_url;
//         configData = data.images;
//         console.log('config:', data);
//         console.log('config fetched');
//         //runSearch?
//     })
// };