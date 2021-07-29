const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

const apiRouter = require("./server/api");
app.use("/api", apiRouter);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "./dist/index.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
