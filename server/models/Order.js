// server\models\Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
