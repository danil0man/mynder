const express = require('express');
const discoverRouter = express.Router();
const MovieDB = require('node-themoviedb');
const mdb = new MovieDB('ad65f3f346cc7869630deac544b0f1f7');

module.exports = discoverRouter;

  //retrive list of movie genere codes
discoverRouter.get('/:year/:genre', async (req, res, next) => {
    const {year, genre} = req.params
    try {
        const args = {
        query: {
            year: year,
            with_genres: genre,
            region: "US",
            language: "en-US"

            // query string, i.e. session_id
            // NOTE: api_key and language will be added to query by default, don't need specify these values
            },
        };
        const movie = await mdb.discover.movie(args);
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

