// server\controllers\mainController.js
const express = require("express");

const { errorHandler } = require("../middlewares/errorHandler");
const { isAuth } = require("../middlewares/authMiddleware");
const router = express.Router();
const productServices = require("../services/productServices");
const User = require("../models/User");
const authServices = require("../services/authServices");

let generalError = "We are experiencing technical difficulties and are working to resolve them. Thank you for your understanding!";

router.get("/all-products", async (req, res) => {
  try {
    let products = await productServices.getAll();

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: generalError
    });
  }
});

router.post("/add", isAuth, async (req, res) => {
  let { brand, model, description, imgUrl, condition, year, price, productType, creator } = req.body;

  try {
    await productServices.create({
      brand,
      model,
      description,
      imgUrl,
      condition,
      year,
      price,
      productType,
      creator
    });
    res.json({ message: "Product created successfully!" });
  } catch (error) {
    res.status(400).json({ error: errorHandler(error) });
  }
});

router.post("/edit/:id", isAuth, async (req, res) => {
  let { brand, model, description, imgUrl, condition, year, price, productType, creator } = req.body;
  let productId = req.params.id;
  try {
    if (creator._id.toString() === req.user?._id) {
      await productServices.edit(productId, brand, model, description, imgUrl, condition, year, price, productType);
      res.json({ message: "Product edited successfully!" });
    } else {
      res.status(403).json({ error: "You are not the owner of this product!" });
    }
  } catch (error) {
    res.status(400).json({ error: errorHandler(error) });
  }
});

router.get("/delete/:id", isAuth, async (req, res) => {
  let product = await productServices.getOne(req.params.id);
  try {
    if (product.creator._id.toString() === req.user._id) {
      await productServices.deleteRecord(req.params.id);
      res.json({ message: "Product deleted successfully!" });
    } else {
      res.status(403).json({ error: "You are not the owner of this product!" });
    }
  } catch (error) {
    res.json({ error: errorHandler(error) });
  }
});

module.exports = router;
