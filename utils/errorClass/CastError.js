const mongoose = require('mongoose');

const {
  HTTP_STATUS_BAD_REQUEST // 400
} = require('../constantsStatusCode');

class CastError extends mongoose.Error.CastError {
  constructor(message) {
    super(message);
    this.name = 'Invalid ID';
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = CastError;
