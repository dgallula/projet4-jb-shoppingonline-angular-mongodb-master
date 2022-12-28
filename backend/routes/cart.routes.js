const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const cart = require("../controllers/cart.controller");
  const cartProduct = require("../controllers/cartProduct.controller");

  // Create a new cart
  app.post(`${urlConfig}/carts`, cart.create);

  // Retrieve all poducts by cart id
  app.get(`${urlConfig}/carts/products/:userId`, cart.findOne);

  app.put(`${urlConfig}/carts/:cartId`, cart.updateStatus);

  // Add new product to cart
  app.post(`${urlConfig}/carts/products/add-product`, cartProduct.create);

  // Retrieve all poducts by cart id
  app.get(
    `${urlConfig}/cart/products/:cartId`,
    cartProduct.getSingleCartProduts
  );

  // Delete a cart product with cartProductId
  app.delete(`${urlConfig}/carts/products/:cartProductId`, cartProduct.delete);
};
