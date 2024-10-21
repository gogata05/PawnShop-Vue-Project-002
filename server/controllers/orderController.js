// server\controllers\orderController.js
const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/authMiddleware");
const Order = require("../models/Order");
const { errorHandler } = require("../middlewares/errorHandler");

router.post("/create", isAuth, async (req, res) => {
  try {
    const { items, total } = req.body;
    const userId = req.user._id;

    const newOrder = new Order({
      user: userId,
      items,
      total
    });

    await newOrder.save();

    res.json({ message: "Order created successfully!", orderId: newOrder._id });
  } catch (error) {
    res.status(400).json({ error: errorHandler(error) });
  }
});

router.get("/my-orders", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate("items.product");

    res.json({ orders });
  } catch (error) {
    res.status(400).json({ error: errorHandler(error) });
  }
});

module.exports = router;
