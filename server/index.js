const express = require("express");
const mongoose = require("mongoose");
const movies_routes = require("./routes/movies.js");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("listening");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/movies", movies_routes);
