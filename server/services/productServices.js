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

const comment = async (productId, comment) => {
  let product = await getOne(productId);
  let addComments = product.comments;
  addComments.unshift(comment);
  await Product.updateOne(
    { _id: productId },
    {
      comments: addComments
    },
    { runValidators: true }
  );
};

const getLatest = (n = 3) => Product.find({}).sort({ _id: -1 }).limit(n).populate("creator").populate("votes");

const search = async ({ filters, page, limit, sortBy, sortOrder }) => {
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(filters);
  const pages = Math.ceil(total / limit);

  const products = await Product.find(filters)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .populate("creator")
    .populate("votes");

  return { products, total, page, pages };
};

const productServices = {
  create,
  getAll,
  getOne,
  deleteRecord,
  getTop10,
  voteUp,
  voteDown,
  favorite,
  edit,
  comment,
  getLatest,
  search
};
module.exports = productServices;
