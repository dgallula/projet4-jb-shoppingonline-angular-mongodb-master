const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const products = require("../controllers/product.controller");

  // Create a new products
  app.post(`${urlConfig}/products`, products.create);

  // Retrieve all productss
  app.get(`${urlConfig}/products`, products.getAllProducts);

  // Update a product with productId
  app.put(`${urlConfig}/products/:productId`, products.update);

  // Update a product with productId
  app.put(
    `${urlConfig}/products/updateStock/:productId`,
    products.updateProductStock
  );

  // Delete a product with productId
  app.delete(`${urlConfig}/products/:productId`, products.delete);
};
