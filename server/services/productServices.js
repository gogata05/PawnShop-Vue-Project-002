// server\services\productServices.js
const Product = require("../models/Product");
const User = require("../models/User");

const create = data => Product.create(data);
const getAll = () => Product.find({});
const getTop10 = () =>
  Product.find({})
    .sort([["rating", "desc"]])
    .limit(10);
const getOne = id => Product.findById(id).populate("creator").populate("votes");
const deleteRecord = id => Product.deleteOne({ _id: id });

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

const favorite = async (productId, userId) => {
  let product = await Product.findById(productId);
  let user = await User.findById(userId);

  let favoriteProducts = user.favorites;
  favoriteProducts.push(product);

  await User.updateOne({ _id: userId }, { favorites: favoriteProducts });
};

const edit = (productId, brand, model, description, imgUrl, condition, year, price, productType) =>
  Product.updateOne(
    { _id: productId },
    {
      brand,
      model,
      description,
      imgUrl,
      condition,
      year,
      price,
      productType
    },
    { runValidators: true }
  );

const productServices = {
  create,
  getAll,
  getOne,
  deleteRecord,
  getTop10,
  voteUp,
  favorite,
  voteDown,
  edit,
  comment,
  getLatest
};
module.exports = productServices;
