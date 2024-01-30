const {
  AUTHORIZED_BUT_FORBIDDEN // 403
} = require('../constantsStatusCode');

class AlienMovie extends Error {
  constructor(message) {
    super(message);
    this.name = 'Чужое видео!';
    this.statusCode = AUTHORIZED_BUT_FORBIDDEN;
  }
}

module.exports = AlienMovie;
