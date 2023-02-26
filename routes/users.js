const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

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
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
      surname: Joi.string().required().min(2).max(30),
      phone: Joi.string().required().min(5).max(11),
      typeofuser: Joi.string().required().min(2).max(30),
    }),
  }),
  getCurrentUser
);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
      surname: Joi.string().required().min(2).max(30),
      phone: Joi.string().required().min(5).max(11),
      typeofuser: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser
);

module.exports = router;
