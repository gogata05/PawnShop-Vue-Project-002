// server\services\authServices.js
const User = require("../models/User");
const { jwtSign } = require("../utils/jwtUtils");
const { SECRET } = require("../config/constants");

const register = (firstName, lastName, email, password) => User.create({ firstName, lastName, email, password });

const login = (email, password) => {
  return User.findOne({ email })
    .then(user => Promise.all([user.validatePassword(password), user]))
    .then(([isValid, user]) => {
      if (isValid) {
        return user;
      } else {
        throw new Error("Cannot find email or password");
      }
    })
    .catch(() => null);
};

const createToken = function (user) {
  let payload = {
    _id: user._id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours validity
  };

  console.log("Creating token with payload:", payload);
  return jwtSign(payload, SECRET);
};

const getUserById = id => User.findById(id).populate("favorites");

let authServices = { register, login, createToken, getUserById };
module.exports = authServices;
