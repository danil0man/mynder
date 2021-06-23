const express = require('express');
const genresRouter = express.Router();
const MovieDB = require('node-themoviedb');
const mdb = new MovieDB('ad65f3f346cc7869630deac544b0f1f7');

module.exports = genresRouter;

//retrive list of movie genere codes
genresRouter.get('/', async (req, res, next) => {
    try {
        const args = {
            pathParameters: {

            },
            query: {
                // query string, i.e. session_id
                // NOTE: api_key and language will be added to query by default, don't need specify these values
            },
        };
        const movie = await mdb.genre.getMovieList(args);
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

