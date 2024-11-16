// server\controllers\orderController.js
const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/authMiddleware");
const Order = require("../models/Order");
const { errorHandler } = require("../middlewares/errorHandler");
const Product = require("../models/Product");

// Create order summary
router.post("/create-summary", isAuth, async (req, res) => {
  try {
    console.log("Creating order summary");
    const { items } = req.body;
    const userId = req.user._id;

    // Calculate estimated delivery dates (7-14 days from now)
    const today = new Date();
    const deliveryStart = new Date(today.setDate(today.getDate() + 7));
    const deliveryEnd = new Date(today.setDate(today.getDate() + 7));

    // Calculate total
    let total = 0;
    const populatedItems = await Promise.all(
      items.map(async item => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error("Product not found");
        }
        total += product.price * item.quantity;
        return {
          productName: `${product.brand} ${product.model}`,
          quantity: item.quantity,
          price: product.price
        };
      })
    );

    console.log("Order summary created with total:", total);

    res.json({
      items: populatedItems,
      total,
      estimatedDeliveryStart: deliveryStart,
      estimatedDeliveryEnd: deliveryEnd
    });
  } catch (error) {
    console.error("Error creating order summary:", error);
    res.status(500).json({ error: errorHandler(error) });
  }
});

// Create final order with shipping details
router.post("/create", isAuth, async (req, res) => {
  try {
    console.log("Creating final order");
    const { shippingDetails, items, total } = req.body;
    const userId = req.user._id;

    const today = new Date();
    const deliveryStart = new Date(today.setDate(today.getDate() + 7));
    const deliveryEnd = new Date(today.setDate(today.getDate() + 7));

    const order = new Order({
      user: userId,
      items,
      shippingDetails,
      total,
      estimatedDeliveryStart: deliveryStart,
      estimatedDeliveryEnd: deliveryEnd
    });

    await order.save();
    console.log("Order created successfully:", order._id);

    res.json({ order });
  } catch (error) {
    console.error("Error creating order:", error);
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
