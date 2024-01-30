const mongoose = require('mongoose');

const {
  HTTP_STATUS_BAD_REQUEST // 400
} = require('../constantsStatusCode');

class ValidationError extends mongoose.Error.ValidationError {
  constructor(message) {
    super(message);
    this.name = 'Validation error';
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = ValidationError;
