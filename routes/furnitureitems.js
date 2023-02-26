const router = require("express").Router();

const { celebrate, Joi } = require("celebrate");

const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  bookItem,
  cancelBookItem,
  getItem,
} = require("../controllers/furnitureitems");

router.get("/", getItems);
router.post(
  "/",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      price: Joi.number().required().min(0),
      imageUrl: Joi.string().required().uri(),
      description: Joi.string().required().min(10).max(1000),
      forsale: Joi.boolean().required(),
    }),
  }),
  createItem
);
router.delete(
  "/:itemId",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteItem
);
router.put(
  "/:itemId/book",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().required().length(24).hex(),
    }),
  }),
  bookItem
);

router.delete(
  "/:itemId/book",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().required().length(24).hex(),
    }),
  }),
  cancelBookItem
);
router.get(
  "/:itemId",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().required().length(24).hex(),
    }),
  }),
  getItem
);

module.exports = router;
