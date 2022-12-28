const { urlConfig } = require("../common/config");

module.exports = (app) => {
  const user = require("../controllers/users.controller");
  const order = require("../controllers/orders.controller");

  // Create a new user
  app.post(`${urlConfig}/users`, user.create);

  // Update a user info with userId
  app.put(`${urlConfig}/users/:userId`, user.update);

  // Get a user info with userId
  app.get(`${urlConfig}/users/:docId`, user.getUserInfo);

  // Retrieve all user orders by user id
  app.get(`${urlConfig}/users/orders/:userId`, user.getUserOrders);

  // Create a new order
  app.post(`${urlConfig}/users/orders`, order.create);

  // Update order status by order id
  app.put(`${urlConfig}/users/orders/:orderId`, order.updateOrderStatus);

  // Retrieve all orders
  app.get(`${urlConfig}/orders`, order.findAll);

  // routes for creating and download bills
  // create order bill file
  app.post(`${urlConfig}/users/orders/bill`, order.createBill);

  // download order bill file
  app.get(`${urlConfig}/users/orders/bill/:file`, order.downloadBill);
};
