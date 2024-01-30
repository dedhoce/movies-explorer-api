const {
  HTTP_STATUS_UNAUTHORIZED // 401
} = require('../constantsStatusCode');

class NocorrectlyPswdOrEmail extends Error {
  constructor(message) {
    super(message);
    this.name = 'Неправильные почта или пароль';
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = NocorrectlyPswdOrEmail;
