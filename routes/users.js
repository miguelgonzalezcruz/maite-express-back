const router = require("express").Router();
const { celebrate } = require("celebrate");

const {
  getCurrentUserSchema,
  createUserSchema,
} = require("../validation/uservalidation");

const { getUser, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const getCurrentUser = (req, res) => {
  console.log("req.user: ", req.user);
  getUser(req, res);
};

router.get("/me", auth, getUser);
router.get("/me", auth, getCurrentUser);
router.patch(
  "/me",
  auth,
  celebrate({ body: getCurrentUserSchema }),
  getCurrentUser
);

router.post(
  "/",
  celebrate({
    body: createUserSchema,
  }),
  createUser
);

module.exports = router;
