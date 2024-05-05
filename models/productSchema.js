const mongoose = require("mongoose");

//SCHEMA FOR ADD PRODUCTS FOR A SELLER
const productSchema = mongoose.Schema({
  productname: {
    type: String,
    unique: true,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  // user_id: {
  //   type: String,
  //   required: true,
  // },
});

const data = mongoose.model("image", productSchema);
const cart = mongoose.model("cart", productSchema);
module.exports = { data, cart };
