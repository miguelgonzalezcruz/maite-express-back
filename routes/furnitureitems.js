const router = require("express").Router();

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
router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem);
router.put("/:itemId/book", auth, bookItem);
router.delete("/:itemId/book", auth, cancelBookItem);
router.get("/:itemId", getItem);

module.exports = router;
