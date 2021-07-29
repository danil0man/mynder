const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Alex added to give the browser access to CSS and script.js
app.use(express.static(__dirname + "/public"));
const PORT = process.env.PORT || 5001;

const apiRouter = require("./server/api");
app.use("/api", apiRouter);

// Alex added to make index.html open on app launch.
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
