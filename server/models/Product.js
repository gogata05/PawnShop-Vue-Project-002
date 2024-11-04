// server\models\Product.js
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    productType: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true,
      enum: ["New", "Like new", "Used"]
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    votes: [{
      type: mongoose.Types.ObjectId,
      ref: "User"
    }],
    comments: [{
      text: String,
      author: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
