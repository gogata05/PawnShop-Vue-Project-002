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

router.get("/top-10", async (req, res) => {
  try {
    let products = await productServices.getTop10();

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

router.get("/details/:id", async (req, res) => {
  try {
    let product = await productServices.getOne(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let user = null;
    if (req.user && req.user._id) {
      user = await User.findById(req.user._id);
    }

    let voted = false;
    if (req.user && req.user._id && product.votes && product.votes.length > 0) {
      voted = product.votes.some(x => x && x._id && x._id.toString() === req.user._id);
    }

    let isOwnedBy = false;
    if (req.user && req.user._id && product.creator && product.creator._id) {
      isOwnedBy = product.creator._id.toString() === req.user._id;
    }

    let isInFavorites = false;
    if (user && user.favorites && user.favorites.length > 0) {
      isInFavorites = user.favorites.some(x => product._id.toString() === x.toString());
    }

    res.json({ product, voted, isOwnedBy, isInFavorites });
  } catch (error) {
    console.log(error);
    res.json({ error: errorHandler(error) });
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

router.get("/vote-up/:id", isAuth, async (req, res) => {
  let productId = req.params.id;
  let product = await productServices.getOne(req.params.id);
  try {
    if (!(product.creator._id.toString() === req.user._id) && !product.votes.find(x => x._id.toString() === req.user._id)) {
      await productServices.voteUp(productId, req.user._id);

      res.json({ message: "Product liked" });
    } else {
      res.status(403).json({ error: "You are not allowed to like/dislike this product!" });
    }
  } catch (error) {
    res.status(400).json({ error: generalError });
  }
});

router.get("/vote-down/:id", isAuth, async (req, res) => {
  let productId = req.params.id;
  let product = await productServices.getOne(req.params.id);
  try {
    if (!(product.creator._id.toString() === req.user._id) && !product.votes.find(x => x._id.toString() === req.user._id)) {
      await productServices.voteDown(productId, req.user._id);

      res.json({ message: "Product disliked!" });
    } else {
      res.status(403).json({ error: "You are not allowed to like/dislike this product!" });
    }
  } catch (error) {
    res.status(400).json({ error: generalError });
  }
});

router.get("/favorite/:id", isAuth, async (req, res) => {
  let productId = req.params.id;
  let product = await productServices.getOne(req.params.id);
  let user = await authServices.getUserById(req.user?._id);
  try {
    if (!(product.creator._id.toString() === req.user._id) && !user.favorites.find(x => x._id.toString() === productId)) {
      await productServices.favorite(productId, req.user._id);

      res.json({ message: "Product added to favorites!" });
    } else {
      res.status(403).json({
        error: "You are not allowed to add this product to favorites!"
      });
    }
  } catch (error) {
    res.status(400).json({ error: generalError });
  }
});

router.post("/comment/:id", isAuth, async (req, res) => {
  let { comment } = req.body;
  if (comment.length < 1) {
    res.status(400).json({ error: "Comment is empty." });
    return;
  }
  if (!req.user._id) {
    res.status(400).json({ error: "You must be logged in to comment." });
    return;
  }
  let productId = req.params.id;
  let user = await authServices.getUserById(req.user._id);
  let userComment = `${user.firstName} ${user.lastName}: ${comment.trim()}`;
  try {
    await productServices.comment(productId, userComment);

    res.json({ message: "Comment added successfully!" });
  } catch (error) {
    res.status(400).json({ error: generalError });
  }
});

router.get("/latest-products", async (req, res) => {
  try {
    let products = await productServices.getLatest(3);
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: generalError
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { q, page = 1, limit = 10, sortBy = "createdAt", order = "desc", brand, productType, condition, priceMin, priceMax } = req.query;

    console.log("Search Query Parameters:", req.query); // Добавено логиране

    const filters = {};

    if (q && q.trim() !== "") {
      filters.$or = [{ brand: new RegExp(q, "i") }, { model: new RegExp(q, "i") }, { description: new RegExp(q, "i") }, { productType: new RegExp(q, "i") }];
    }

    if (brand) {
      filters.brand = brand;
    }
    if (productType) {
      filters.productType = productType;
    }
    if (condition) {
      filters.condition = condition;
    }
    if (priceMin || priceMax) {
      filters.price = {};
      const priceMinNum = Number(priceMin);
      const priceMaxNum = Number(priceMax);
      if (!isNaN(priceMinNum)) filters.price.$gte = priceMinNum;
      if (!isNaN(priceMaxNum)) filters.price.$lte = priceMaxNum;
    }

    const sortOrder = order === "asc" ? 1 : -1;

    const products = await productServices.search({
      filters,
      page: Number(page),
      limit: Number(limit),
      sortBy,
      sortOrder
    });

    res.json({ products: products.products, total: products.total, page: products.page, pages: products.pages });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error while searching" });
  }
});

module.exports = router;
