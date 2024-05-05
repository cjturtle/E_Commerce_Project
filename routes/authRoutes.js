const { Router } = require("express");
const authController = require("../controllers/authController");
const addProductController = require("../controllers/addProductController");
const productsController = require("../controllers/productController");
const route = Router();

const { requireAuth, checkUser } = require("../middleware/authMiddleware");

//LOGIN AND SIGNUP ROUTES
route.get("/signup", authController.signup_get);
route.post("/signup", authController.signup_post);
route.get("/login", authController.login_get);
route.post("/login", authController.login_post);
route.get("/logout", authController.logout_get);

//ADD PRODUCT FOR A SELLER ACCOUNT
route.post("/upload", addProductController.addProduct);
route.post("/addtocart", productsController.add_to_cart_post);

//ROUTES FOR BUYER
route.get("/", productsController.product_index);
route.get("/delete-cart/:id", productsController.cart_delete);
route.get("/details/:id", productsController.product_details);

route.get("/cart", requireAuth, productsController.cart_index);

module.exports = route;
