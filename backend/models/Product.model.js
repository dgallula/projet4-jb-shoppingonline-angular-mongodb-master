const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema(
  {
    name: String,
    price: String,
    image: String,
    stock: Number,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
