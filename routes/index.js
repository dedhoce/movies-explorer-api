const router = require("express").Router();
const usersRouter = require("./users");
const moviesRouter = require("./movies");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");

const {
  validateLogin,
  validateCreateUser
} = require("../utils/requestValidationJoi");

const {
  HTTP_STATUS_NOT_FOUND // 404
} = require("../utils/constantsStatusCode");

router.post("/signin", validateLogin(), login);

router.post("/signup", validateCreateUser(), createUser);

router.use("/users", auth, usersRouter);

router.use("/movies", auth, moviesRouter);

router.use("/:linkIsNot", (req, res) => {
  const { linkIsNot } = req.params;
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: `По адресу http://localhost:3000/${linkIsNot} и запросу ${req.method} ничего нет` });
});

module.exports = router;
