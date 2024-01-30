const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const conf = require('../config/app');
const DocumentNotFoundError = require('../utils/errorClass/DocumentNotFoundError');

const { ERROR_MESSAGE_USER_NOT_FOUND } = require('../utils/errorMessage');

const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED // 201
} = require('../utils/constantsStatusCode');

function getOwnUser(req, res, next) {
  req.params.userId = req.user._id;
  return userModel
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'Document not found') {
        throw new DocumentNotFoundError(ERROR_MESSAGE_USER_NOT_FOUND);
      } else {
        next(err);
      }
    });
}

function createUser(req, res, next) {
  const { email, password, name } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => {
      userModel
        .create({
          email,
          password: hash,
          name
        })
        // eslint-disable-next-line no-shadow
        .then(({ _id, email, name }) => {
          return res.status(HTTP_STATUS_CREATED).send({
            _id,
            email,
            name
          });
        })
        .catch(next);
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  return userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      // создадим токен
      const token = jwt.sign({ _id: user._id }, conf.JWT_SECRET, {
        expiresIn: '7d'
      });

      // вернём токен
      res.status(HTTP_STATUS_OK).send({ token: token }).end();
    })
    .catch(next);
}

function updateInfo(req, res, next) {
  const userId = req.user._id;

  return userModel
    .findByIdAndUpdate(userId, req.body, {
      runValidators: true,
      returnDocument: 'after'
    })
    .orFail()
    .then((user) => {
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'Document not found') {
        throw new DocumentNotFoundError(ERROR_MESSAGE_USER_NOT_FOUND);
      } else {
        next(err);
      }
    });
}

module.exports = {
  createUser,
  login,
  getOwnUser,
  updateInfo
};
