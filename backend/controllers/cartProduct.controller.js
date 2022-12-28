const Product = require("../models/Product.model");
const CartProduct = require("../models/CartProduct.model");
const Cart = require("../models/Cart.model");

const getProductPrice = async (id) => {
  const product = await Product.findOne({ _id: id });
  return await product.price;
};

exports.create = async (req, res) => {
  if (!req.body.product) {
    return res.status(400).send({
      message: "Product id can't be empty",
    });
  } else if (!req.body.quantity) {
    return res.status(400).send({
      message: "Quantity can't be empty",
    });
  } else if (!req.body.cartId) {
    return res.status(400).send({
      message: "Cart id can't be empty",
    });
  }

  const productPrice = await getProductPrice(req.body.product);
  const cartProduct = new CartProduct({
    product: req.body.product,
    quantity: req.body.quantity,
    totalPrice: productPrice * req.body.quantity,
    cartId: req.body.cartId,
  });
  cartProduct
    .save()
    .then((data) => {
      Cart.findByIdAndUpdate(
        {
          _id: req.body.cartId,
        },
        { $push: { products: data } },
        { new: true }
      ).then(() => {
        res.send(data);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Find all cart products by a cartId
exports.getSingleCartProduts = async (req, res) => {
  try {
    let products = await Cart.findOne({ _id: req.params.cartId }).populate(
      "products"
    );

    res.json(products);
  } catch (err) {
    if (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Products not found with given cart id " + req.params.cartId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving Products with given cart id " + req.params.cartId,
      });
    }
  }
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  let cartId;
  CartProduct.findByIdAndDelete({ _id: req.params.cartProductId })
    .then((cartProduct) => {
      cartId = cartProduct.cartId.toString();
      if (!cartProduct) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.cartProductId,
        });
      }

      Cart.findByIdAndUpdate({ _id: cartId }).then((doc) => {
        let cartProductIndex = doc.products.indexOf(req.params.cartProductId);

        doc.products.splice(cartProductIndex, 1);
        doc.save();
        res.send({ message: "Product deleted successfully!" });
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.cartProductId,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.cartProductId,
      });
    });
};
