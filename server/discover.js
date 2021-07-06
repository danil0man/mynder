const express = require('express');
const discoverRouter = express.Router();
const MovieDB = require('node-themoviedb');
const mdb = new MovieDB('ad65f3f346cc7869630deac544b0f1f7');

module.exports = discoverRouter;

  //retrive list of movies by year and genre codes
discoverRouter.get('/:year/:genre/:page', async (req, res, next) => {
    const {year, genre, page, with_cast} = req.params
    try {
        const args = {
        query: {
            year: year,
            with_genres: genre,
            page: page,
            region: "US",
            language: "en-US",
            with_cast: with_cast

            // query string, i.e. session_id
            // NOTE: api_key and language will be added to query by default, don't need specify these values
            },
        };
        const moviesList = await mdb.discover.movie(args); // #2 & #3 arrow
        res.status(200).send(moviesList); //#4 arrow
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

