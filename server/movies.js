const express = require('express');
const moviesRouter = express.Router();
const MovieDB = require('node-themoviedb');
const mdb = new MovieDB('ad65f3f346cc7869630deac544b0f1f7');


// could do const moviesRouter = require('express').Router();

module.exports = moviesRouter;

moviesRouter.get('/', async (req, res, next) => {
    try{
        res.status(200).json()

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

moviesRouter.get('/', async (req, res, next) => {
    try {
      const args = {
        pathParameters: {
            movie_id: 384018,
        },
      };
      const movie = await mdb.movie.getDetails(args);
      res.status(200).send(movie);
      /*
        {
          data: Object. Parsed json data of response
          headers: Object. Headers of response
        }
      */
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });

  moviesRouter.get('/:movieId', async (req, res, next) => {
    try {
      const args = {
        pathParameters: {
          movie_id: req.params.movieId,
        },
      };
      const movie = await mdb.movie.getDetails(args);
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
  
//   //retrive list of movie genere codes
//   moviesRouter.get('/', async (req, res, next) => {
//     try {
//       const args = {
//         pathParameters: {
//           movie_id: req.params
//         },
//         query: {
//             // query string, i.e. session_id
//             // NOTE: api_key and language will be added to query by default, don't need specify these values
//           },
//       };
//       const movie = await mdb.genre.getMovieList(args);
//       res.status(200).send(movie);
//       /*
//         {
//           data: Object. Parsed json data of response
//           headers: Object. Headers of response
//         }
//       */
//     } catch (err) {
//         res.status(500).json({ message: err });
//     }
//   });