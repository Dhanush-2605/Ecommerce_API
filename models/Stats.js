const mongoose = require("mongoose");
const StatsSchema = mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    amount: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stats", StatsSchema);
