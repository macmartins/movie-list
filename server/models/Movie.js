const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  adult: Boolean,
  backdrop_path: String,
  genres: [String],
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  director: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  revenue: Number,
  actors: [String],
  runtime: Number,
  metascore: Number,
});

module.exports = mongoose.model("movies", MovieSchema);
