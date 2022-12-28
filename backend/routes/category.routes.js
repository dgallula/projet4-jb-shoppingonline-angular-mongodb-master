const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const category = require("../controllers/category.controller");

  // Create a new category
  app.post(`${urlConfig}/categories`, category.create);

  // Retrieve all categorys
  app.get(`${urlConfig}/categories`, category.getAllCategories);

  // Retrieve all poducts by category name
  app.get(`${urlConfig}/categories/products/:categoryName`, category.findOne);

  // Update a category with categoryId
  app.put(`${urlConfig}/categories/:categoryId`, category.update);

  // Delete a category with categoryId
  app.delete(`${urlConfig}/categories/:categoryId`, category.delete);
};
