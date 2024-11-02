// server\middlewares\authMiddleware.js
const { TOKEN_COOKIE_NAME, SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");

exports.auth = function (req, res, next) {
  let token = req.cookies[TOKEN_COOKIE_NAME];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, SECRET, function (err, decodedToken) {
    if (err) {
      console.log("Invalid token:", err);
      res.clearCookie(TOKEN_COOKIE_NAME, { path: "/" });
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
