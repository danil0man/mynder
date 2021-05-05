const express = require('express');
const apiRouter = express.Router();

const moviesRouter = require('./movies');
const genresRouter = require('./genres');
const discoverRouter = require('./discover');

apiRouter.use('/movies', moviesRouter);
apiRouter.use('/genres', genresRouter);
apiRouter.use('/discover', discoverRouter);

module.exports = apiRouter;