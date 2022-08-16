const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String,unique: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img :{type:String},
    number:{type:Number},
    address:{type:String},
    isActive:{type:String}
  },
  { timestamps: true }
);

module.exports=mongoose.model("User",UserSchema);