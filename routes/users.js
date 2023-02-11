const router = require("express").Router();

const { getUser, createUser } = require("../controllers/users");

const getCurrentUser = (req, res) => {
  getUser(req, res);
};

router.get("/me", getCurrentUser);
router.patch("/me", getCurrentUser);

router.post("/", createUser);

module.exports = router;
