const express = require("express");
const discoverRouter = express.Router();
const MovieDB = require("node-themoviedb");
const APIKEY = process.env.MOVIEDB_API_KEY;
const mdb = new MovieDB(APIKEY);

module.exports = discoverRouter;

//retrive list of movies by year and genre codes
discoverRouter.get("/:year/:genre/:page", async (req, res, next) => {
  const { year, genre, page } = req.params;
  try {
    const args = {
      query: {
        year: year,
        with_genres: genre,
        page: page,
        region: "US",
        language: "en-US",

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
