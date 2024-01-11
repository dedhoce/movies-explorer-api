const movieModel = require("../models/movie");

const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED // 201
} = require("../utils/constantsStatusCode");

const { AlienMovie } = require("../utils/ErrorClass");

function getMovies(req, res, next) {
  return movieModel
    .find()
    .then((movies) => {
      return res.status(HTTP_STATUS_OK).send(movies);
    })
    .catch(next);
}

function createMovie(req, res, next) {
  req.body.owner = req.user._id;
  const movieData = req.body;

  return movieModel
    .create(movieData)
    .then((movie) => {
      return res.status(HTTP_STATUS_CREATED).send(movie);
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  const { Id } = req.params;

  return movieModel
    .findById(Id)
    .orFail()
    .then((movie) => {
      try {
        if (movie.owner.valueOf() === req.user._id) {
          return movieModel
            .deleteOne({ _id: Id })
            .then((movieDeleted) => {
              return res.status(HTTP_STATUS_OK).send(movieDeleted);
            })
            .catch(next);
        }
        throw new AlienMovie("Можно удалять только свои карточки!");
      } catch (err) {
        next(err);
      }
    })
    .catch(next);
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovie
};
