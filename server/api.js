const express = require('express');
const apiRouter = express.Router();

const moviesRouter = require('./movies');
const genresRouter = require('./genres');
const discoverRouter = require('./discover');
const configurationRouter = require('./configuration');

apiRouter.use('/movies', moviesRouter);
apiRouter.use('/genres', genresRouter);
apiRouter.use('/discover', discoverRouter);
apiRouter.use('/configuration', configurationRouter);

module.exports = apiRouter;