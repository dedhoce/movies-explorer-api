const {
  HTTP_STATUS_UNAUTHORIZED, // 401
  AUTHORIZED_BUT_FORBIDDEN // 403
} = require("./constantsStatusCode");

class AlienMovie extends Error {
  constructor(message) {
    super(message);
    this.name = "Чужое видео!";
    this.statusCode = AUTHORIZED_BUT_FORBIDDEN;
  }
}

class NeedAuthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Необходима авторизация";
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

class NocorrectlyPswdOrEmail extends Error {
  constructor(message) {
    super(message);
    this.name = "Неправильные почта или пароль";
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = {
  AlienMovie,
  NeedAuthorized,
  NocorrectlyPswdOrEmail
};
