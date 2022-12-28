const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const fs = require("fs");

const calculateOrderTotalPrice = async (cartId) => {
  let orderProducts = await Cart.find({ _id: cartId }).populate("products");
  let orderTotalPrice = 0;
  orderProducts[0].products.forEach((product) => {
    orderTotalPrice += +product.totalPrice;
  });
  return orderTotalPrice;
};

exports.create = async (req, res) => {
  if (!req.body.cart) {
    return res.status(400).send({
      message: "Cart id can't be empty",
    });
  } else if (!req.body.deliveryDate) {
    return res.status(400).send({
      message: "Delivery date can't be empty",
    });
  } else if (!req.body.creditCard) {
    return res.status(400).send({
      message: "Credit number can't be empty",
    });
  } else if (!req.body.user) {
    return res.status(400).send({
      message: "User id can't be empty",
    });
  } else if (!req.body.address) {
    return res.status(400).send({
      message: "Address can't be null",
    });
  }
  //   Create an Order
  const order = new Order({
    cart: req.body.cart,
    orderDate: new Date(),
    deliveryDate: req.body.deliveryDate,
    totalPrice: await calculateOrderTotalPrice(req.body.cart),
    creditCard: {
      cardNumber: req.body.creditCard.cardNumber,
      expirationDate: req.body.creditCard.expirationDate,
      cvv: req.body.creditCard.cvv,
    },
    status: "on process",
    user: req.body.user,
    address: {
      city: req.body.address.city,
      street: req.body.address.street,
      houseNumber: req.body.address.house,
      zipCode: req.body.address.zipCode,
    },
  });

  // Save Order in the database
  order
    .save()
    .then((data) => {
      User.findByIdAndUpdate(
        {
          _id: req.body.user,
        },
        { $push: { orders: data } },
        { new: true }
      ).then(() => {
        res.send(data);
      });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the order.",
      });
    });
};

// Retrieve and return all user orders from the database.
exports.findAll = (req, res) => {
  Order.find()
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Update a order identified by the orderId in the request
exports.updateOrderStatus = (req, res) => {
  if (!req.body.status) {
    return res.status(400).send({
      message: "Order status can't be empty",
    });
  }

  // Find order and update status with the request body
  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      status: req.body.status,
    },
    { new: true }
  )
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      res.send(order);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Error updating order with id " + req.params.orderId,
      });
    });
};

exports.createBill = (req, res) => {
  const orderDate = new Date(req.body.order.orderDate).toDateString();

  let bill = `Shopping App \nOrder number: ${req.body.order._id} \nOrder Date: ${orderDate} \nProducts List: \n\n`;
  req.body.order.products.forEach((item) => {
    bill += `${item.name}\n ${item.price} ₪ X  ${item.quantity} = ${item.totalPrice} ₪ \n`;
  });
  bill += `\n\n\nTotal Products ${req.body.order.products.length}\n
  Total price: ${req.body.order.totalPrice} ₪\n
  credit card: ${req.body.order.cardNumber}`;
  fs.writeFile(`assets/bills/${req.body.order._id}.txt`, bill, (error) => {
    if (error) {
      console.log("Error: ");
      console.log(error);
    }
    console.log("The file was saved!");
  });
};

exports.downloadBill = (req, res) => {
  const file = `${req.params.file}.txt`;
  const path = "./assets/bills/" + file;
  res.download(path);
};
