// server\services\productServices.js
const Product = require("../models/Product");
const User = require("../models/User");

const create = data => Product.create(data);
const getAll = () => Product.find({});

const voteUp = async (productId, userId) => {
  let product = await Product.findById(productId);
  let user = await User.findById(userId);

  product.votes.push(user);
  product.rating += 1;

  product.save();
  return;
};

const voteDown = async (productId, userId) => {
  let product = await Product.findById(productId);
  let user = await User.findById(userId);

  product.votes.push(user);
  product.rating -= 1;

  product.save();
  return;
};


const productServices = {
  create,
  getAll,
  getOne,
  deleteRecord,
  voteUp,
  voteDown
};
module.exports = productServices;
