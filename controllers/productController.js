const { json } = require("body-parser");
const { data, cart } = require("../models/productSchema");

const product_index = (req, res) => {
  data
    .find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("home", { images: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const cart_index = (req, res) => {
  cart
    .find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("cart", { carts: result, productname: "" });
    })
    .catch((err) => {
      console.log(err);
    });
};

//ADD TO CART PAGE
//ADD PRODUCT TO CART
const add_to_cart_post = (req, res) => {
  const x = res;

  const product = new cart(req.body);

  console.log(x);

  product
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const add_to_cart_get = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await data.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE PRODUCT FROM CART
const cart_delete = (req, res) => {
  cart.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      return console.log(err);
    }
    res.redirect("/cart");
  });
};

//View Product Details
const product_details = (req, res) => {
  const id = req.params.id;

  data
    .findById(id)
    .then((result) => {
      res.render("productDetails", { images: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  product_index,
  add_to_cart_get,
  add_to_cart_post,
  cart_index,
  cart_delete,
  product_details,
};
