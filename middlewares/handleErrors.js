const {
  HTTP_STATUS_CONFLICT, // 409
  HTTP_STATUS_INTERNAL_SERVER_ERROR // 500
} = require('../utils/constantsStatusCode');

const {
  ERROR_MESSAGE_USER_WITH_THIS_EMAIL_EXISTS,
  ERROR_MESSAGE_SERVER_ERROR
} = require('../utils/errorMessage');

module.exports = (err, req, res) => {
  if (err.code === 11000) {
    return res
      .status(HTTP_STATUS_CONFLICT)
      .send({ message: ERROR_MESSAGE_USER_WITH_THIS_EMAIL_EXISTS });
  }
  const statusCode = err.statusCode || HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
    ? ERROR_MESSAGE_SERVER_ERROR
    : err.message;

  return res.status(statusCode).send({ message });
};
