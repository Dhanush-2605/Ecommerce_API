const mongoose = require("mongoose");
const { object } = require("webidl-conversions");

const OrderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        productImg: {
          type: String,
        },
        productName: {
          type: String,
        },
        price: {
          type: String,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, require: true },
    number: { type: Number, require: true },
    status: { type: String, default: "Pending" },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
