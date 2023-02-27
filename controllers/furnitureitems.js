const hubspot = require("@hubspot/api-client");

const furnitureitem = require("../models/furnitureitem");

const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");
const ForbiddenError = require("../errors/ForbiddenError");

const { HubsK } = require("../utils/config");

const hubspotClient = new hubspot.Client({
  accessToken: HubsK,
});

const getItems = (req, res, next) => {
  furnitureitem
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const getItem = (req, res, next) => {
  furnitureitem
    .findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, price, imageUrl, description, forsale } = req.body;
  const owner = req.user._id;

  furnitureitem
    .findOne({ name: req.body.name, owner: req.user._id })
    .then((item) => {
      if (item) {
        throw new ConflictError("Item already exists");
      } else {
        return furnitureitem.create({
          name,
          price,
          imageUrl,
          owner,
          description,
          forsale,
          booked: false,
        });
      }
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const deleteItem = async (req, res, next) => {
  try {
    const item = await furnitureitem.findById(req.params.itemId).orFail(() => {
      throw new NotFoundError("Item not found");
    });
    if (item.owner.equals(req.user._id)) {
      await item.remove();
      return res.send({ furnitureItem: item });
    }
    throw new ForbiddenError("Insufficient permissions to delete item");
  } catch (err) {
    next(err);
  }
};

const bookItem = (req, res, next) => {
  furnitureitem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { booked: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

const cancelBookItem = (req, res, next) => {
  furnitureitem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { booked: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  bookItem,
  cancelBookItem,
  getItem,
};
