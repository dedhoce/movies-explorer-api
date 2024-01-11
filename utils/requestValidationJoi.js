const { celebrate, Joi } = require("celebrate");

function validateLogin() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ru"] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9\_]{8,30}$/))
    })
  });
}

function validateCreateUser() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ru"] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9\_]{8,30}$/)),
      name: Joi.string().min(2).max(30)
    }).unknown(true)
  });
}

function validateMoviesId() {
  return celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24)
    })
  });
}

function validateCreateMovies() {
  return celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i),
      trailerLink: Joi.string().required().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i),
      thumbnail: Joi.string().required().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required()
    }).unknown(true)
  });
}

function validateUpdateInfo() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30)
    }).unknown(true)
  });
}

module.exports = {
  validateLogin,
  validateCreateUser,
  validateMoviesId,
  validateCreateMovies,
  validateUpdateInfo
};
