const mongoose = require("mongoose");
const { object } = require("webidl-conversions");

const OrderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount:{type:Number,required:true},
    address:{type:String,required:true},
    status:{type:String,default:"Pending"}

  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);