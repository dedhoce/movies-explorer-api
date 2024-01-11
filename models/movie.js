const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
      match:
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
    },
    trailerLink: {
      type: String,
      required: true,
      match:
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
    },
    thumbnail: {
      type: String,
      required: true,
      match:
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    movieId: {
      type: Number,
      required: true
    },
    nameRU: {
      type: String,
      required: true
    },
    nameEN: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("movie", MovieSchema);
