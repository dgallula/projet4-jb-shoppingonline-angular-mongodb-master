const Category = require("../models/Category.model");
const Product = require("../models/Product.model");

// Create and Save a new Category
exports.create = (req, res) => {
  // validate request body fields to be not empty
  if (!req.body.name) {
    return res.status(400).send({
      message: "Category name can't be empty",
    });
  }

  // Create a Category
  const category = new Category({
    name: req.body.name,
    image: req.body.image,
  });

  // Save Category in the database
  category
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
};

// Find all products by a CategoryName
exports.findOne = async (req, res) => {
  try {
    let products = await Category.find({
      name: req.params.categoryName,
    }).populate("products");
    res.json(products);
  } catch (err) {
    if (err) {
      if (err.kind === "ObjectName") {
        return res.status(404).send({
          message:
            "Products not found with given Category name " +
            req.params.categoryName,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving Products with given Category name " +
          req.params.categoryName,
      });
    }
  }
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
  let image;
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name can't be empty",
    });
  }
  if (req.body.image) {
    image = req.body.image;
  } else {
    Category.findOne({ _id: req.params.categoryId }).then((data) => {
      image = data.image;
    });
  }
  // Find category and update it with the request body
  Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      name: req.body.name,
      image,
    },
    { new: true }
  )
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.categoryId,
        });
      }
      res.send(category);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.categoryId,
        });
      }
      return res.status(500).send({
        message: "Error updating category with id " + req.params.categoryId,
      });
    });
};

exports.getAllCategories = (req, res) => {
  Category.find()
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

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.deleteOne({ _id: req.params.categoryId })
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.categoryId,
        });
      }
      Product.deleteMany({ category: req.params.categoryId }).then(() => {
        res.send({ message: "Category deleted successfully!" });
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.categoryId,
        });
      }
      return res.status(500).send({
        message: "Could not delete category with id " + req.params.categoryId,
      });
    });
};
