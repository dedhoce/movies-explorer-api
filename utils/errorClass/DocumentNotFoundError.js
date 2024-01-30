const mongoose = require('mongoose');

const {
  HTTP_STATUS_NOT_FOUND // 404
} = require('../constantsStatusCode');

class DocumentNotFoundError extends mongoose.Error.DocumentNotFoundError {
  constructor(message) {
    super(message);
    this.name = 'Document not found';
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = DocumentNotFoundError;
