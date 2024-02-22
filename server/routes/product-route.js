const express = require("express");
const {requireSignIn, isAdmin} = require("../middlewares/authMiddleware");
const {createProductController, getProductController, getSingleProduct, productPhotoController, deleteProductController, updateProductController} = require("../controllers/product-controller");
const formidable = require("express-formidable");

const router = express.Router();

router.route("/create-product", requireSignIn, isAdmin, formidable()).post(createProductController);

router.route("/get-product").get(getProductController);

router.route("/get-product/:slug").get(getSingleProduct);

router.route("/product-photo/:pid").get(productPhotoController);


//delete product
router.delete("/delete-product/:pid", deleteProductController)

//update
router.route("/update-product/:pid", requireSignIn, isAdmin, formidable()).put(updateProductController);

module.exports = router;