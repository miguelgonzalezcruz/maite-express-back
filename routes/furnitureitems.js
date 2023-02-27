const router = require("express").Router();

const { celebrate } = require("celebrate");

const auth = require("../middlewares/auth");

const {
  createItemSchema,
  deleteItemSchema,
  bookItemSchema,
  cancelBookItemSchema,
  getItemSchema,
} = require("../Validation/itemvalidation");

const {
  getItems,
  createItem,
  deleteItem,
  bookItem,
  cancelBookItem,
  getItem,
} = require("../controllers/furnitureitems");

router.get("/", getItems);
router.post("/", auth, celebrate({ body: createItemSchema }), createItem);

router.delete(
  "/:itemId",
  auth,
  celebrate({ body: deleteItemSchema }),
  deleteItem
);

router.put(
  "/:itemId/book",
  auth,
  celebrate({
    body: bookItemSchema,
  }),
  bookItem
);

router.delete(
  "/:itemId/book",
  auth,
  celebrate({
    body: cancelBookItemSchema,
  }),
  cancelBookItem
);
router.get(
  "/:itemId",
  celebrate({
    body: getItemSchema,
  }),
  getItem
);

module.exports = router;
