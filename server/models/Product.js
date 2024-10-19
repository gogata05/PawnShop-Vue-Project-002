// server\models\Product.js
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "The name of the brand cannot be blank!"],
      minlength: [3, "The name of the brand should be at least 3 characters!"]
    },
    model: {
      type: String,
      required: [true, "The name of the model cannot be blank!"],
      minlength: [2, "The name of the model should be at least 2 characters!"]
    },
    productType: {
      type: String,
      required: [true, "The product type cannot be blank!"],
      enum: {
        values: ["Jewelry", "Electronics", "Watches", "Art", "Collectibles", "Coins & Currency", "Other"],
        message: "Product type must be one of the following: Jewelry, Electronics, Watches, Art, Collectibles, Coins & Currency, or Other."
      },
      minlength: [3, "The product type should be at least 3 characters!"]
    },
    year: {
      type: Number,
      required: [true, "Please populate the year"]
    },
    imgUrl: {
      type: String,
      required: [true, "Please provide a product image link."],
      validate: [/^https?:\/\//i, "The product image should start with http:// or https://"]
    },
    description: {
      type: String,
      required: [true, "The description cannot be blank!"],
      minlength: [8, "The description should be a minimum of 8 characters long"]
    },
    condition: {
      type: String,
      required: [true, "The condition cannot be blank!"],
      enum: {
        values: ["New", "Like new", "Used"],
        message: "Condition must be either 'New', 'Like new', or 'Used'."
      }
    },
    price: {
      type: Number,
      required: [true, "The price cannot be blank!"],
      min: [0, "The price cannot be a negative number!"],
      max: [999999999999, "Can you even pronounce this number?"]
    },
    rating: {
      type: Number,
      default: 0
    },
    votes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
    comments: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
