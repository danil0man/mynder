const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  API_KEY: process.env.MOVIEDB_API_KEY,
};
