const router = require("express").Router();

const {
  createMovie, getMovies, deleteMovie
} = require("../controllers/movies");

const {
  validateMoviesId,
  validateCreateMovies
} = require("../utils/requestValidationJoi");

router.post("/", validateCreateMovies(), createMovie);
router.get("/", getMovies);
router.delete("/:Id", validateMoviesId(), deleteMovie);

module.exports = router;
