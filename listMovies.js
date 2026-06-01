const movies = require('./movies_metadata.json');

function listMovies(req, res) {
  res.json(movies);
}

module.exports = listMovies;