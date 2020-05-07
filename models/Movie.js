const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  description: String,
  imgUrl: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

var Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;