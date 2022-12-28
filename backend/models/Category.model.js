const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema(
  {
    name: String,
    image: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
