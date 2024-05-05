require("dotenv").config();

const morgan = require("morgan");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");

//MULTER
const bodyParser = require("body-parser");

// middleware
app.use(express.static("public"));
app.use("/images", express.static("public/images"));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("DB Connected");
    setTimeout(() => {
      console.log(`Listening to port ${port}`);
      app.listen(3000);
    }, 0.1);
  })
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);

app.get("/add-products", (req, res) => res.render("addproducts"));
app.get("/orders", (req, res) => res.render("orders"));

app.use(authRoutes);
