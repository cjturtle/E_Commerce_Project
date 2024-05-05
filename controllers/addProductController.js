const multer = require("multer");
const { data, ImageModel } = require("../models/productSchema");
const { name } = require("ejs");

const Storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

module.exports.addProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new data({
        productname: req.body.productname,
        price: req.body.price,
        description: req.body.description,
        filename: req.file.originalname,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      newImage
        .save()
        .then(() => {
          res.redirect("/add-products");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
