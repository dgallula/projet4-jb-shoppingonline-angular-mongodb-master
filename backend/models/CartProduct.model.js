const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CartProductSchema = mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    totalPrice: String,
    quantity: Number,
    cartId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CartProduct", CartProductSchema);
