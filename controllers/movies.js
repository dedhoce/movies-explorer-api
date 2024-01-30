const movieModel = require('../models/movie');
const DocumentNotFoundError = require('../utils/errorClass/DocumentNotFoundError');
const ValidationError = require('../utils/errorClass/ValidationError');
const AlienMovie = require('../utils/errorClass/AlienMovie');

const {
  ERROR_MESSAGE_MOVIES_NOT_FOUND,
  ERROR_MESSAGE_VALIDATION_ERROR,
  ERROR_MESSAGE_MOVIE_NOT_FOUND,
  ERROR_MESSAGE_ALIEN_MOVIE
} = require('../utils/errorMessage');

const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED // 201
} = require('../utils/constantsStatusCode');

function getMovies(req, res, next) {
  const owner = req.user._id;
  return movieModel
    .find({ owner })
    .then((movies) => {
      return res.status(HTTP_STATUS_OK).send(movies);
    })
    .catch((err) => {
      if (err.name === 'Document not found') {
        throw new DocumentNotFoundError(ERROR_MESSAGE_MOVIES_NOT_FOUND);
      } else {
        next(err);
      }
    });
}

function createMovie(req, res, next) {
  req.body.owner = req.user._id;
  const movieData = req.body;

  return movieModel
    .create(movieData)
    .then((movie) => {
      return res.status(HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'Validation error') {
        throw new ValidationError(ERROR_MESSAGE_VALIDATION_ERROR);
      } else {
        next(err);
      }
    });
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
            .catch((err) => {
              if (err.name === 'Document not found') {
                throw new DocumentNotFoundError(ERROR_MESSAGE_MOVIE_NOT_FOUND);
              } else {
                next(err);
              }
            });
        }
        throw new AlienMovie(ERROR_MESSAGE_ALIEN_MOVIE);
      } catch (err) {
        return next(err);
      }
    })
    .catch(next);
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovie
};
