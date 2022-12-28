const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UserSchema = mongoose.Schema(
  {
    _id: String,
    userId: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    role: String,
    address: {
      city: String,
      street: String,
      houseNumber: Number,
      zipCode: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
