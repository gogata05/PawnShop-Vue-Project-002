// server\middlewares\authMiddleware.js
const { SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");

exports.auth = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, SECRET, function (err, decodedToken) {
    if (err) {
      console.log("Invalid token:", err);
      req.user = null;
      return next();
    }

    req.user = decodedToken;
    next();
  });
};

exports.isAuth = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "You are not logged in!" });
  }

  next();
};

exports.isAlreadyLogged = function (req, res, next) {
  if (req.user) {
    return res.status(401).json({ error: "You are already logged in!" });
  }

  next();
};
