const Category = require("../models/Category.model");
const Product = require("../models/Product.model");

// Create and Save a new Product
exports.create = (req, res) => {
  // validate request body fields to be not empty
  if (!req.body.name) {
    return res.status(400).send({
      message: "Product name can't be empty",
    });
  } else if (!req.body.price) {
    return res.status(400).send({
      message: "Product price can't be empty",
    });
  } else if (!req.body.image) {
    return res.status(400).send({
      message: "Product image can't be null",
    });
  } else if (!req.body.stock) {
    return res.status(400).send({
      message: "Product stock can't be empty",
    });
  } else if (!req.body.category) {
    return res.status(400).send({
      message: "Product category can't be empty",
    });
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    stock: req.body.stock,
    category: req.body.category,
  });

  // Save Product in the database
  product
    .save()
    .then((data) => {
      Category.findByIdAndUpdate(
        {
          _id: req.body.category,
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

exports.update = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name can't be empty",
    });
  }

  // Find product and update it with the request body
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      stock: req.body.stock,
      category: req.body.category,
    },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error updating product with id " + req.params.productId,
      });
    });
};

exports.updateProductStock = (req, res) => {
  // Find product and update it with the request body

  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      } else {
        Product.updateOne(
          { _id: req.params.productId },
          {
            stock:
              req.body.operation === "subtract"
                ? (product.stock -= req.body.quantity)
                : (product.stock += req.body.quantity),
          },
          { new: true }
        ).then((updatedProduct) => {
          res.send(updatedProduct);
        });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error updating product with id " + req.params.productId,
      });
    });
};

exports.getAllProducts = (req, res) => {
  Product.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  let categoryId;
  Product.findByIdAndDelete({ _id: req.params.productId })
    .then((product) => {
      categoryId = product.category.toString();
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }

      Category.findByIdAndUpdate({ _id: categoryId }).then((doc) => {
        let productIndex = doc.products.indexOf(req.params.productId);
        doc.products.splice(productIndex, 1);
        doc.save();
        res.send({ message: "Product deleted successfully!" });
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.productId,
      });
    });
};
