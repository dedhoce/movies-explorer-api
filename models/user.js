const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NocorrectlyPswdOrEmail = require('../utils/errorClass/NocorrectlyPswdOrEmail');

const {
  ERROR_MESSAGE_NOCORRECT_EMAIL_OR_PSWD
} = require('../utils/errorMessage');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9.-]+@[a-z0-9]+\.[a-z]{1,}/g
    },
    password: {
      type: String,
      required: true,
      select: false // Так по умолчанию хеш пароля пользователя не будет возвращаться из базы
    },
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30
    }
  },
  {
    versionKey: false
  }
);

UserSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NocorrectlyPswdOrEmail(ERROR_MESSAGE_NOCORRECT_EMAIL_OR_PSWD);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NocorrectlyPswdOrEmail(
            ERROR_MESSAGE_NOCORRECT_EMAIL_OR_PSWD
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', UserSchema);
