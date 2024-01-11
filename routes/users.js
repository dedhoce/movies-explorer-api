const router = require("express").Router();

const {
  getOwnUser, updateInfo
} = require("../controllers/users");

const {
  validateUpdateInfo
} = require("../utils/requestValidationJoi");

router.get("/me", getOwnUser);

router.patch("/me", validateUpdateInfo(), updateInfo);

module.exports = router;
