const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

// Create and Save a new Cart
exports.create = (req, res) => {
  // validate request body fields to be not empty
  if (!req.body.clientId) {
    return res.status(400).send({
      message: "Client id can't be empty",
    });
  }

  // Create a Cart
  const cart = new Cart({
    clientId: req.body.clientId,
    openAt: new Date(),
    status: "open",
    products: [],
  });

  // Save Cart in the database
  cart
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the cart.",
      });
    });
};

// Find all cart products by a userId
exports.findOne = async (req, res) => {
  try {
    let products = await Cart.find({
      clientId: req.params.userId,
    }).populate("products");

    res.json(products.find((cart) => cart.status === "open"));
  } catch (err) {
    if (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Products not found with given cart id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving Products with given cart id " + req.params.userId,
      });
    }
  }
};

exports.updateStatus = async (req, res) => {
  Cart.findByIdAndUpdate(
    req.params.cartId,
    {
      status: req.body.status,
    },
    { new: true }
  )
    .then((cart) => {
      if (!cart) {
        return res.status(404).send({
          message: "Cart not found with id " + req.params.cartId,
        });
      }
      res.send(cart);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Cart not found with id " + req.params.cartId,
        });
      }
      return res.status(500).send({
        message: "Error updating Cart with id " + req.params.cartId,
      });
    });
};
