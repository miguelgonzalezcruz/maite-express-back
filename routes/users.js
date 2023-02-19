const router = require("express").Router();

const { getUser, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const getCurrentUser = (req, res) => {
  console.log("req.user: ", req.user);
  getUser(req, res);
};

router.get("/me", auth, getUser);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, getCurrentUser);

router.post("/", createUser);

module.exports = router;
