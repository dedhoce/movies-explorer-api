const {
  HTTP_STATUS_UNAUTHORIZED // 401
} = require('../constantsStatusCode');

class NeedAuthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Необходима авторизация';
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = NeedAuthorized;
