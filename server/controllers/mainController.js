// server\controllers\mainController.js
const express = require("express");

const { errorHandler } = require("../middlewares/errorHandler");
const { isAuth } = require("../middlewares/authMiddleware");
const router = express.Router();
const productServices = require("../services/productServices");
const User = require("../models/User");
const authServices = require("../services/authServices");
const Product = require("../models/Product");

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
    console.log("Fetching top 10 products");
    const products = await productServices.getTop10();
    console.log("Found products:", products.length);

    res.json({ products });
  } catch (error) {
    console.error("Error fetching top products:", error);
    res.status(500).json({ error: "Failed to fetch top products" });
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
    let isInFavorites = false;
    let isOwnedBy = false;

    if (req.user) {
      const user = await User.findById(req.user._id);
      isInFavorites = user.favorites.some(favId => 
        favId.equals(product._id)
      );
      isOwnedBy = product.creator._id.toString() === req.user._id.toString();
    }

    console.log("Product details:", {
      productId: product._id,
      creatorId: product.creator._id,
      userId: req.user?._id,
      isOwnedBy
    });

    res.json({
      product,
      isInFavorites,
      isOwnedBy,
      voted: product.votes.some(v => v?._id.toString() === req?.user?._id)
    });
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
  
  try {
    await productServices.comment(productId, {
      text: comment.trim(),
      author: `${user.firstName} ${user.lastName}`
    });

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

router.get("/products", async (req, res) => {
  try {
    console.log("Получени параметри:", req.query);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.brand) query.brand = req.query.brand;
    if (req.query.productType) query.productType = req.query.productType;
    if (req.query.condition) query.condition = req.query.condition;
    if (req.query.priceMin || req.query.priceMax) {
      query.price = {};
      if (req.query.priceMin) query.price.$gte = parseInt(req.query.priceMin);
      if (req.query.priceMax) query.price.$lte = parseInt(req.query.priceMax);
    }

    console.log("Constructed query:", query);

    const sortField = req.query.sortBy || "createdAt";
    const sortOrder = req.query.order === "asc" ? 1 : -1;
    const sort = { [sortField]: sortOrder };

    const [products, total] = await Promise.all([Product.find(query).sort(sort).skip(skip).limit(limit).lean(), Product.countDocuments(query)]);

    console.log(`Намерени ${products.length} продукта от общо ${total}`);

    res.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.delete("/products/favorites/:productId", isAuth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;

    console.log("Removing favorite - ProductID:", productId);
    console.log("UserID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Конвертираме към ObjectId за сравнение
    const mongoose = require("mongoose");
    const productObjectId = new mongoose.Types.ObjectId(productId);
    
    console.log("Current favorites:", user.favorites);
    user.favorites = user.favorites.filter(favId => !favId.equals(productObjectId));
    console.log("Updated favorites:", user.favorites);

    await user.save();
    console.log("User saved successfully");

    res.json({
      message: "Product removed from favorites",
      newCount: user.favorites.length
    });
  } catch (error) {
    console.error("Error in remove favorites:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/products/favorites/toggle/:productId", isAuth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;

    console.log("Toggle favorite - ProductID:", productId);
    console.log("UserID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const mongoose = require("mongoose");
    const productObjectId = new mongoose.Types.ObjectId(productId);
    
    // Проверяваме дали продуктът е в любими
    const isInFavorites = user.favorites.some(favId => favId.equals(productObjectId));
    
    if (isInFavorites) {
      // Ако е в любими, го премахваме
      user.favorites = user.favorites.filter(favId => !favId.equals(productObjectId));
    } else {
      // Ако не е в любими, го добавяме
      user.favorites.push(productObjectId);
    }

    await user.save();
    console.log("User favorites updated successfully");

    res.json({
      message: isInFavorites ? "Removed from favorites" : "Added to favorites",
      newCount: user.favorites.length,
      isInFavorites: !isInFavorites
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
