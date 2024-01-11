const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { NocorrectlyPswdOrEmail } = require("../utils/ErrorClass");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9\.\-]+@[a-z0-9]+\.[a-z]{1,}/g
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

UserSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NocorrectlyPswdOrEmail("Неправильные почта или пароль");
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NocorrectlyPswdOrEmail("Неправильные почта или пароль");
          }

          return user;
        });
    });
};

module.exports = mongoose.model("user", UserSchema);
